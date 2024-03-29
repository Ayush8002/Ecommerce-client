import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../../types/types";

const getLocalCartData = () => {
  let localCart = localStorage.getItem("productCart");
  if (localCart == " " || localCart == null) {
    return [];
  } else {
    return JSON.parse(localCart);
  }
};

const initialState = getLocalCartData();

export const cartItemsReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductCart: (state, action: PayloadAction<CartItem>) => {
      const cart = action.payload;
      console.log(cart);

      let existingProduct = state?.find(
        (curItem: any) => curItem.productId === cart?.productId
      );
      if (existingProduct) {
        let updateProduct = state?.map((curItem: any) => {
          if (curItem.productId == cart?.productId) {
            let newAmount = curItem.quantity + cart?.quantity;
            if (newAmount >= curItem.stock) {
              newAmount = curItem.stock;
            }
            curItem.quantity = newAmount;
          }
          return curItem;
        });
        state = updateProduct;

        localStorage.setItem("productCart", JSON.stringify(state));
      } else {
        state.unshift(cart);
        localStorage.setItem("productCart", JSON.stringify(state));
      }
    },
    removeCart: (state, action: PayloadAction<string>) => {
      state.splice(action.payload, 1);

      localStorage.setItem("productCart", JSON.stringify(state));

      // 2nd way to remove cart item
      // ==============================
      // let userIndexNum = state.indexOf(removeId)
      // state.splice(userIndexNum, 1)
    },
    clearCart: (state) => {
      localStorage.setItem("productCart", JSON.stringify([]));
      while (state.length > 0) {
        state.pop();
      } // Fastest
    },
    incrementToggle: (state, action: PayloadAction<string>) => {
      let updateProduct = state?.map((curElem: any) => {
        if (curElem.productId == action.payload) {
          if (curElem.quantity < curElem.stock) {
            let incrementAmount = curElem.quantity + 1;
            curElem.quantity = incrementAmount;
          }
        }
        return curElem;
      });
      state = updateProduct;
      localStorage.setItem("productCart", JSON.stringify(state));
    },
    decrementToggle: (state, action: PayloadAction<string>) => {
      let updateProduct = state?.map((curElem: any) => {
        if (curElem.productId == action.payload) {
          if (curElem.quantity > 1) {
            let decrementAmount = curElem.quantity - 1;
            curElem.quantity = decrementAmount;
          }
        }
        return curElem;
      });
      state = updateProduct;
      localStorage.setItem("productCart", JSON.stringify(state));
    },
  },
});

export const {
  addProductCart,
  clearCart,
  removeCart,
  incrementToggle,
  decrementToggle,
} = cartItemsReducer.actions;
