import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../../types/reducer-types";
import { ShippingInfo } from "../../types/types";

const getShippingInfo = () => {
  let localCart = localStorage.getItem("shippingInfo");
  if (localCart == " " || localCart == null) {
    return {
      address: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
    };
  } else {
    return JSON.parse(localCart);
  }
};

const initialState: CartReducerInitialState = {
  loading: false,
  subtotal: 0,
  tax: 0,
  shippingCharges: 0,
  discount: 0,
  total: 0,
  totalCart: 0,
  shippingInfo: getShippingInfo(),
};

export const cartReducer = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    totalCartItems: (state, action) => {
      const cart = action?.payload;
      const updateCartValue = cart?.length
      state.totalCart = updateCartValue;
    },
    calculatePrice: (state, action) => {
      const cartItems = action.payload;
      const subtotal = cartItems.reduce(
        (total: any, item: any) => total + item.price * item.quantity,
        0
      );

      state.subtotal = subtotal;
      state.shippingCharges = state.subtotal > 1000 ? 0 : 200;
      state.tax = Math.round(state.subtotal * 0.18);
      state.total =
        state.subtotal + state.tax + state.shippingCharges - state.discount;
    },
    discountApplied: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
    saveShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
      const data = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(data));
    },
    resetCart: () => initialState,
  },
});

export const {
  totalCartItems,
  calculatePrice,
  discountApplied,
  saveShippingInfo,
  resetCart
} = cartReducer.actions;
