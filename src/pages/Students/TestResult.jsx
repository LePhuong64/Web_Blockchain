import React from "react";
import { useLocation, Link } from "react-router-dom";
import "../../styles/testresult.css"; // Import file CSS

const TestResult = () => {
  const location = useLocation();
  const { score } = location.state || { score: 0 };

  return (
    <div className="container">
      <div className="content">
        <h2 className="title">Kết quả bài kiểm tra</h2>
        <p className="score">Điểm số: {score.toFixed(2)} / 10</p>
        <Link to="/" className="back-button">Quay lại trang chủ</Link>
      </div>
    </div>
  );
};

export default TestResult;