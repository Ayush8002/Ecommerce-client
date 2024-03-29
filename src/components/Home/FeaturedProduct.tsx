// import React from 'react'
import toast from "react-hot-toast";
import Wrapper from "../../Wrapper";
import { useLatestProductsQuery } from "../../redux/api/productAPI";
import { CartItem } from "../../types/types";
import { Skaletan } from "../Loading/Loading";
import ProductCard from "../Product/ProductCard";
import { useDispatch } from "react-redux";
import { addProductCart } from "../../redux/reducer/cartItemReducer";

const FeaturedProduct = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useLatestProductsQuery("");

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem?.stock! < 1) return toast.error("Out of Stock");
    dispatch(addProductCart(cartItem))
    toast.success("Added to cart");
  };

  if (isError) toast.error("Cannot Fetch the Products");

  return (
    <Wrapper>
      <div className="mt-12">
        <h1 className="text-2xl font-medium">Latest Products</h1>
        <p className="max-w-2xl text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mt-2 w-full">
          {isLoading ? (
            <Skaletan />
          ) : (
            data?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
                photo={i.photo}
              />
            ))
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default FeaturedProduct;
