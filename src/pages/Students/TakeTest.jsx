import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/taketest.css"; // Import file CSS

const mockTestData = {
  1: {
    title: "Bài kiểm tra JavaScript",
    questions: [
      {
        question: "JavaScript là ngôn ngữ gì?",
        options: ["Frontend", "Backend", "Cả hai", "Không phải"],
      },
    ],
  },
  2: {
    title: "Bài kiểm tra React",
    questions: [
      {
        question: "React là thư viện hay framework?",
        options: ["Thư viện", "Framework", "Cả hai", "Không phải"],
      },
    ],
  },
};

const TakeTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const test = mockTestData[id];
  const [answers, setAnswers] = useState({});

  if (!test) return <p>Không tìm thấy bài kiểm tra</p>;

  const handleSubmit = () => {
    navigate("/result", { state: { score: Math.random() * 10 } });
  };

  return (
    <div className="container">
      <div className="content">
        <h2 className="title">{test.title}</h2>
        {test.questions.map((q, index) => (
          <div key={index} className="question-block">
            <p className="question">{q.question}</p>
            {q.options.map((option, i) => (
              <label key={i} className="option">
                <input
                  type="radio"
                  name={index}
                  value={option}
                  onChange={() => setAnswers({ ...answers, [index]: option })}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button className="submit-button" onClick={handleSubmit}>Nộp bài</button>
      </div>
    </div>
  );
};

export default TakeTest;