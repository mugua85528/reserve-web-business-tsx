import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShopService from "../api/service";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const userHandler = (e: any) => {
    setUserName(e.target.value);
  };

  const emailHandler = (e: any) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e: any) => {
    setPassword(e.target.value);
  };

  // 註冊商家會員
  const registerHandler = async () => {
    try {
      await ShopService.register(userName, email, password);
      window.alert("註冊成功! 請重新登入");
      navigate("/login");
    } catch (e: any) {
      setMessage(e.response.data);
    }
  };

  const loginHandler = () => {
    navigate("/login");
  };

  return (
    <div id="Register">
      <div className="card">
        <p className="hello">請填寫以下資料</p>
        <div className="data">
          <label htmlFor="username">業主名稱</label>
          <input
            placeholder="請輸入公司或個人名稱"
            name="username"
            type="text"
            onChange={userHandler}
          />
          <label htmlFor="email">業主信箱</label>
          <input
            placeholder="請輸入公司或個人信箱"
            name="email"
            type="email"
            onChange={emailHandler}
          />
          <label htmlFor="password">密碼</label>
          <input
            placeholder="請輸入密碼"
            name="password"
            type="password"
            onChange={passwordHandler}
          />
        </div>
        {message && (
          <div className="message">
            <p>{message}</p>
          </div>
        )}
        <button className="register" onClick={registerHandler}>
          註冊
        </button>
        <div className="login">
          <p>已經註冊過了?</p>
          <button onClick={loginHandler}>點我返回登入</button>
        </div>
      </div>
      <div className="footer">
        <footer>&copy; 2023 Marcus Mu</footer>
      </div>
    </div>
  );
};

export default Register;
