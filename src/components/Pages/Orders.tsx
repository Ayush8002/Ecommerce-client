import { CustomError } from "../../types/api_types";
import toast from "react-hot-toast";
import { useMyOrdersQuery } from "../../redux/api/orderAPI";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { Loading } from "../Loading/Loading";
import { NavLink } from "react-router-dom";
import { FiDelete, FiEdit } from "react-icons/fi";


const Orders = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, isError, error } = useMyOrdersQuery(user?._id!);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  console.log(data)
  return (
    <div>
      <main>
      <main className="lg:px-28 md:px-18 sm:px-12 px-2 flex flex-col justify-center items-center w-full">
            <h1 className="text-2xl font-medium w-full mt-10">My Orders</h1>
            {isLoading ? (
              <Loading />
            ) : (
              <div className="flex flex-col w-full">
                <div className="overflow-x-auto w-full">
                  <div className="inline-block min-w-full py-2 w-full">
                    <div className="overflow-hidden w-full">
                      <table className="min-w-full text-left text-sm font-light w-full">
                        <thead className="border-b font-medium dark:border-neutral-500 w-full">
                          <tr>
                            <th scope="col" className="px-6 py-4">
                              User
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Amount
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Discount
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Quantity
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Options
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.orders?.map((e: any) => {
                            return (
                              <tr
                                className="border-b dark:border-neutral-500 hover:bg-gray-200"
                                key={e._id}
                              >
                                <td className="whitespace-nowrap px-6 py-4 font-normal">
                                  {e.user}
                                </td>
                                <td
                                  className={`whitespace-nowrap font-medium px-6 py-4`}
                                >
                                  {e.total}
                                </td>
                                <td
                                  className={`whitespace-nowrap font-medium px-6 py-4`}
                                >
                                  {e.discount}%
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  {e.orderItems.reduce((a:any,i:any)=>{
                                    return a + i.quantity
                                  },0)}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  User
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 flex gap-8 items-center font-medium">
                                  <NavLink to={"/admin/tranaction/sdsfsdgdf"}>
                                    <FiEdit
                                      className="cursor-pointer"
                                      size={18}
                                    />
                                  </NavLink>
                                  <FiDelete
                                    className="cursor-pointer"
                                    size={18}
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
            )}
          </main>
      </main>
    </div>
  );
};

export default Orders;
