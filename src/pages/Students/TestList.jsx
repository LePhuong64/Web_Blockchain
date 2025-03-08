import React from "react";
import { Link } from "react-router-dom";
import "../../styles/testlist.css"; // Import file CSS

const mockTests = [
  { id: 1, title: "Bài kiểm tra JavaScript" },
  { id: 2, title: "Bài kiểm tra React" },
];

const TestList = () => {
  return (
    <div className="container">
      <div className="content">
        <h2 className="title">Danh sách bài kiểm tra</h2>
        <ul className="test-list">
          {mockTests.map((test) => (
            <li key={test.id} className="test-item">
              <Link to={`/take-test/${test.id}`} className="test-link">
                {test.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TestList;