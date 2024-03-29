import { FiDelete, FiEdit } from "react-icons/fi";
import AdminSidebar from "../../components/AdminSidebar";
import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import {
  useAllUsersQuery,
  useDeleteUserMutation,
} from "../../../../redux/api/userAPI";
import { responseToast } from "../../../../utils/features";
import { CustomError } from "../../../../types/api_types";
import toast from "react-hot-toast";
import { Loading } from "../../../Loading/Loading";

const Customers = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, isError, error } = useAllUsersQuery(user?._id!);

  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (userId: string) => {
    const res = await deleteUser({ userId, adminUserId: user?._id! });
    responseToast(res, null, "");
  };

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div>
      <AdminSidebar>
        <div className="w-full h-[100vh] max-h-screen overflow-y-scroll">
          <main className="lg:px-28 md:px-18 sm:px-12 px-2 flex flex-col justify-center items-center w-full">
            <h1 className="text-2xl font-medium w-full mt-10">Customers</h1>
            <div className="flex flex-col w-full">
              <div className="overflow-x-auto w-full">
                <div className="inline-block min-w-full py-2 w-full">
                  <div className="overflow-hidden w-full">
                    <table className="min-w-full text-left text-sm font-light w-full">
                      <thead className="border-b font-medium dark:border-neutral-500 w-full">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            User Img
                          </th>
                          <th scope="col" className="px-6 py-4">
                            User Name
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Role
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Gender
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Options
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading ? (
                          <Loading />
                        ) : (
                          data?.users.map((user: any) => {
                            return (
                              <tr
                                className="border-b dark:border-neutral-500 hover:bg-gray-200"
                                key={user._id}
                              >
                                <td className="whitespace-nowrap px-6 py-4 font-normal">
                                  <img src={user.photo} alt="image" className="h-10 w-10" />
                                </td>
                                <td
                                  className={`whitespace-nowrap font-medium px-6 py-4`}
                                >
                                  {user.name}
                                </td>
                                <td
                                  className={`whitespace-nowrap font-medium px-6 py-4`}
                                >
                                  {user.role}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  {user.gender}
                                </td>
                                <td className="whitespace-nowrap px-6 py-6 flex gap-8 items-center font-medium">
                                  <FiEdit
                                    className="cursor-pointer"
                                    size={18}
                                  />{" "}
                                  <FiDelete
                                    className="cursor-pointer"
                                    size={18}
                                    onClick={() => deleteHandler(user._id)}
                                  />
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </AdminSidebar>
    </div>
  );
};

export default Customers;
