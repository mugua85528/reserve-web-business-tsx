import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShopService from "../api/service";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const emailHandler = (e: any) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e: any) => {
    setPassword(e.target.value);
  };

  // 登入會員並存在localStorage
  const loginHandler = async () => {
    try {
      let response = await ShopService.login(email, password);
      localStorage.setItem("user", response.data);
      window.alert("登入成功! 頁面將導向商店頁面");
      navigate("/load");
    } catch (e: any) {
      setMessage(e.response.data);
    }
  };

  const registerHandler = () => {
    navigate("/register");
  };

  return (
    <div id="Home">
      <div className="card">
        <p className="hello">哈囉您好，請先登入系統</p>
        <div className="login">
          <label htmlFor="email">信箱</label>
          <input
            name="email"
            placeholder="請輸入您的信箱"
            type="email"
            onChange={emailHandler}
          />
          <label htmlFor="password">密碼</label>
          <input
            name="password"
            placeholder="請輸入您的密碼"
            type="password"
            onChange={passwordHandler}
          />
        </div>
        {message && (
          <div className="message">
            <p>{message}</p>
          </div>
        )}
        <button className="login-button" onClick={loginHandler}>
          登入
        </button>
        <div className="register">
          <p>還沒註冊嗎?</p>
          <button onClick={registerHandler}>點我註冊</button>
        </div>
      </div>
      <div className="footer">
        <footer>&copy; 2023 Marcus Mu</footer>
      </div>
    </div>
  );
};

export default Login;
