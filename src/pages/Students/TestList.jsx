import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/testlist.css';

function TestList() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setExams([
      { 
        id: 1, 
        name: 'Kiểm tra giữa kỳ', 
        duration: '60 phút'
      },
      { 
        id: 2, 
        name: 'Bài kiểm tra cuối kỳ', 
        duration: '90 phút'
      },
      { 
        id: 3, 
        name: 'Quiz', 
        duration: '30 phút'
      }
    ]);
  }, []);

  const handleTakeTest = (id) => {
    navigate(`/student/take-test/${id}`);
  };

  return (
    <div>
      <div className="card">
        <h2 className="card-title">Danh sách bài kiểm tra</h2>
        
        {exams.map((exam) => (
        <div key={exam.id} className="exam-card">
          <div className="exam-info">
            <div className="exam-title">{exam.name}</div>
            <div className="exam-meta">Thời gian: {exam.duration}</div>
          </div>
          <div className="exam-actions">
            <button className="btn-primary" onClick={() => handleTakeTest(exam.id)}>Làm bài</button>
          </div>
        </div>
        ))}

      </div>
    </div>
  );
}

export default TestList;