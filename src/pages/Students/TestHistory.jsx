import React from "react";
import { Link } from "react-router-dom";
import "../../styles/testhistory.css"; // Import file CSS

const mockTestHistory = [
  { id: 1, title: "Bài kiểm tra JavaScript", score: 8.5 },
  { id: 2, title: "Bài kiểm tra React", score: 9.0 },
];

const TestHistory = () => {
  return (
    <div className="container">
      <div className="content">
        <h2 className="title">Bài kiểm tra đã làm </h2>
        <ul className="test-history-list">
          {mockTestHistory.map((test) => (
            <li key={test.id} className="test-history-item">
              <Link to={`/take-test/${test.id}`} className="test-history-link">
                {test.title}
              </Link>
              <span className="test-score">Điểm: {test.score.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TestHistory;