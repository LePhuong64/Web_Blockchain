pragma solidity ^0.8.0;

contract ExamSystem {
    struct Exam {
        uint256 id;
        string name;
        string date;
        uint256 duration;
        uint256 questions;
        address creator;
    }

    struct User {
        string username;
        string email;
        string password;
        bool isTeacher;
    }

    struct Question {
        uint256 id;
        string questionText;
        string[] options;
        uint256 correctAnswer;
    }

    struct Result {
        uint256 examId;
        address student;
        uint256 score;
    }

    Exam[] public exams;
    mapping(address => User) public users;
    mapping(uint256 => Question[]) public examQuestions;
    Result[] public results;
    uint256 public nextExamId;

    function createExam(string memory _name, string memory _date, uint256 _duration, uint256 _questions) public {
        require(users[msg.sender].isTeacher, "Only teachers can create exams");
        exams.push(Exam({
            id: nextExamId,
            name: _name,
            date: _date,
            duration: _duration,
            questions: _questions,
            creator: msg.sender
        }));
        nextExamId++;
    }

    function addQuestion(uint256 _examId, string memory _questionText, string[] memory _options, uint256 _correctAnswer) public {
        require(users[msg.sender].isTeacher, "Only teachers can add questions");
        examQuestions[_examId].push(Question({
            id: examQuestions[_examId].length,
            questionText: _questionText,
            options: _options,
            correctAnswer: _correctAnswer
        }));
    }

    function registerUser(string memory _username, string memory _email, string memory _password, bool _isTeacher) public {
        users[msg.sender] = User({
            username: _username,
            email: _email,
            password: _password,
            isTeacher: _isTeacher
        });
    }

    function submitResult(uint256 _examId, uint256 _score) public {
        results.push(Result({
            examId: _examId,
            student: msg.sender,
            score: _score
        }));
    }

    function getExams() public view returns (Exam[] memory) {
        return exams;
    }

    function getQuestions(uint256 _examId) public view returns (Question[] memory) {
        return examQuestions[_examId];
    }

    function getUser(address _user) public view returns (User memory) {
        return users[_user];
    }

    function getResults() public view returns (Result[] memory) {
        return results;
    }
}