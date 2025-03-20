// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ScoreContract {
    struct Score {
        uint256 examId;
        uint8 score;
    }

    mapping(address => Score[]) private studentScores;
    address public admin;
    address public submissionContract;

    event ScoreStored(address indexed student, uint256 indexed examId, uint8 score);
    event ScoreRemoved(address indexed student, uint256 indexed examId);
    event SubmissionContractUpdated(address indexed oldContract, address indexed newContract);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlySubmissionContract() {
        require(msg.sender == submissionContract, "Unauthorized");
        _;
    }

    constructor(address _submissionContract) {
        require(_submissionContract != address(0), "Invalid submission contract address");
        admin = msg.sender;
        submissionContract = _submissionContract;
    }

    function setSubmissionContract(address _submissionContract) external onlyAdmin {
        require(_submissionContract != address(0), "Invalid submission contract address");
        emit SubmissionContractUpdated(submissionContract, _submissionContract);
        submissionContract = _submissionContract;
    }

    function storeScore(address student, uint256 examId, uint8 score) public onlySubmissionContract {
        require(student != address(0), "Invalid student address");
        require(score <= 10, "Invalid score, must be between 0 and 10"); // Điểm tối đa là 10

        studentScores[student].push(Score(examId, score));
        emit ScoreStored(student, examId, score);
    }

    function getStudentScores(address student) public view returns (uint256[] memory, uint8[] memory) {
        uint256 length = studentScores[student].length;
        uint256[] memory examIds = new uint256[](length);
        uint8[] memory scores = new uint8[](length);

        for (uint256 i = 0; i < length; i++) {
            examIds[i] = studentScores[student][i].examId;
            scores[i] = studentScores[student][i].score;
        }

        return (examIds, scores);
    }

    function removeScore(address student, uint256 examId) external onlyAdmin {
        require(student != address(0), "Invalid student address");
        uint256 length = studentScores[student].length;
        require(length > 0, "No scores found for this student");

        for (uint256 i = 0; i < length; i++) {
            if (studentScores[student][i].examId == examId) {
                studentScores[student][i] = studentScores[student][length - 1]; // Gán phần tử cuối vào vị trí cần xóa
                studentScores[student].pop(); // Xóa phần tử cuối
                emit ScoreRemoved(student, examId);
                return;
            }
        }

        revert("Exam ID not found for this student");
    }
}
