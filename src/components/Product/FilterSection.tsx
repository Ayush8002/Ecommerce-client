// import React from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../../redux/api/productAPI";
import { CustomError } from "../../types/api_types";
import { RootState } from "../../redux/store";
import toast from "react-hot-toast";
import {
  setCategory,
  setClearFilter,
  setPrice,
  setSort,
} from "../../redux/reducer/productFilterReducer";
import Wrapper from "../../Wrapper";
import { VscArrowUp } from "react-icons/vsc";
import { RiFilterOffLine } from "react-icons/ri";

interface Props {
  filterMenu: boolean;
  setFilterMenu: (e: boolean) => void;
}

const FilterSection = ({ filterMenu, setFilterMenu }: Props) => {
  const dispatch = useDispatch();

  const { search, sort,category, page, price, maxPrice } =
    useSelector((state: RootState) => state.productFilterReducer);

  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError,
    error,
  } = useCategoriesQuery("");

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  const { data } = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
    price: maxPrice,
  });

  const priceHandler = (e: any) => {
    dispatch(setPrice(e.target.value));
  };

  // const setRatingHandler = (e: any) => {
  //   dispatch(setRatings(e.target.value));
  // };

  const sortHandler = (e: any) => {
    dispatch(setSort(e.target.value));
  };

  const categoryHandler = (e: any) => {
    dispatch(setCategory(e.target.value));
  };

  const clearFilter = () => {
    dispatch(setClearFilter());
    toast.success("Filter cleared");
    setFilterMenu(!filterMenu)
  };

  return (
    <div
      className={`${
        filterMenu ? "translate-y-0" : "translate-y-[-115%]"
      } z-50 w-full absolute top-0 max-h-full flex flex-col gap-4 transition-all duration-200 shadow:sm bg-white border-b-2`}
    >
      <Wrapper>
        {/* Price section ========================================== */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-base font-semibold">Filter Section</h1>
            <div
              className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center text-[#610094] items-center hover:bg-purple-100/80 cursor-pointer relative"
              onClick={() => clearFilter()}
            >
              <RiFilterOffLine className="text-[12px] md:text-[16px]" />
            </div>
            <div
              className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center text-[#610094] items-center hover:bg-purple-100/80 cursor-pointer relative"
              onClick={() => setFilterMenu(!filterMenu)}
            >
              <VscArrowUp className="text-[12px] md:text-[16px]" />
            </div>
          </div>

          <h4 className="text-sm font-medium mt-4">Price Range</h4>
          <div className="m-2">
            <PrettoSlider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={data?.maxPrice}
            />
          </div>
          {/* Rating section ======================================== */}
          <div className="flex sm:flex-row flex-col items-center justify-between gap-6 w-full">
            <div className="w-full">
              <h4 className="text-sm font-medium w-full">Price Range</h4>
              <select
                value={category}
                onChange={categoryHandler}
                className="sm:w-72 w-full h-12 my-4 px-4 text-sm border-2 border-purple-300 rounded-md focus:outline-none"
              >
                <option value="" className="text-xs">
                  All
                </option>
                {!loadingCategories &&
                  categoriesResponse?.categories.map((i) => (
                    <option key={i} value={i} className="text-xs ">
                      {i.charAt(0).toUpperCase() + i.slice(1)}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-full">
              <h4 className="text-sm font-medium w-full">Price Range</h4>
              <select
                value={sort}
                onChange={sortHandler}
                className="sm:w-72 w-full h-12 my-4 px-4 text-sm border-2 border-purple-300 rounded-md focus:outline-none"
              >
                <option value="" className="text-xs">
                  All
                </option>

                <option value={"asc"} className="text-xs">
                  Lowest to Highest
                </option>
                <option value={"dsc"} className="text-xs">
                  Highest to Lowest
                </option>
              </select>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

const PrettoSlider = styled(Slider)({
  color: "#610094",
  height: 2,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 12,
    width: 12,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 42,
    height: 42,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#610094",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&::before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

export default FilterSection;

{
  /* <div>
<label
  id="listbox-label"
  className="block text-sm font-medium leading-6 text-gray-900"
>
  Assigned to
</label>
<div className="relative mt-2">
  <button
    type="button"
    className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
    aria-haspopup="listbox"
    aria-expanded="true"
    aria-labelledby="listbox-label"
  >
    <span className="flex items-center">
      <img
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
        className="h-5 w-5 flex-shrink-0 rounded-full"
      />
      <span className="ml-3 block truncate">Tom Cook</span>
    </span>
    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
      <svg
        className="h-5 w-5 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
          clip-rule="evenodd"
        />
      </svg>
    </span>
  </button>

  <ul
    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm "
    tabIndex={-1}
    role="listbox"
    aria-labelledby="listbox-label"
    aria-activedescendant="listbox-option-3"
  >
    <li
      className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9"
      id="listbox-option-0"
      role="option"
    >
      <div className="flex items-center">
        <img
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
          className="h-5 w-5 flex-shrink-0 rounded-full"
        />

        <span className="font-normal ml-3 block truncate">
          Wade Cooper
        </span>
      </div>

      <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
        <svg
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </li>
  </ul>
</div>
</div> */
}
