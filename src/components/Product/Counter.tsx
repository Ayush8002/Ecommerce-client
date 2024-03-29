import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

type counterProps = {
  amount?: number;
  setDecrement: any;
  setIncrement: any;
  stock: number;
  data?: any;
};

const Counter = ({
  amount,
  setDecrement,
  setIncrement,
  stock,
  data,
}: counterProps) => {

  return (
    <div>
      <div className="custom-number-input my-3 h-10 w-32 font-semibold text-2xl">
        <div className="flex items-center border-gray-100 h-full">
          <span
            className={`rounded-l bg-gray-100 px-3.5 duration-10 hover:text-blue-50 h-full ${
              amount! > 1 ? "hover:bg-purple-700 cursor-pointer " : "text-white"
            }`}
            onClick={() => setDecrement(data?.productId!)}
          >
            <AiOutlineMinus className="text-sm h-full" />
          </span>
          <input
            className="h-10 w-12 border bg-white text-center text-sm outline-none"
            type="number"
            value={amount}
            min="1"
          />
          <span
            className={`rounded-r bg-gray-100 px-3.5 duration-100 hover:text-blue-50 h-full ${
              amount! >= stock
                ? "text-white"
                : "text-black hover:bg-purple-700 cursor-pointer"
            }`}
            onClick={() => setIncrement(data?.productId!)}
          >
            <AiOutlinePlus className="text-sm h-full" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Counter;
