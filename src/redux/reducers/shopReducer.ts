import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { PURGE } from "redux-persist";

export interface ShopType {
  _id: string;
  userName: string;
  email: string;
  shopName: string;
  description: string;
  address: string;
  openTime: number;
  closeTime: number;
}

type loginDataType = Pick<ShopType, "_id" | "userName" | "email">;
type ShopDataType = Omit<ShopType, "userName" | "email" | "_id">;

interface ShopState {
  loginData: loginDataType;
  shopData: ShopDataType;
  reserved: ReservedItem[];
}

interface ReservedItem {
  year: number;
  month: number;
  date: number;
  day: number;
  time: string;
  sec: number;
  service: string;
  price: number;
  name: string;
  phone: string;
  gender: string;
  email: string;
  textarea: string;
  terms: boolean;
}

interface ReservedType {
  reserved: ReservedItem[];
}

const initialState: ShopState = {
  loginData: { _id: "", userName: "", email: "" },
  shopData: {
    shopName: "",
    description: "",
    address: "",
    openTime: 0,
    closeTime: 24,
  },
  reserved: [],
};

const shopReducer = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<loginDataType>) => {
      state.loginData = action.payload;
    },

    setShop: (state, action: PayloadAction<ShopDataType>) => {
      state.shopData = action.payload;
    },

    setReserved: (state, action: PayloadAction<any>) => {
      state.reserved = action.payload;
    },

    getShop: (state) => {
      return state;
    },

    clearShopData: (state) => {
      state = initialState;
    },

    extraReducers: (builder: any) => {
      builder.addCase(PURGE, () => {
        return initialState;
      });
    },
  },
});

export const { setLogin, setShop, getShop, clearShopData, setReserved } =
  shopReducer.actions;

export const seleteShop = (state: RootState) => state.shop;

export default shopReducer.reducer;
