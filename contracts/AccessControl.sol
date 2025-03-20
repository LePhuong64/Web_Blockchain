// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AccessControl {
    address public admin;
    mapping(address => bool) public teachers;
    mapping(address => bool) public students;

    event AdminChanged(address indexed oldAdmin, address indexed newAdmin);
    event TeacherAdded(address indexed teacher);
    event StudentAdded(address indexed student);
    event TeacherRemoved(address indexed teacher);
    event StudentRemoved(address indexed student);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyTeacher() {
        require(teachers[msg.sender], "Only teacher can perform this action");
        _;
    }

    modifier onlyStudent() {
        require(students[msg.sender], "Only student can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender; // Người deploy contract là admin
        emit AdminChanged(address(0), msg.sender);
    }

    function changeAdmin(address _newAdmin) external onlyAdmin {
        require(_newAdmin != address(0), "New admin cannot be zero address");
        emit AdminChanged(admin, _newAdmin);
        admin = _newAdmin;
    }

    function addTeacher(address _teacher) external onlyAdmin {
        require(_teacher != address(0), "Invalid teacher address");
        require(!teachers[_teacher], "Already a teacher");
        teachers[_teacher] = true;
        emit TeacherAdded(_teacher);
    }

    function addStudent(address _student) external onlyAdmin {
        require(_student != address(0), "Invalid student address");
        require(!students[_student], "Already a student");
        students[_student] = true;
        emit StudentAdded(_student);
    }

    function removeTeacher(address _teacher) external onlyAdmin {
        require(teachers[_teacher], "Not a teacher");
        teachers[_teacher] = false;
        emit TeacherRemoved(_teacher);
    }

    function removeStudent(address _student) external onlyAdmin {
        require(students[_student], "Not a student");
        students[_student] = false;
        emit StudentRemoved(_student);
    }

    function isTeacher(address _user) external view returns (bool) {
        return teachers[_user];
    }

    function isStudent(address _user) external view returns (bool) {
        return students[_user];
    }
}
