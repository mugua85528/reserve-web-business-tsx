import React, { useState } from "react";
import ShopService from "../api/service";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/app/hook";
import { seleteShop, setShop } from "../redux/reducers/shopReducer";

const Setting: React.FC = () => {
  const navigate = useNavigate();
  const [shopName, setShopName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [openTime, setOpenTime] = useState<number>(0);
  const [closeTime, setCloseTime] = useState<number>(24);
  const [message, setMessage] = useState<string>("");
  const shopLoginData = useAppSelector(seleteShop);
  const dispatch = useAppDispatch();

  const shopNameHandler = (e: any) => {
    setShopName(e.target.value);
  };

  const decriptionHandler = (e: any) => {
    setDescription(e.target.value);
  };

  const addressHandler = (e: any) => {
    setAddress(e.target.value);
  };

  const openTimeHandler = (e: any) => {
    setOpenTime(e.target.value);
  };

  const closeTimeHandler = (e: any) => {
    setCloseTime(e.target.value);
  };

  // 將資料更新到後端並同步更新redux
  const settingHandler = async () => {
    let _id: string = shopLoginData.loginData._id;

    let allData = {
      shopName: shopName,
      description: description,
      address: address,
      openTime: openTime,
      closeTime: closeTime,
    };
    try {
      await ShopService.setting(_id, allData);
      dispatch(setShop(allData));
      window.alert("更新成功! 導向商家頁面");
      navigate("/load");
    } catch (e: any) {
      setMessage(e.response.data);
    }
  };

  const turnBackackHandler = () => {
    navigate("/");
  };

  return (
    <div id="Setting">
      <div className="card">
        <p className="hello">更改資料</p>
        <div className="data">
          <label htmlFor="shopName">商店名稱</label>
          <input
            onChange={shopNameHandler}
            name="shopName"
            type="text"
            placeholder="請輸入商店名稱"
          />
          <label htmlFor="description">商店簡介</label>
          <input
            onChange={decriptionHandler}
            name="description"
            type="text"
            placeholder="請輸入商店簡介，不得超過30個字"
          />
          <label htmlFor="address">商店地址</label>
          <input
            onChange={addressHandler}
            name="address"
            type="text"
            placeholder="請輸入商店地址"
          />
          <label htmlFor="startTime">開始營業時間</label>
          <input
            onChange={openTimeHandler}
            name="startTime"
            type="text"
            placeholder="請輸入0~24的整數數字，例:早上10點請填10"
          />
          <label htmlFor="endTime">結束營業時間</label>
          <input
            onChange={closeTimeHandler}
            name="endTime"
            type="text"
            placeholder="請輸入0~24的整數數字，例:晚上10點請填22"
          />
        </div>
        {message && (
          <div className="message">
            <p>{message}</p>
          </div>
        )}
        <div className="button">
          <button className="setting" onClick={settingHandler}>
            設定
          </button>
          <button className="back" onClick={turnBackackHandler}>
            返回
          </button>
        </div>
      </div>
      <div className="footer">
        <footer>&copy; 2023 Marcus Mu</footer>
      </div>
    </div>
  );
};

export default Setting;
