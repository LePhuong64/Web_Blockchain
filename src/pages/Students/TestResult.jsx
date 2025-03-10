import React from "react";
import { useLocation, Link } from "react-router-dom";
import "../../styles/testresult.css";

const TestResult = () => {
  const location = useLocation();
  const { score } = location.state || { score: 0 };

  return (
    <div className="card">
      <h2 className="card-title">Kết quả bài kiểm tra</h2>
      <div className="exam-card">
        <div className="exam-info">
          <div className="exam-title">Điểm số</div>
          <div className="exam-meta">{score.toFixed(2)} / 10</div>
        </div>
      </div>
      <div className="button-container">
        <Link to="/student/test-list" className="btn-primary back-button">Quay lại trang chủ</Link>
      </div>
    </div>
  );
};

export default TestResult;