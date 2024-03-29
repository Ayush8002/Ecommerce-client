import { useEffect } from "react";
import { useState } from "react";
import Wrapper from "../../Wrapper";
import FilterSection from "./FilterSection";
import { BiFilterAlt } from "react-icons/bi";
import ProductCard from "./ProductCard";
import { useSearchProductsQuery } from "../../redux/api/productAPI";
import toast from "react-hot-toast";
import { CustomError } from "../../types/api_types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setSearch} from "../../redux/reducer/productFilterReducer";
import { Skeleton } from "@mui/material";
import { IoSearch } from "react-icons/io5";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";
import { CartItem } from "../../types/types";
import { addProductCart } from "../../redux/reducer/cartItemReducer";

const Products = () => {
  const dispatch = useDispatch();
  const [filterMenu, setFilterMenu] = useState<boolean>(false);

  const { search, sort, category, page, price } = useSelector(
    (state: RootState) => state.productFilterReducer
  );

  const {
    isLoading: productLoading,
    data: searchedData,
    isError: productIsError,
    error: productError,
  } = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
    price,
  });

  // const isPrevPage = page > 1;
  // const isNextPage = page < 4;

  const serchHandler = (e: any) => {
    dispatch(setSearch(e.target.value));
  };

  if (productIsError) {
    const err = productError as CustomError;
    toast.error(err.data.message);
  }

  const controlNavbar = () => {
    if (window.scrollY > 400) {
      setFilterMenu(false);
    }
  };

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem?.stock! < 1) return toast.error("Out of Stock");
    dispatch(addProductCart(cartItem))
    toast.success("Added to cart");
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  return (
    <div className="relative min-h-[90vh] z-10">
      <FilterSection filterMenu={filterMenu} setFilterMenu={setFilterMenu} />
      <Wrapper>
        {/* product countity section start  */}
        <div className="flex justify-between items-center my-4">
          {/* product countity start */}
          <span className="flex gap-2 items-center justify-center">
            <TfiAngleLeft />
            <span className="text-xl font-bold text-[#610094]">
              {searchedData?.products.length}
            </span>
            <TfiAngleRight />
            <span className="text-sm font-semibold">Total Products</span>
          </span>
          {/* product countity end */}

          <div
            className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center text-[#610094] items-center hover:bg-purple-100/80 cursor-pointer relative"
            onClick={() => setFilterMenu(!filterMenu)}
          >
            <BiFilterAlt className="text-[12px] md:text-[16px]" />
          </div>
        </div>
        <div className="flex md:hidden justify-center items-center w-full my-6">
          <div className="w-full h-10 flex justify-center items-center">
            <input
              type="text"
              className="border-l-2 border-t-2 border-b-2 outline-none w-full rounded-l-md h-full px-4 text-xs focus:border-gray-400"
              placeholder="search products..."
              onChange={serchHandler}
            />
            <button className="sm:w-28 w-14 bg-[#610094] h-full flex justify-center items-center text-white rounded-r-md">
              <IoSearch />
            </button>
          </div>
        </div>
        {productLoading ? (
          <Skeleton />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mt-2 w-full">
            {searchedData?.products.map((i: any) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                photo={i.photo}
                handler={addToCartHandler}
              />
            ))}
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Products;

{
  /* <BsGrid className="text-2xl h-8 w-8 bg-slate-200 p-2" />
<BsListColumnsReverse className="text-2xl h-8 w-8 bg-slate-200 p-2" /> */
}
