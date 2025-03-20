// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract UserManagement {
    enum Role { None, Admin, TrainingHead, Teacher, Student }

    mapping(address => Role) public users;
    mapping(address => address) public wallets; // Lưu địa chỉ ví của user
    address public admin;
    address[] public userList; // Lưu danh sách tất cả user

    // Mapping kiểm tra bài kiểm tra và điểm số đã được duyệt chưa
    mapping(uint256 => bool) public approvedExams;
    mapping(uint256 => bool) public approvedScores;

    event UserRegistered(address indexed user, Role role);
    event UserRemoved(address indexed user);
    event WalletLinked(address indexed user, address wallet);
    event AdminAssigned(address indexed newAdmin);
    event ExamApproved(uint256 indexed examId, address indexed trainingHead);
    event ScoreApproved(uint256 indexed examId, address indexed teacher);

    modifier onlyAdmin() {
        require(users[msg.sender] == Role.Admin, "Only admin can perform this action");
        _;
    }

    modifier onlyTrainingHead() {
        require(users[msg.sender] == Role.TrainingHead, "Only Training Head can approve exams");
        _;
    }

    modifier onlyTeacher() {
        require(users[msg.sender] == Role.Teacher, "Only Teacher can approve scores");
        _;
    }

    constructor() {
        admin = msg.sender;
        users[msg.sender] = Role.Admin;
        userList.push(msg.sender);
        emit UserRegistered(msg.sender, Role.Admin);
    }

    function registerAdmin(address _newAdmin) public onlyAdmin {
        require(_newAdmin != address(0), "Invalid address");
        require(users[_newAdmin] == Role.None, "User already registered");

        users[_newAdmin] = Role.Admin;
        userList.push(_newAdmin);
        emit AdminAssigned(_newAdmin);
        emit UserRegistered(_newAdmin, Role.Admin);
    }

    function registerTrainingHead(address _trainingHead) public onlyAdmin {
        require(_trainingHead != address(0), "Invalid address");
        require(users[_trainingHead] == Role.None, "User already registered");

        users[_trainingHead] = Role.TrainingHead;
        userList.push(_trainingHead);
        emit UserRegistered(_trainingHead, Role.TrainingHead);
    }

    function registerTeacher(address _teacher) public onlyAdmin {
        require(_teacher != address(0), "Invalid address");
        require(users[_teacher] == Role.None, "User already registered");

        users[_teacher] = Role.Teacher;
        userList.push(_teacher);
        emit UserRegistered(_teacher, Role.Teacher);
    }

    function registerStudent() public {
        require(users[msg.sender] == Role.None, "User already registered");

        users[msg.sender] = Role.Student;
        userList.push(msg.sender);
        emit UserRegistered(msg.sender, Role.Student);
    }

    function removeUser(address _user) public onlyAdmin {
        require(users[_user] != Role.Admin, "Cannot remove admin");
        require(users[_user] != Role.None, "User not found");

        delete users[_user];
        delete wallets[_user];

        for (uint i = 0; i < userList.length; i++) {
            if (userList[i] == _user) {
                userList[i] = userList[userList.length - 1];
                userList.pop();
                break;
            }
        }

        emit UserRemoved(_user);
    }

    function getUserRole(address _user) public view returns (Role) {
        return users[_user];
    }

    function linkWallet(address _wallet) public {
        require(users[msg.sender] != Role.None, "User not registered");
        require(wallets[msg.sender] == address(0), "Wallet already linked");

        wallets[msg.sender] = _wallet;
        emit WalletLinked(msg.sender, _wallet);
    }

    function getWalletAddress(address _user) public view returns (address) {
        return wallets[_user];
    }

    function getAllUsers() public view returns (address[] memory) {
        return userList;
    }

    // Trưởng phòng đào tạo duyệt bài kiểm tra trước khi sinh viên làm bài
    function approveExam(uint256 examId) public onlyTrainingHead {
        require(!approvedExams[examId], "Exam already approved");
        approvedExams[examId] = true;
        emit ExamApproved(examId, msg.sender);
    }

    // Giáo viên duyệt điểm trước khi sinh viên xem được điểm
    function approveScore(uint256 examId) public onlyTeacher {
        require(!approvedScores[examId], "Score already approved");
        approvedScores[examId] = true;
        emit ScoreApproved(examId, msg.sender);
    }

    // Kiểm tra xem bài kiểm tra đã được duyệt chưa
    function isExamApproved(uint256 examId) public view returns (bool) {
        return approvedExams[examId];
    }

    // Kiểm tra xem điểm đã được duyệt chưa
    function isScoreApproved(uint256 examId) public view returns (bool) {
        return approvedScores[examId];
    }
}
