import { Link } from "react-router-dom";
import "../styles/SignUp.css";

const SignUp = () => {
  return (
    <div className="khung-dang-nhap">
      <div className="hop-dang-nhap">
        <h2 className="tieu-de-dang-nhap">ĐĂNG KÝ</h2>

        <form>
          <div className="nhom-truong-nhap">
            <input
              type="text"
              placeholder="Tên đăng nhập"
              className="o-nhap-lieu"
              autoComplete="username"
            />
          </div>
          <div className="nhom-truong-nhap">
            <input
              type="email"
              placeholder="Email"
              className="o-nhap-lieu"
              autoComplete="email"
            />
          </div>
          <div className="nhom-truong-nhap">
            <input
              type="password"
              placeholder="Mật khẩu"
              className="o-nhap-lieu"
              autoComplete="new-password"
            />
          </div>
          <div className="nhom-truong-nhap">
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              className="o-nhap-lieu"
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="nut-dang-nhap">Đăng ký</button>

          <div className="khung-dang-ky">
            <span>Bạn đã có tài khoản? </span>
            <Link to="/login" className="lien-ket-dang-ky">
              Đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;