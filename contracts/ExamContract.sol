// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./UserManagement.sol";

contract ExamContract {
    UserManagement userManagement;

    constructor(address _userManagementAddress) {
        userManagement = UserManagement(_userManagementAddress);
    }

    uint8 constant MAX_QUESTIONS = 10; // Giới hạn số câu hỏi

    struct Question {
        string questionText;
        string[4] options;
        uint8 correctAnswerIndex;
    }

    struct Exam {
        string title;
        uint256 examId;
        address creator;
        uint8 questionCount;
        mapping(uint8 => Question) questions;
    }

    mapping(uint256 => Exam) public exams;
    mapping(uint256 => mapping(address => uint8)) public examScores; // Lưu điểm từng sinh viên cho mỗi bài thi
    uint256 public nextExamId;

    event ExamCreated(uint256 examId, string title, address creator);
    event QuestionAdded(uint256 examId, string questionText);
    event ExamSubmitted(uint256 examId, address student, uint8 score);

    modifier onlyTeacher() {
        require(userManagement.getUserRole(msg.sender) == UserManagement.Role.Teacher, "Only teachers can perform this action");
        _;
    }

    modifier onlyStudent() {
        require(userManagement.getUserRole(msg.sender) == UserManagement.Role.Student, "Only students can perform this action");
        _;
    }

    function createExam(string memory _title) public onlyTeacher {
        require(bytes(_title).length > 0, "Title cannot be empty");

        Exam storage newExam = exams[nextExamId];
        newExam.title = _title;
        newExam.examId = nextExamId;
        newExam.creator = msg.sender;
        newExam.questionCount = 0;

        emit ExamCreated(nextExamId, _title, msg.sender);
        nextExamId++;
    }

    function addQuestion(
        uint256 _examId,
        string memory _questionText,
        string[4] memory _options,
        uint8 _correctAnswerIndex
    ) public onlyTeacher {
        require(_examId < nextExamId, "Exam does not exist");
        Exam storage exam = exams[_examId];
        require(exam.questionCount < MAX_QUESTIONS, "Maximum number of questions reached");
        require(bytes(_questionText).length > 0, "Question text cannot be empty");
        require(_correctAnswerIndex < 4, "Invalid answer index");

        exam.questions[exam.questionCount] = Question(_questionText, _options, _correctAnswerIndex);
        exam.questionCount++;

        emit QuestionAdded(_examId, _questionText);
    }

    function submitExam(uint256 _examId, uint8[] memory _answers) public onlyStudent {
        require(_examId < nextExamId, "Exam does not exist");
        Exam storage exam = exams[_examId];
        require(_answers.length == exam.questionCount, "Incorrect number of answers submitted");

        uint8 score = 0;
        for (uint8 i = 0; i < exam.questionCount; i++) {
            if (_answers[i] == exam.questions[i].correctAnswerIndex) {
                score++;
            }
        }

        examScores[_examId][msg.sender] = score;
        emit ExamSubmitted(_examId, msg.sender, score);
    }

    function getExamScore(uint256 _examId, address _student) public view returns (uint8) {
        return examScores[_examId][_student];
    }

    function getExamDetails(uint256 _examId)
        public
        view
        returns (string memory title, uint256 examId, address creator, uint8 questionCount)
    {
        Exam storage exam = exams[_examId];
        return (exam.title, exam.examId, exam.creator, exam.questionCount);
    }

    function getAllExams() public view returns (string[] memory, uint256[] memory, address[] memory, uint8[] memory) {
        string[] memory titles = new string[](nextExamId);
        uint256[] memory ids = new uint256[](nextExamId);
        address[] memory creators = new address[](nextExamId);
        uint8[] memory questionCounts = new uint8[](nextExamId);

        for (uint256 i = 0; i < nextExamId; i++) {
            Exam storage exam = exams[i];
            titles[i] = exam.title;
            ids[i] = exam.examId;
            creators[i] = exam.creator;
            questionCounts[i] = exam.questionCount;
        }

        return (titles, ids, creators, questionCounts);
    }

    function getQuestions(uint256 _examId) 
        public 
        view 
        returns (string[] memory, string[4][] memory, uint8[] memory) 
    {
        require(_examId < nextExamId, "Exam does not exist");

        Exam storage exam = exams[_examId];
        string[] memory questionTexts = new string[](exam.questionCount);
        string[4][] memory options = new string[4][](exam.questionCount);
        uint8[] memory correctAnswers = new uint8[](exam.questionCount);

        for (uint8 i = 0; i < exam.questionCount; i++) {
            questionTexts[i] = exam.questions[i].questionText;
            options[i] = exam.questions[i].options;
            correctAnswers[i] = exam.questions[i].correctAnswerIndex;
        }

        return (questionTexts, options, correctAnswers);
    }
}
