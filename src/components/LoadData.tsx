import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShopService from "../api/service";
import { useAppDispatch } from "../redux/app/hook";
import {
  setShop,
  setLogin,
  ShopType,
  setReserved,
} from "../redux/reducers/shopReducer";

const LoadData: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 從shopReducer拿來利用type
  type loginType = Pick<ShopType, "_id" | "userName" | "email">;

  useEffect(() => {
    (async function () {
      try {
        // 取得商店登入資訊並存到redux
        let shopRes = (await ShopService.getShopData()).data[0] as ShopType;

        let shopLoginData: loginType = {
          _id: shopRes._id,
          userName: shopRes.userName,
          email: shopRes.email,
        };

        dispatch(setLogin(shopLoginData));

        // 若第一次登入則導向更新商店資訊
        if (!shopRes.shopName) {
          navigate("/setting");
          return;
        }

        // 取得預約資訊並存到redux
        let reservedRes = await ShopService.getReserved();
        dispatch(setShop(shopRes));
        dispatch(setReserved(reservedRes.data));
        navigate("/");
      } catch (e: any) {
        console.log(e);
        window.alert("資料獲取失敗，請聯繫開發人員");
        navigate("/");
      }
    })();
  }, []);

  return (
    <div>
      <h1>資料獲取中，請稍後。</h1>
    </div>
  );
};

export default LoadData;
