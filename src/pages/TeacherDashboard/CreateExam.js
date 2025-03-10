import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css'; 

function CreateExam() {
  const [examName, setExamName] = useState('');
  const [duration, setDuration] = useState('60');
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    if (!questionText.trim()) {
      alert('Vui lòng nhập nội dung câu hỏi!');
      return;
    }

    if (options.some(option => !option.trim())) {
      alert('Vui lòng nhập đầy đủ các phương án trả lời!');
      return;
    }

    setQuestions([
      ...questions,
      {
        id: Date.now(),
        questionText,
        options: [...options],
        correctAnswer,
      },
    ]);
    
    // Reset form
    setQuestionText('');
    setOptions(['', '', '', '']);
    setCorrectAnswer(0);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleRemoveQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!examName.trim()) {
      alert('Vui lòng nhập tên bài kiểm tra!');
      return;
    }

    if (questions.length === 0) {
      alert('Vui lòng thêm ít nhất một câu hỏi!');
      return;
    }
    
    // Gửi dữ liệu bài kiểm tra lên backend
    console.log({
      examName,
      duration,
      questions,
      createdAt: new Date().toISOString()
    });
    
    alert('Tạo bài kiểm tra thành công!');
    navigate('/teacher/manage-exams');
  };
  return (
    <div className="card">
      <h2 className="card-title">Tạo bài kiểm tra</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="form-label">Tên bài kiểm tra</label>
            <input
              type="text"
              className="form-input"
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              placeholder="Nhập tên bài kiểm tra"
            />
          </div>
          
          <div className="form-control">
            <label className="form-label">Thời gian làm bài (phút)</label>
            <select
              className="form-select"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="15">15 phút</option>
              <option value="30">30 phút</option>
              <option value="45">45 phút</option>
              <option value="60">60 phút</option>
              <option value="90">90 phút</option>
              <option value="120">120 phút</option>
            </select>
          </div>
          
          <div className="question-container">
            <h3 style={{ marginBottom: '15px' }}>Thêm câu hỏi mới</h3>
            
            <div className="form-control">
              <label className="form-label">Câu hỏi</label>
              <input
                type="text"
                className="form-input"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Nhập nội dung câu hỏi"
              />
            </div>
            
            {options.map((option, index) => (
              <div className="option-group" key={index}>
                <label className="form-label">Đáp án {index + 1}</label>
                <input
                  type="text"
                  className="form-input"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Nhập đáp án ${index + 1}`}
                />
              </div>
            ))}
            
            <div className="form-control">
              <label className="form-label">Đáp án đúng</label>
              <select
                className="form-select"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(parseInt(e.target.value))}
              >
                {options.map((_, index) => (
                  <option key={index} value={index}>
                    Đáp án {index + 1}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              type="button"
              className="btn-secondary"
              onClick={handleAddQuestion}
              style={{ marginTop: '15px' }}
            >
              Thêm câu hỏi
            </button>
          </div>
          
          {questions.length > 0 && (
            <div className="added-questions">
              <h3 style={{ marginBottom: '15px' }}>Danh sách câu hỏi ({questions.length})</h3>
              
              {questions.map((q, index) => (
                <div className="question-item" key={q.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ fontWeight: 'bold' }}>Câu hỏi {index + 1}</div>
                    <button
                      type="button"
                      className="btn-delete"
                      onClick={() => handleRemoveQuestion(q.id)}
                      style={{ padding: '3px 8px' }}
                    >
                      Xóa
                    </button>
                  </div>
                  <div style={{ margin: '10px 0' }}>{q.questionText}</div>
                  <div>
  {q.options.map((option, i) => (
    <div key={i}>- {option}</div>
  ))}
</div>
                </div>
              ))}
            </div>
          )}

          <button type="submit" className="btn-primary" style={{ marginTop: '20px' }}>
            Tạo bài kiểm tra
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateExam;