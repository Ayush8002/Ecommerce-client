import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../Wrapper";
import MenuMobile from "../components/Header/MenuMobile";
import Logo from "../assets/images/GlobalBazzar-logo-puple.psd.png";
// icons
import { FiFacebook } from "react-icons/fi";
import { RiTwitterXFill } from "react-icons/ri";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import MenuDesktop from "../components/Header/MenuDesktop";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useSearchProductsQuery } from "../redux/api/productAPI";
import { setSearch } from "../redux/reducer/productFilterReducer";
import { totalCartItems } from "../redux/reducer/cartReducer";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const cart = useSelector((state: RootState) => state.cart);

  const { search, sort, category, page, maxPrice } = useSelector(
    (state: RootState) => state.productFilterReducer
  );

  const { totalCart } = useSelector((state: RootState) => state.cartItems);

  const {} = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
    price: maxPrice,
  });

  const serchHandler = (e: any) => {
    dispatch(setSearch(e.target.value));
  };

  useEffect(() => {
    dispatch(totalCartItems(cart));
  }, [cart, totalCart]);

  return (
    <div className="relative z-50 bg-white">
      <div className="border-b-[2px]">
        <Wrapper>
          {/* Top Header Section  */}
          <div className="py-2 flex items-center justify-between w-full text-xs font-semibold ">
            <p>Welcome to the shop</p>
            <div className="flex gap-3">
              <div className="hidden md:flex gap-6">
                <p className="text-xs font-medium">Impact@GlobalBazzar</p>
                <p className="text-xs font-medium">Gifts Cards</p>
                <p className="text-xs font-medium">Help Center</p>
                <p className="text-xs font-medium">Sell on GlobalBazzar</p>
              </div>
              <div className="flex gap-3 ">
                <FiFacebook />
                <RiTwitterXFill />
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
      <div className="border-b-[2px]">
        <Wrapper>
          <div className="flex items-center justify-between py-6">
            {/* logo  */}
            <Link to={"/"} className="w-48 sm:w-54 md:w-64 lg:w-64 xl:w-72">
              <img src={Logo} alt="logo" className="w-full" />
            </Link>
            <div className="hidden md:flex justify-center items-center w-full mx-6 sm:mx-8 md:mx-12 lg:mx-28">
              <div className="w-full h-10">
                <Link
                  to={"/products"}
                  className="w-full flex justify-center items-center h-full"
                >
                  <input
                    type="text"
                    className="border-l-2 border-t-2 border-b-2 outline-none w-full rounded-l-md h-full px-6 text-md focus:border-gray-400"
                    onChange={serchHandler}
                  />
                  <button className="w-28 bg-[#610094] h-full flex justify-center items-center text-white rounded-r-md">
                    <IoSearch />
                  </button>
                </Link>
              </div>
            </div>
            {/* navbar section */}
            <div>
              {mobileMenu && <MenuMobile setMobileMenu={setMobileMenu} />}
            </div>
            {/* icons section  */}
            <div className="flex gap-0.5">
              {/* Third Icon start */}
              <Link to="/cart" id="RouterNavLink">
                <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
                  <HiOutlineShoppingCart className="text-[14px] font-bold md:text-[16px]" />
                  {1 > 0 && (
                    <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-[#610094] absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                      {totalCart}
                    </div>
                  )}
                </div>
              </Link>
              {/* Third Icon end */}
              {/* secound Icon start */}
              <Link to="/profile">
                <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
                  <FaRegUser className="text-[12px] md:text-[14px]" />
                </div>
              </Link>
              {/* secound Icon end */}
              {/* Mobile icon start */}
              <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
                {mobileMenu ? (
                  <VscChromeClose
                    className="text-[16px]"
                    onClick={() => setMobileMenu(false)}
                  />
                ) : (
                  <BiMenuAltRight
                    className="text-[20px]"
                    onClick={() => setMobileMenu(true)}
                  />
                )}
              </div>
              {/* Mobile icon end */}
            </div>
          </div>
        </Wrapper>
      </div>
      <MenuDesktop />
    </div>
  );
};

export default Header;
