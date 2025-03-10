import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css'; 

function ManageExam() {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Lấy danh sách bài kiểm tra từ backend và cập nhật state `exams`
    // Ví dụ: fetch('/api/exams').then(res => res.json()).then(data => setExams(data));
    // Ở đây, tôi sẽ dùng dữ liệu mẫu
    setExams([
      { 
        id: 1, 
        name: 'Kiểm tra giữa kỳ', 
        date: '05/03/2025',
        duration: '60 phút',
        questions: 15,
        submitted: 28,
        total: 35
      },
      { 
        id: 2, 
        name: 'Bài kiểm tra cuối kỳ', 
        date: '05/03/2025',
        duration: '90 phút',
        questions: 20,
        submitted: 32,
        total: 35
      },
      { 
        id: 3, 
        name: 'Quiz', 
        date: '05/03/2025',
        duration: '30 phút',
        questions: 10,
        submitted: 30,
        total: 35
      }
    ]);
  }, []);

  useEffect(() => {
    // Chọn bài kiểm tra đầu tiên mặc định khi danh sách được tải
    if (exams.length > 0 && !selectedExam) {
      setSelectedExam(exams[0]);
    }
  }, [exams, selectedExam]);

  const handleDelete = (id) => {
    // Xóa bài kiểm tra có id tương ứng từ backend
    setExams(exams.filter((exam) => exam.id !== id));
    if (selectedExam && selectedExam.id === id) {
      setSelectedExam(exams.length > 1 ? exams[0] : null);
    }
  };

  const filteredExams = exams.filter(exam => 
    exam.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="card">
        <h2 className="card-title">Quản lý bài kiểm tra</h2>
        
        <div className="search-container">
          <div className="search-bar">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Tìm kiếm bài kiểm tra..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Link to="/teacher/create-exam" className="create-btn">
          Tìm kiếm
          </Link>
        </div>
        
        <div className="filter-options" style={{ display: 'flex', marginBottom: '20px' }}>
          <div style={{ marginRight: '10px', padding: '10px 20px', border: '1px solid #dadce0', borderRadius: '5px' }}>
            Lọc
          </div>
          <div style={{ padding: '10px 20px', border: '1px solid #dadce0', borderRadius: '5px' }}>
            Sắp xếp theo
          </div>
        </div>
        
        {filteredExams.map((exam) => (
          <div 
            key={exam.id} 
            className="exam-card"
            onClick={() => setSelectedExam(exam)}
            style={{ cursor: 'pointer' }}
          >
            <div className="exam-title">{exam.name}</div>
            <div className="exam-meta">
              Ngày tạo: {exam.date} | Thời gian: {exam.duration} | Số câu hỏi: {exam.questions}
            </div>
            <div className="exam-actions">
              <button className="btn-edit">Chỉnh sửa</button>
              <button 
                className="btn-delete" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(exam.id);
                }}
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {selectedExam && (
        <div className="card exam-detail">
          <h3 className="detail-title">Chi tiết bài kiểm tra</h3>
          
          <div className="detail-item">
            <div className="detail-label">Tên bài kiểm tra:</div>
            <div className="detail-value">{selectedExam.name}</div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Thời gian:</div>
            <div className="detail-value">{selectedExam.duration}</div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Số câu hỏi:</div>
            <div className="detail-value">{selectedExam.questions} câu</div>
          </div>
          
          <div className="detail-item">
            <div className="detail-label">Số sinh viên đã nộp:</div>
            <div className="detail-value">{selectedExam.submitted}/{selectedExam.total}</div>
          </div>
          
          <div className="detail-actions">
            <button className="btn-secondary">Xem kết quả</button>
            <button className="btn-primary">Chấm điểm</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageExam;