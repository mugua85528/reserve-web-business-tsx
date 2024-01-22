import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import shopReducer from "../reducers/shopReducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedShopReducer = persistReducer(persistConfig, shopReducer);

const store = configureStore({
  reducer: {
    shop: persistedShopReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
