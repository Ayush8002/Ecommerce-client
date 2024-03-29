import { ChangeEvent, FormEvent, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useNavigate } from "react-router-dom";
import { useNewProductMutation } from "../../../../redux/api/productAPI";
import { responseToast } from "../../../../utils/features";
import { RxCross2 } from "react-icons/rx";

const NewProduct = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(1);
  const [photoPrev, setPhotoPrev] = useState<string>("");
  const [photo, setPhoto] = useState<File | string>();

  const [newProduct] = useNewProductMutation();
  const navigate = useNavigate();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoPrev(reader.result);
          setPhoto(file);
        }
      };
    }
  };

  const removerImageHandler = () => {
    setPhotoPrev("");
    setPhoto("");
  };

  const setStockHandler = (e: string) => {
    if (e === "increment") {
      setStock(stock + 1);
    } else if (e === "decrement") {
      if (stock > 1) {
        setStock(stock - 1);
      }
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !price || stock < 0 || !category || !photo) return;

    const formData = new FormData();

    formData.set("name", name);
    formData.set("price", price.toString());
    formData.set("stock", stock.toString());
    formData.set("photo", photo);
    formData.set("category", category);

    const res = await newProduct({ id: user?._id!, formData });

    responseToast(res, navigate, "/admin/product");
  };

  return (
    <div>
      <AdminSidebar>
        <main className="flex justify-center items-center w-full my-10">
          <article className="shadow-md p-6">
            <form className="flex flex-col gap-4" onSubmit={submitHandler}>
              <h2 className="text-xl mb-2">New Product</h2>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  required
                  placeholder="ProductName"
                  className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Name
                </label>
              </div>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  required
                  placeholder="Product Category"
                  className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Category
                </label>
              </div>
              <div
                className="py-2 px-3 bg-white border border-gray-200 rounded-lg"
                data-hs-input-number
              >
                <div className="w-full flex justify-between items-center gap-x-5">
                  <div className="grow">
                    <span className="block text-xs text-gray-500">price</span>
                    <input
                      className="w-full p-0 bg-transparent border-0 text-gray-800 focus:outline-none"
                      required
                      type="number"
                      placeholder="Price"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      data-hs-input-number-input
                    />
                  </div>
                </div>
              </div>
              <div
                className="py-2 px-3 bg-white border border-gray-200 rounded-lg"
                data-hs-input-number
              >
                <div className="w-full flex justify-between items-center gap-x-5">
                  <div className="grow">
                    <span className="block text-xs text-gray-500">
                      Select quantity
                    </span>
                    <input
                      className="w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0 focus:outline-none"
                      type="number"
                      required
                      placeholder="Stock"
                      value={stock}
                      onChange={(e) => setStock(Number(e.target.value))}
                      data-hs-input-number-input
                    />
                  </div>
                  <div className="flex justify-end items-center gap-x-1.5">
                    <button
                      type="button"
                      className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
                      data-hs-input-number-decrement
                      onClick={() => setStockHandler("decrement")}
                    >
                      <svg
                        className="flex-shrink-0 size-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                      data-hs-input-number-increment
                      onClick={() => setStockHandler("increment")}
                    >
                      <svg
                        className="flex-shrink-0 size-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-6 h-6 mb-3 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-xs text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={changeImageHandler}
                    />
                  </label>
                </div>
              </div>

              {photo && (
                <div className="">
                  <div className="relative max-w-28 cursor-pointer [&>img]:hover:opacity-70 ">
                    <img
                      src={photoPrev}
                      alt="New Image"
                      className="h-full w-full"
                    ></img>
                    <div className="z-50 absolute top-0 right-0 text-black bg-gray-200 hover:bg-gray-300 rounded-full p-1">
                      <RxCross2
                        className="text-xs"
                        onClick={removerImageHandler}
                      />
                    </div>
                  </div>
                </div>
              )}
              {/* 
              <div className="absolute z-50 top-0 left-0 w-full">
              </div> */}

              <button
                type="submit"
                className="w-full bg-black h-10 text-white rounded-md text-sm hover:bg-[#610094] transition-all"
              >
                Create
              </button>
            </form>
          </article>
        </main>
      </AdminSidebar>
    </div>
  );
};

export default NewProduct;
