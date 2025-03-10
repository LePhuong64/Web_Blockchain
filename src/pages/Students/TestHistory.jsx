import React from "react";
import "../../styles/testlist.css"; 

const mockTestHistory = [
  { id: 1, title: "Bài kiểm tra JavaScript", score: 8.5 },
  { id: 2, title: "Bài kiểm tra React", score: 9.0 },
];

const TestHistory = () => {
  return (
    <div>
      <div className="card">
        <h2 className="card-title">Bài kiểm tra đã làm</h2>
        
        {mockTestHistory.map((test) => (
          <div 
            key={test.id} 
            className="exam-card"
            style={{ cursor: 'pointer' }}
          >
            <div className="exam-info">
              <div className="exam-title">{test.title}</div>
              <div className="exam-meta">
                Điểm: {test.score.toFixed(2)}
              </div>
            </div>
            {/* <div className="exam-actions">
              <button className="btn-primary">Xem lại</button>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestHistory;