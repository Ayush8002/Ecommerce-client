import Rating from "@mui/material/Rating";
import { CartItem } from "../../types/types";
import { server } from "../../redux/store";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { FaStar } from "react-icons/fa";

type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
};

const ProductCard = ({
  productId,
  photo,
  name,
  price,
  stock,
  handler,
}: ProductsProps) => {
  type optionsProps = {
    value: number;
    readOnly: boolean;
    precision: number;
  };

  const options: optionsProps = {
    value: 4,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="max-h-96 min-w-full max-w-52 border-gray-300 my-2 place-self-center rounded-md shadow-lg main group">
      <div className="sm:h-60 h-52 w-full relative border-b-2 border-slate-200 overflow-hidden">
        <img
          src={`${server}/${photo}`}
          alt={name}
          className="h-64 object-contain object-center"
        />

        <div className="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-400 group-hover:right-0">
          <button className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-[#610094]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-[#610094]"
            onClick={() =>
              handler({ productId, price, name, photo, stock, quantity: 1 })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </button>
        </div>
        {/* <img
          src="https://www.dellonline.co.za/cdn/shop/products/shopify-favicon_fb7ebf22-f587-49d5-ae54-088509a3344d_1800x1800.png?v=1693473324"
          alt="Italian Trulli"
          style={{ width: "100%", height: "100%" }}
        /> */}
      </div>
      <NavLink to={`/singleProduct/${productId}`}>
        <div className="flex flex-col items-center justify-between gap-3 p-4">
          <p className="text-xs font-medium w-full">
            {name.substring(0, 20)}
            {name.length > 20 && "..."}
          </p>
          <div className="flex justify-between items-center w-full">
            <span className="flex items-center justify-center font-bold text-green-800 text-sm">
              <FaIndianRupeeSign />
              <p>{price}</p>
            </span>
            <span className="sm:hidden text-sm flex items-center justify-center gap-1">
              <FaStar className="text-orange-400" />
              <p>{4}</p>
            </span>
            <span className="hidden sm:flex">
              <Rating
                {...options}
                sx={{
                  fontSize: "1.1rem",
                }}
              />
            </span>
          </div>
          {/* <button>add to cart</button> */}
        </div>
      </NavLink>
    </div>
  );
};

export default ProductCard;
