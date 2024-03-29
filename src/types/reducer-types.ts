import { User, ShippingInfo } from "./types";

export interface UserReducerInitialState {
  user: User | null;
  loading: boolean;
}

export interface ProductReducerInitialState {
  search: string;
  sort: string;
  category: string;
  ratings: number;
  price: number;
  maxPrice: number;
  page: number;
}

export interface CartReducerInitialState {
  loading: boolean;
  subtotal: number;
  totalCart: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  shippingInfo: ShippingInfo;
}
