import { FiDelete, FiEdit } from "react-icons/fi";
import AdminSidebar from "../../components/AdminSidebar";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useAllProductsQuery,
  useDeleteProductMutation,
} from "../../../../redux/api/productAPI";
import { ReactElement, useEffect, useState } from "react";
import { CustomError } from "../../../../types/api_types";
import { server, RootState } from "../../../../redux/store";
import toast from "react-hot-toast";
import { Skaletan } from "../../../Loading/Loading";
import { responseToast } from "../../../../utils/features";

const AdminProducts = () => {
  const navigate = useNavigate();

  interface DataType {
    photo: ReactElement;
    name: string;
    price: number;
    stock: number;
    url: string;
  }

  const { user } = useSelector((state: RootState) => state.userReducer);

  const [deleteProduct] = useDeleteProductMutation();

  const { isLoading, isError, error, data } = useAllProductsQuery(user?._id!);

  const [rows, setRows] = useState<DataType[]>([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  const deleteHandler = async (e: string) => {
    const res = await deleteProduct({
      userId: user?._id!,
      productId: e,
    });

    responseToast(res, navigate, "/admin/product");
  };

  useEffect(() => {
    if (data)
      setRows(
        data.products.map((i) => ({
          photo: <img src={`${server}/${i.photo}`} />,
          name: i.name,
          price: i.price,
          stock: i.stock,
          url: i._id,
        }))
      );
  }, [data]);
  return (
    <div>
      <AdminSidebar>
        <div className="w-full h-[100vh] transition-all overflow-y-scroll">
          <main className="lg:px-28 md:px-18 sm:px-12 px-2 flex flex-col justify-center items-center w-full">
            {!isLoading ? (
              <>
                <div className="w-full flex mt-10 justify-between items-center">
                  <h1 className="text-2xl font-medium w-full">Products</h1>
                  <div className="flex items-center justify-center text-sm cursor-pointer hover:bg-slate-100 h-8 p-1 rounded-full">
                    <NavLink to={"/admin/product/new"} className={"flex"}>
                      <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 w-44 px-2 border border-gray-400 rounded shadow flex items-center justify-center gap-1">
                        <IoMdAddCircleOutline className="text-xs" />
                        <p className="text-xs">Create Product</p>
                      </button>
                    </NavLink>
                  </div>
                </div>
                <div className="my-8 flex flex-col w-full h-[70vh] overflow-y-auto no-scrollbar">
                  <div className="overflow-x-auto w-full">
                    <div className="inline-block min-w-full py-2 w-full">
                      <div className="overflow-hidden w-full">
                        <table className="min-w-full text-left text-sm font-light w-full">
                          <thead className="border-b font-medium dark:border-neutral-500 w-full">
                            <tr>
                              <th scope="col" className="px-6 py-4">
                                Photo
                              </th>
                              <th scope="col" className="px-6 py-4">
                                Product Name
                              </th>
                              <th scope="col" className="px-6 py-4">
                                Stock
                              </th>
                              <th scope="col" className="px-6 py-4">
                                Amount
                              </th>
                              <th scope="col" className="px-6 py-4">
                                Options
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {rows?.map((product: any, index) => {
                              return (
                                <tr
                                  className="border-b dark:border-neutral-500 hover:bg-gray-100"
                                  key={index}
                                >
                                  <td className="whitespace-nowrap px-4 py-2 font-normal">
                                    <img
                                      src={product.photo.props.src}
                                      alt="img"
                                      className="h-10"
                                    />
                                  </td>
                                  <td
                                    className={`whitespace-nowrap font-medium px-6 py-4`}
                                  >
                                    {product.name}
                                  </td>
                                  <td
                                    className={`whitespace-nowrap font-medium px-6 py-4`}
                                  >
                                    {product.stock}
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                                    ₹{product.price}
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4 flex gap-8 items-center font-medium">
                                    <Link to={`/admin/product/${product.url}`}>
                                      <FiEdit
                                        className="cursor-pointer"
                                        size={18}
                                      />
                                    </Link>
                                    <FiDelete
                                      className="cursor-pointer"
                                      size={18}
                                      onClick={() => deleteHandler(product.url)}
                                    />
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <Skaletan />
            )}
          </main>
        </div>
      </AdminSidebar>
    </div>
  );
};

export default AdminProducts;
