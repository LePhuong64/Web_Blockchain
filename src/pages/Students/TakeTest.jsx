import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/taketest.css';

function TakeTest() {
  const [questions] = useState([
    { id: 1, question: 'Câu hỏi 1: Thủ đô của Việt Nam là gì?', options: ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Huế'] },
    { id: 2, question: 'Câu hỏi 2: 2 + 2 = ?', options: ['3', '4', '5', '6'] }
  ]);

  const navigate = useNavigate();

  const handleSubmit = () => {
    const score = Math.random() * 10; 
    navigate('/student/result', { state: { score } });
  };

  return (
    <div className="card">
      <h2 className="card-title">Bài kiểm tra</h2>

      {questions.map((q, index) => (
        <div key={q.id} className="exam-card">
          <div className="exam-info">
            <div className="exam-title">{`${index + 1}. ${q.question}`}</div>
            <div className="exam-meta">
              {q.options.map((opt, index) => (
                <div key={index} className="option">
                  <input type="radio" name={`question-${q.id}`} /> {opt}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <button className="btn-primary submit-button" onClick={handleSubmit}>Nộp bài</button>
    </div>
  );
}

export default TakeTest;