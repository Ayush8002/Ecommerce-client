import { useDispatch, useSelector } from "react-redux";
import { RootState, server } from "../../redux/store";
import Wrapper from "../../Wrapper";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { saveShippingInfo } from "../../redux/reducer/cartReducer";
import axios from "axios";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";

const shipping = () => {
  const { total, shippingInfo: shippingInformation } = useSelector(
    (state: RootState) => state.cartItems
  );

  const cartItems = useSelector((state: RootState) => state?.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shippingInfo, setShippingInfo] = useState({
    address: shippingInformation.address,
    city: shippingInformation.city,
    state: shippingInformation.state,
    country: shippingInformation.country,
    pinCode: shippingInformation.pinCode,
  });

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(saveShippingInfo(shippingInfo));
    try {
      const { data } = await axios.post(
        `${server}/api/v1/payment/create`,
        {
          amount: total,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/pay", {
        state: data.clientSecret,
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (cartItems.length <= 0) return navigate("/cart");
  }, [cartItems]);
  return (
    <div>
      <Wrapper>
        <div
          className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center text-[#610094] items-center hover:bg-purple-100/80 cursor-pointer mt-3"
          onClick={() => navigate("/cart")}
        >
          <BiArrowBack className="text-[12px] md:text-[16px]" />
        </div>
        <div className="sm:h-[70vh] h-full w-full flex justify-center items-center my-10">
          <main className="flex w-full flex-col justify-center items-center gap-4">
            <div className="w-full sm:w-96 sm:px-12 sm:py-12 px-4 py-8 shadow-md border-md rounded-md border-[1px]">
              <h2 className="text-xl w-full mb-6">Shipping Info</h2>
              <form
                onSubmit={submitHandler}
                className="h-full w-full flex flex-col items-center justify-center gap-4"
              >
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                    required
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={shippingInfo.address}
                    onChange={changeHandler}
                  />
                  <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Address
                  </label>
                </div>

                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                    required
                    type="text"
                    placeholder="City"
                    name="city"
                    value={shippingInfo.city}
                    onChange={changeHandler}
                  />
                  <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    City
                  </label>
                </div>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                    required
                    type="text"
                    placeholder="State"
                    name="state"
                    value={shippingInfo.state}
                    onChange={changeHandler}
                  />
                  <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    State
                  </label>
                </div>
                <div className="relative h-10 w-full mt-2">
                  <select
                    name="country"
                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900  focus:outline-none focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    required
                    value={shippingInfo.country}
                    onChange={changeHandler}
                  >
                    <option value="">Choose Country</option>
                    <option value="india">India</option>
                    <option value="canada">canada</option>
                    <option value="america">america</option>
                    <option value="londan">londan</option>
                  </select>
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Select a Country
                  </label>
                </div>
                <div className="relative h-10 w-full min-w-[200px]">
                  <input
                    required
                    type="number"
                    placeholder="PinCode"
                    name="pinCode"
                    value={shippingInfo.pinCode}
                    onChange={changeHandler}
                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    pinCode
                  </label>
                </div>
                <button
                  className="bg-black rounded-md text-white w-full p-3 hover:bg-purple-700"
                  type="submit"
                >
                  Pay Now
                </button>
              </form>
            </div>
          </main>
        </div>
      </Wrapper>
    </div>
  );
};

export default shipping;
