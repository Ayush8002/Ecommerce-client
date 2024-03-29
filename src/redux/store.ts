import { configureStore } from "@reduxjs/toolkit";
import { productAPI } from "./api/productAPI";
import { userAPI} from "./api/userAPI";
import { userReducer } from "./reducer/userReducer";
import { productFilterReducer } from "./reducer/productFilterReducer";
import { cartReducer } from "./reducer/cartReducer";
import { cartItemsReducer } from "./reducer/cartItemReducer";
import { orderAPI } from "./api/orderAPI";
import { dashboardApi } from "./api/dashboardAPI";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [productFilterReducer.name]: productFilterReducer.reducer,
    [userReducer.name]: userReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,
    [cartItemsReducer.name]: cartItemsReducer.reducer,
  },
  middleware: (mid) => [
    ...mid(),
    userAPI.middleware,
    productAPI.middleware,
    orderAPI.middleware,
    dashboardApi.middleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>;
