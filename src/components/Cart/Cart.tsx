import { useEffect, useState } from "react";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Wrapper from "../../Wrapper";
import emptyImage from "../../assets/images/empty cart.png";
import { clearCart } from "../../redux/reducer/cartItemReducer";
import {
  calculatePrice,
  discountApplied,
} from "../../redux/reducer/cartReducer";
import { RootState, server } from "../../redux/store";
import CartItem from "./CartItem";
import axios from "axios";
import { VscError } from "react-icons/vsc";

const Cart = () => {
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  const { subtotal, tax, total, shippingCharges, discount } = useSelector(
    (state: RootState) => state.cartItems
  );

  const cartItems = useSelector((state: RootState) => state.cart);

  const ClearCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    dispatch(calculatePrice(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();

    const timeOutID = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
          cancelToken,
        })
        .then((res: any) => {
          dispatch(discountApplied(res.data.discount));
          setIsValidCouponCode(true);
          dispatch(calculatePrice(cartItems));
        })
        .catch(() => {
          dispatch(discountApplied(0));
          setIsValidCouponCode(false);
          dispatch(calculatePrice(cartItems));
        });
    }, 1000);

    return () => {
      clearTimeout(timeOutID);
      cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  return (
    <div className="w-full min-h-full flex justify-center items-center">
      <Wrapper>
        {cartItems.length > 0 ? (
          <main className="mt-12">
            <h1 className="text-2xl font-medium">Cart Products</h1>
            <p className="max-w-2xl text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <div className="flex flex-col lg:flex-row gap-12 py-10">
              {/* CART ITEMS START */}
              <div className="flex-[2]">
                <div className="text-xl font-medium">Cart Items</div>
                {cartItems &&
                  cartItems?.map((item: any, index: number) => {
                    return (
                      <CartItem
                        key={item.productId}
                        data={item}
                        index={index}
                      />
                    );
                  })}
                <div className="flex items-center justify-between">
                  <NavLink to="/products">
                    <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow my-4">
                      Continue shopping
                    </button>
                  </NavLink>
                  <button
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow my-4"
                    onClick={() => ClearCart()}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
              {/* CART ITEMS END */}

              {/* SUMMARY START */}
              <div className="flex-[1]">
                <div className="text-lg font-bold">Summary</div>
                <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <div className="text-sm md:text-md font-medium text-black">
                        Subtotal
                      </div>
                      <div className="text-sm md:text-md font-medium text-black flex justify-center items-center">
                        <MdOutlineCurrencyRupee />
                        <p>{subtotal}</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-sm md:text-md font-medium text-black">
                        ShippingCharges
                      </div>
                      <div className="text-sm md:text-md font-medium text-black flex justify-center items-center">
                        {shippingCharges <= 0 ? (
                          <p className="text-green-700">Free Dilevery</p>
                        ) : (
                          <div className="flex justify-center items-center">
                            <MdOutlineCurrencyRupee />
                            <p>{shippingCharges}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-sm md:text-md font-medium text-black">
                        Tax
                      </div>
                      <div className="text-sm md:text-md font-medium text-black flex justify-center items-center">
                        <MdOutlineCurrencyRupee />
                        <p>{tax}</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-sm md:text-md font-medium text-black">
                        Discount
                      </div>
                      <div className="text-sm md:text-md font-medium text-black flex justify-center items-center">
                        -<MdOutlineCurrencyRupee />
                        <p>{discount}</p>
                      </div>
                    </div>
                    <div className="relative h-12 w-full min-w-[200px] mt-3">
                      <input
                        placeholder="Code"
                        className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-700 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Coupon Code
                      </label>
                      {couponCode &&
                        (isValidCouponCode ? (
                          <span className="text-green-600 text-xs flex justify-start items-center my-2 gap-1">
                            ₹{discount} off using the <code>{couponCode}</code>
                          </span>
                        ) : (
                          <span className="text-red-600 text-xs flex justify-start gap-1 items-center my-2">
                            Invalid Coupon <VscError />
                          </span>
                        ))}
                    </div>
                    <div className="flex justify-between mt-8">
                      <div className="text-md md:text-xl font-medium text-black">
                        Total
                      </div>
                      <div className="text-md md:text-xl font-medium text-black flex items-center justify-center">
                        <MdOutlineCurrencyRupee />
                        <p>{total}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm md:text-md py-5 border-t mt-5">
                    The subtotal reflects the total price of your order,
                    including duties and taxes, before any applicable discounts.
                    It does not include delivery costs and international
                    transaction fees.
                  </div>
                </div>
                {cartItems.length > 0 && (
                  <NavLink to="/shipping">
                    <button className="w-full py-4 rounded-md bg-black text-white text-base font-normal transition-transform active:scale-95 mb-3 hover:bg-purple-800 flex items-center gap-2 justify-center uppercase">
                      Checkout
                    </button>
                  </NavLink>
                )}
              </div>
              {/* SUMMARY END */}
            </div>
            {/* CART CONTENT END */}
          </main>
        ) : (
          <div className="flex-[2] flex flex-col items-center justify-center pb-[50px] w-full h-[80vh]">
            <img src={emptyImage} alt="empty" className="h-36" />
            <span className="text-xl font-semibold">Your cart is empty</span>
            <span className="text-center mt-4 text-xs">
              Looks like you have not added anything in your cart.
              <br />
              Go ahead and explore top categories.
            </span>

            <NavLink
              to="/"
              className="py-4 px-6 rounded-md bg-black text-white text-sm font-medium transition-transform active:scale-95 mb-3 hover:bg-purple-700 mt-8"
            >
              Continue Shopping
            </NavLink>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Cart;
