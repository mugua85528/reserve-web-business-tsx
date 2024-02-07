import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/app/hook";
import { seleteShop, clearShopData } from "../redux/reducers/shopReducer";
import ShopService from "../api/service";
import { persistor } from "../redux/app/store";
import { addDays, getDate, getMonth, getYear } from "date-fns";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 取得redux內的數據，分成商店資訊跟預約資訊
  const shop = useAppSelector(seleteShop);
  const shopData = shop.shopData;
  const reserved = shop.reserved;

  // 若沒有登入會先導向登入頁面
  // useEffect(() => {
  //   if (!localStorage.getItem("user")) {
  //     navigate("/login");
  //   }
  // });

  // 若重新整理可重新獲取最新資料
  // if (localStorage.getItem("user")) {
  //   window.onload = () => {
  //     navigate("/load");
  //   };
  // }

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

  // 處理預約日期
  const [week, setWeek] = useState<number>(0);
  const today: Date = new Date();

  // 放入8天的日期，[0]是當天
  const dates: Date[] = [];

  for (let i: number = 0; i < 8; i++) {
    dates.push(addDays(new Date(today), i + week));
  }

  function previousWeek(): void {
    if (week > 0) {
      setWeek(week - 7);
    }
  }

  function nextWeek(): void {
    if (week < 21) {
      setWeek(week + 7);
    }
  }

  // 處理預約時間，放入每日可預約的時間
  const eachReserveTime: string[] = [];
  for (let hour: number = 10; hour <= 22; hour++) {
    if (hour === 12) continue;
    today.setHours(hour);
    today.setMinutes(0);

    const formattdeTime = today.toLocaleTimeString("zh-hant", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    eachReserveTime.push(formattdeTime);
  }

  return (
    <div id="Home">
      <main className="main">
        <section className="header">
          <p className="title">預約訂單</p>
          <button className="week-btn" onClick={previousWeek}>
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <polygon points="352,115.4 331.3,96 160,256 331.3,416 352,396.7 201.5,256 " />
            </svg>
          </button>
          <p className="year-month">2024年2月</p>
          <button className="week-btn" onClick={nextWeek}>
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 " />
            </svg>
          </button>
        </section>

        <section className="reserved">{getDate(dates[0])}</section>
      </main>
    </div>
  );
};

export default Home;
