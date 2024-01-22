import axios from "axios";
const API_URL = "http://127.0.0.1:8080/api/shop/";

export interface ShopType {
  shopName: string;
  description: string;
  address: string;
  openTime: number;
  closeTime: number;
}

// 提供所有後端api的服務
class ShopService {
  getReserved() {
    return axios.get("http://127.0.0.1:8080/api/");
  }

  getShopData() {
    return axios.get(API_URL);
  }

  register(userName: string, email: string, password: string) {
    return axios.post(API_URL + "register", { userName, email, password });
  }

  login(email: string, password: string) {
    return axios.post(API_URL + "login", {
      email,
      password,
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  setting(_id: string, shopData: ShopType) {
    return axios.patch(API_URL + _id, shopData);
  }
}

export default new ShopService();
