import { MdOutlineCurrencyRupee } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Counter from "../Product/Counter";
import { useDispatch } from "react-redux";
import { server } from "../../redux/store";
import {
  decrementToggle,
  incrementToggle,
  removeCart,
} from "../../redux/reducer/cartItemReducer";
import { CartItem } from "../../types/types";

type CartItemProps = {
  data: CartItem;
  index?: number;
};

const CartItem = ({ data, index }: CartItemProps) => {
  const dispatch = useDispatch();

  const RemoveCart = (index:any) => {
    dispatch(removeCart(index));
  };

  const setIncrement = (id: any) => {
    dispatch(incrementToggle(id));
  };

  const setDecrement = (id: any) => {
    dispatch(decrementToggle(id));
  };

  return (
    <div className="flex py-5 gap-1 md:gap-2 border-b">
      {/* IMAGE START */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <img src={`${server}/${data.photo}`} alt={"image"} />
      </div>
      {/* IMAGE END */}

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          {/* PRODUCT TITLE */}
          <div className="text-sm md:text-base font-semibold text-black/[1] mt-2">
            {data?.name}
          </div>

          {/* PRODUCT SUBTITLE */}
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden"></div>

          {/* PRODUCT PRICE */}
          <div className="text-sm md:text-md font-semibold text-black/[1] mt-2 flex items-center justify-center">
            MRP :
            <MdOutlineCurrencyRupee />
            <p> {data?.price}</p>
          </div>
          {/* PRODUCT PRICE */}
          <div className="text-sm md:text-base font-semibold text-black/[1] mt-2 flex justify-center items-center">
            Sub Total :
            <MdOutlineCurrencyRupee />
            <p> {data?.price! * data?.quantity!}</p>
          </div>
        </div>

        {/* PRODUCT SUBTITLE */}
        <div className="text-md font-medium text-black/[0.5] hidden md:block"></div>
        <div className="flex items-center justify-between mt-4 h-12">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            <div className="flex items-center gap-1">
              <div className="font-semibold">Quantity:</div>
            </div>
            <Counter
              amount={data?.quantity}
              setDecrement={setDecrement}
              setIncrement={setIncrement}
              data={data}
              stock={data?.stock!}
            />
          </div>
          <RiDeleteBin6Line
            className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
            onClick={() => RemoveCart(index)}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
