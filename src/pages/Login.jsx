import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      const { token, isTeacher } = response.data;
      localStorage.setItem('token', token);
      if (isTeacher) {
        navigate('/teacher/manage-exams');
      } else {
        navigate('/student/test-list');
      }
    } catch (error) {
      alert('Thông tin đăng nhập không chính xác');
    }
  };

  return (
    <div className="khung-dang-nhap">
      <div className="hop-dang-nhap">
        <h2 className="tieu-de-dang-nhap">ĐĂNG NHẬP</h2>

        <form onSubmit={handleSubmit}>
          <div className="nhom-truong-nhap">
            <input
              type="email"
              placeholder="Email"
              className="o-nhap-lieu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="nhom-truong-nhap">
            <input
              type="password"
              placeholder="Mật khẩu"
              className="o-nhap-lieu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="nut-dang-nhap">Đăng nhập</button>

          <div className="khung-dang-ky">
            <span>Bạn chưa có tài khoản? </span>
            <Link to="/signup" className="lien-ket-dang-ky">
              Đăng ký
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;