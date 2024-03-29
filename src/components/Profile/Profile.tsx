// import React from 'react'

import { HiOutlineLogout } from "react-icons/hi";
import { Loading } from "../Loading/Loading";
import { NavLink} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
import userDefaultImage from "../../assets/images/user.png"

const Profile = () => {
 
  const { user, loading } = useSelector(
    (state: RootState) => state.userReducer
  );

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
      
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <section className="my-32 bg-blueGray-50">
          <div className="w-full lg:w-4/12 px-4 mx-auto">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full px-4 flex justify-center">
                    <div className="relative -translate-y-12">
                      <img
                        className="w-[10rem] h-[10rem] rounded-full"
                        src={userDefaultImage}
                        alt="Rounded avatar"
                      />
                    </div>
                  </div>
                  <HiOutlineLogout
                    className="absolute top-0 right-0 text-2xl m-3 cursor-pointer"
                    onClick={logoutHandler}
                  />
                  <button className="absolute top-24 flex p-2.5 active:bg-[#FF7517] hover:bg-[#3E3939] rounded-xl hover:rounded-3xl bg-[#2C2727] transition-all duration-300 text-white">
                    <NavLink to="/me/update">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </NavLink>
                  </button>
                  <div className="w-full px-4 text-center mt-3 flex items-center justify-center">
                    <div className="flex justify-center items-center py-4 lg:pt-4 pt-8 gap-5">
                      <div className="p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          22
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Friends
                        </span>
                      </div>
                      <div className="p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          10
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Photos
                        </span>
                      </div>
                      <div className="p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          89
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Comments
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center my-8">
                  <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700">
                    {user?.name}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                    {user?.email}
                  </div>
            
              
                  <div className="my-6 flex gap-4 items-center justify-center text-blueGray-600">
                    <NavLink to={"/orders"}>
                      <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        My Orders
                      </button>
                    </NavLink>
                    <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Profile;
