import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Wrapper from "../../Wrapper";
import { FormEvent, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { responseToast } from "../../utils/features";
import { useNewOrderMutation } from "../../redux/api/orderAPI";
import { resetCart } from "../../redux/reducer/cartReducer";
import { NewOrderRequest } from "../../types/api_types";
import { RootState } from "../../redux/store";
import { clearCart } from "../../redux/reducer/cartItemReducer";

const stripePromise = loadStripe(
  "pk_test_51OrDUbSGTa88Ffrs1xXoIgd5DO8VKdYHEwd6eMz0I5ZrIj9jGjAqMNsNCmOQR6y1sZKv0cHf3qiUChfEQRKmYypl00lf3cT9pi"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.userReducer);

  const { shippingInfo, subtotal, tax, discount, shippingCharges, total } =
    useSelector((state: RootState) => state.cartItems);

  const cartItems = useSelector((state: RootState) => state.cart);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [newOrder] = useNewOrderMutation();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setIsProcessing(true);

    const orderData: NewOrderRequest = {
      shippingInfo,
      orderItems: cartItems,
      subtotal,
      tax,
      discount,
      shippingCharges,
      total,
      user: user?._id!,
    };

    const {} = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });

    const res = await newOrder(orderData);
    dispatch(resetCart());
    dispatch(clearCart());
    responseToast(res, navigate, "/orders");

    // if (error) {
    //   console.log(error)
    //   setIsProcessing(false);
    //   return toast.error(error.message || "Something Went Wrong");
    // }

    // if (paymentIntent.status === "succeeded") {
    //   const res = await newOrder(orderData);
    //   dispatch(resetCart());
    //   responseToast(res, navigate, "/orders");
    // }
    setIsProcessing(false);
  };
  return (
    <div className="">
      <Wrapper>
        <div className="flex flex-col justify-start sm:justify-center items-center h-full sm:h-[70vh]">
          <h3 className="w-full text-start text-xl font-medium my-6">Stripe</h3>
          <form onSubmit={submitHandler} className="w-full px-2">
            <PaymentElement />
            <button
              type="submit"
              disabled={isProcessing}
              className="bg-black text-white w-full sm:w-48 p-3 my-5 rounded-md hover:bg-purple-900"
            >
              {isProcessing ? "Processing..." : "Pay"}
            </button>
          </form>
        </div>
      </Wrapper>
    </div>
  );
};

const CheckOut = () => {
  const location = useLocation();

  const clientSecret: string | undefined = location.state;

  if (!clientSecret) return <Navigate to={"/shipping"} />;

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
      }}
    >
      <CheckoutForm />
    </Elements>
  );
};

export default CheckOut;
