import { Link } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  return (
    <div className="khung-dang-nhap">
      <div className="hop-dang-nhap">
        <h1 className="tieu-de-dang-nhap">Đăng nhập</h1>

        <form>
          <div className="nhom-truong-nhap">
            <input
              type="text"
              placeholder="Tên đăng nhập"
              id="username"
              className="o-nhap-lieu"
            />
          </div>

          <div className="nhom-truong-nhap">
            <input
              type="password"
              placeholder="Mật khẩu"
              id="password"
              className="o-nhap-lieu"
              autoComplete="current-password"
            />
          </div>

          <button className="nut-dang-nhap">Đăng nhập</button>

          <div className="khung-dang-ky">
            Chưa có tài khoản?
            <Link to="/signUp" className="lien-ket-dang-ky">
              Đăng ký ngay
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;