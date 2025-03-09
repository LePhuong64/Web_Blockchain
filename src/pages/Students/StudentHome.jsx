import React from "react";
import { Link } from "react-router-dom";
import "../../styles/studenthome.css"; 

const StudentHome = () => {
  const studentName = "Lê Thị Phượng ";

  return (
    <div className="container">
      <div className="content">
        <h1 className="student-name">Xin chào, {studentName}</h1>
        <div className="menu">
          <Link to="/test-list" className="menu-item">
            Danh sách bài kiểm tra
          </Link>
          <Link to="/history" className="menu-item">
            Bài kiểm tra đã làm
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;