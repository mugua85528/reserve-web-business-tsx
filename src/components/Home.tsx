import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/app/hook";
import { seleteShop, clearShopData } from "../redux/reducers/shopReducer";
import ShopService from "../api/service";
import { persistor } from "../redux/app/store";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 取得redux內的數據，分成商店資訊跟預約資訊
  const shop = useAppSelector(seleteShop);
  const shopData = shop.shopData;
  const reserved = shop.reserved;

  // 若沒有登入會先導向登入頁面
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  });

  // 若重新整理可重新獲取最新資料
  if (localStorage.getItem("user")) {
    window.onload = () => {
      navigate("/load");
    };
  }

  const settingHandler = () => {
    navigate("/setting");
  };

  // 登出按鈕
  const logoutHandler = () => {
    ShopService.logout();
    dispatch(clearShopData());
    persistor.purge();
    window.alert("登出成功! 導向登入介面");
    navigate("/login");
  };

  // 設定打開預約資訊的交互狀態
  const [hiden, setHiden] = useState<boolean>(true);

  const displayHandler = () => {
    if (hiden === true) {
      setHiden(false);
    } else {
      setHiden(true);
    }
  };

  return (
    <div id="ShopPage">
      {shopData && (
        <div className="card">
          <h1>{shopData.shopName}</h1>
          <div className="shopdata-p">
            <p>{shopData.description}</p>
          </div>
          <div className="shopdata-p">
            <p>店址 : {shopData.address}</p>
          </div>
          <div className="shopdata-p">
            <p>開始營業時間:</p>
            <p>{shopData.openTime}點</p>
          </div>
          <div className="shopdata-p">
            <p>結束營業時間:</p>
            <p>{shopData.closeTime}點</p>
          </div>
          <div className="button">
            <button onClick={settingHandler}>修改商店資訊</button>
            <button onClick={logoutHandler}>登出</button>
          </div>
        </div>
      )}
      <p className="reverse-title">以下是即將到來的預約</p>
      {reserved && (
        <div className="reverse-div">
          {reserved.map((data, index) => {
            return (
              <div className="reverse-card" key={index}>
                <div onClick={displayHandler} className="display">
                  <p className="arow">〉</p>
                  <div className="display-p date">
                    <p>
                      {data.month}月{data.date}日{data.time}點
                    </p>
                  </div>
                  <div className="display-p name">
                    <p>
                      {data.name}
                      {data.gender}
                    </p>
                  </div>
                  <div className="display-p service">
                    <p>{data.service}</p>
                  </div>
                </div>
                <div className={hiden == true ? "hiden" : "visible"}>
                  <div className="other">
                    <div className="other-p phone">
                      <p>手機 :</p>
                      <p>0{data.phone}</p>
                    </div>
                    <div className="other-p email">
                      <p>信箱 :</p>
                      <p>{data.email}</p>
                    </div>
                    <div className="other-p textarea">
                      <p>備註 :</p>
                      <p>{data.textarea}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="footer">
        <footer>&copy; 2023 Marcus Mu</footer>
      </div>
    </div>
  );
};

export default Home;
