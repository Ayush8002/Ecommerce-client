import Wrapper from "../../Wrapper";
import { Navigate, useParams } from "react-router-dom";
import { useProductDetailsQuery } from "../../redux/api/productAPI";
import { server } from "../../redux/store";
import { useState } from "react";
import Counter from "./Counter";
import { Skaletan } from "../Loading/Loading";
import { addProductCart } from "../../redux/reducer/cartItemReducer";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { CartItem } from "../../types/types";

const SingleProduct = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useProductDetailsQuery(params.id!);
  const [quantity, setQuantity] = useState<number | undefined>(1);

  if (isError) return <Navigate to={"/404"} />;

  const setDecrement = () => {
    quantity! > 1 ? setQuantity(quantity! - 1) : setQuantity(1);
  };

  const setIncrement = () => {
    quantity! < data?.product?.stock!
      ? setQuantity(quantity! + 1)
      : setQuantity(data?.product?.stock!);
  };

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem?.stock! < 1) return toast.error("Out of Stock");
    dispatch(addProductCart(cartItem));
    toast.success("Added to cart");
  };

  // const { _id, price, name, photo, stock } = data?.product!;

  const productId = data?.product?._id;
  const price = data?.product?.price;
  const name = data?.product?.name;
  const photo = data?.product?.photo;
  const stock = data?.product?.stock;

  return (
    <div className="w-full md:py-20">
      <Wrapper>
        {isLoading ? (
          <Skaletan />
        ) : (
          <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
            {/* left column start */}
            <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0 items-center justify-center">
              <img src={`${server}/${data?.product.photo}`} />
            </div>
            {/* =============================================================== */}
            <div className="flex-[1]">
              <div className="flex flex-col justify-between gap-2">
                <div className="text-[34px] font-semibold text-xl">
                  {data?.product.name}
                </div>
                <div className="text-md font-semibold">
                  {data?.product.category}
                </div>
                <div className="flex items-center mt-1 mb-2">
                  <p className="font-medium ">
                    Status:
                    {data?.product?.stock! > 0 ? (
                      <span className="px-3 text-lg text-green-800 font-bold">
                        InStoke
                      </span>
                    ) : (
                      <span className="px-3 text-lg text-green-800 font-bold">
                        out of stock{" "}
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-lg font-semibold">
                    MRP : &#8377; {"singleProduct?.price"}
                  </p>
                </div>
                <div className="text-md font-medium text-black/[0.5]">
                  incl. of taxes
                </div>
                <div className="text-md font-medium text-black/[0.5] mb-0">
                  {`(Also includes all applicable duties)`}
                </div>
                <div>
                  <label
                    htmlFor="custom-input-number"
                    className="w-full text-gray-700 text-sm font-semibold"
                  >
                    Counter Input
                  </label>
                  <Counter
                    amount={quantity}
                    setDecrement={setDecrement}
                    setIncrement={setIncrement}
                    stock={data?.product?.stock!}
                  />
                </div>
                {/* ADD TO CART BUTTON START */}
                <button
                  className="w-full py-3.5 rounded-lg bg-black text-white text-base font-medium transition-transform active:scale-95 hover:opacity-75"
                  onClick={() =>
                    addToCartHandler({
                      productId,
                      price,
                      name,
                      photo,
                      stock,
                      quantity,
                    })
                  }
                >
                  {" "}
                  Add to Cart
                </button>

                <div className="my-4">
                  <div className="text-lg font-bold mb-3">Product Details</div>
                  <div className="text-md mb-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nostrum esse quod similique, deserunt dolores magni iste
                    maxime consectetur totam officia aspernatur asperiores
                    corporis, tempore doloribus. Voluptate itaque impedit
                    consectetur. Libero cum voluptas quibusdam! Mollitia.
                  </div>
                </div>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  submit-Review
                </button>
              </div>
            </div>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default SingleProduct;
