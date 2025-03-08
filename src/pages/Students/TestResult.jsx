import React from "react";
import { useLocation } from "react-router-dom";
import "../../styles/testresult.css"; // Import file CSS

const TestResult = () => {
  const location = useLocation();
  const { score } = location.state || { score: 0 };

  return (
    <div className="container">
      <div className="content">
        <h2 className="title">Kết quả bài kiểm tra</h2>
        <p className="score">Điểm số: {score.toFixed(2)} / 10</p>
      </div>
    </div>
  );
};

export default TestResult;