import { createSlice } from "@reduxjs/toolkit";
import { ProductReducerInitialState } from "../../types/reducer-types";

const initialState: ProductReducerInitialState = {
  search: "",
  sort: "All",
  category: "",
  ratings: 0,
  price: 0,
  maxPrice: 0,
  page: 0,
};

export const productFilterReducer = createSlice({
  name: "productFilterReducer",
  initialState,
  reducers: {
    setSearch: (state, action: any) => {
      state.search = action.payload;
    },
    setSort: (state, action: any) => {
      state.sort = action.payload;
    },
    setCategory: (state, action: any) => {
      state.category = action.payload;
    },
    setRatings: (state, action: any) => {
      state.ratings = action.payload;
    },
    setPrice: (state, action: any) => {
      state.price = action.payload;
    },
    setMaxPrice: (state, action: any) => {
      state.maxPrice = action.payload;
    },
    setClearFilter: (state) => {
      state.search = "";
      state.sort = "All";
      state.category = "";
      state.price = 0;
    },
  },
});

export const {
  setSearch,
  setSort,
  setCategory,
  setRatings,
  setPrice,
  setMaxPrice,
  setClearFilter
} = productFilterReducer.actions;
