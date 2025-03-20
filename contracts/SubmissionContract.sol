// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./UserManagement.sol";
import "./ExamContract.sol";
import "./ScoreContract.sol";

contract SubmissionContract {
    struct Submission {
        uint256 examId;
        address student;
        uint8 score;
        bool submitted;
        bool approved; // Thêm trạng thái duyệt điểm
    }

    mapping(address => mapping(uint256 => Submission)) public submissions;
    ExamContract public examContract;
    UserManagement public userManagement;
    ScoreContract public scoreContract;
    address public admin;

    event ExamSubmitted(address indexed student, uint256 indexed examId, uint8 score);
    event ExamAlreadySubmitted(address indexed student, uint256 indexed examId);
    event ExamNotFound(uint256 indexed examId);
    event ScoreApproved(uint256 indexed examId, address indexed student, address indexed teacher);
    event ContractsUpdated(address indexed newExamContract, address indexed newUserManagement, address indexed newScoreContract);

    modifier onlyStudent() {
        require(userManagement.getUserRole(msg.sender) == UserManagement.Role.Student, "Not a student");
        _;
    }

    modifier onlyTeacher() {
        require(userManagement.getUserRole(msg.sender) == UserManagement.Role.Teacher, "Only teacher can approve scores");
        _;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor(address _examContract, address _userManagement, address _scoreContract) {
        require(_examContract != address(0) && _userManagement != address(0) && _scoreContract != address(0), "Invalid contract address");
        admin = msg.sender;
        examContract = ExamContract(_examContract);
        userManagement = UserManagement(_userManagement);
        scoreContract = ScoreContract(_scoreContract);
    }

    function updateContracts(address _examContract, address _userManagement, address _scoreContract) external onlyAdmin {
        require(_examContract != address(0) && _userManagement != address(0) && _scoreContract != address(0), "Invalid contract address");
        
        examContract = ExamContract(_examContract);
        userManagement = UserManagement(_userManagement);
        scoreContract = ScoreContract(_scoreContract);

        emit ContractsUpdated(_examContract, _userManagement, _scoreContract);
    }

    function submitExam(uint256 _examId, uint8 score) public onlyStudent {
        require(score <= 10, "Invalid score, must be between 0 and 10"); // Điểm tối đa là 10

        // Kiểm tra bài thi có tồn tại không và đã được duyệt chưa
        (, uint256 examId, bool isApproved, ) = examContract.getExamDetails(_examId);
        require(examId == _examId, "Exam does not exist");
        require(isApproved, "Exam has not been approved yet");


        // Kiểm tra bài thi đã được duyệt chưa
        require(userManagement.isExamApproved(_examId), "Exam has not been approved yet");

        // Kiểm tra sinh viên đã nộp bài hay chưa, nếu có thì không cho thay đổi điểm
        require(!submissions[msg.sender][_examId].submitted, "Exam already submitted, score cannot be changed");


        // Lưu bài nộp
        submissions[msg.sender][_examId] = Submission(_examId, msg.sender, score, true, false);
        emit ExamSubmitted(msg.sender, _examId, score);
    }

    function approveScore(uint256 _examId, address _student) public onlyTeacher {
        require(submissions[_student][_examId].submitted, "Exam not submitted yet");
        require(!submissions[_student][_examId].approved, "Score already approved");

        submissions[_student][_examId].approved = true;
        scoreContract.storeScore(_student, _examId, submissions[_student][_examId].score);
        
        emit ScoreApproved(_examId, _student, msg.sender);
    }
}
