import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
import { useState } from "react";
import { getUser, useLoginMutation } from "../../redux/api/userAPI";
// import { useDispatch } from "react-redux";
import { MessageResponse } from "../../types/api_types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { userExist, userNotExist } from "../../redux/reducer/userReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [login] = useLoginMutation();

  const firebaseLoginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      const res = await login({
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender,
        role: "user",
        dob: date,
        _id: user.uid,
      });

      if ("data" in res) {
        toast.success(res.data.message);
        const data = await getUser(user.uid);
        dispatch(userExist(data?.user!));
        navigate("/");
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
        dispatch(userNotExist());
      }
    } catch (error) {
      toast.error("Sign In Fail");
    }
  };

  return (
    <div className="mx-4 my-5 sm:h-[60vh]">
      <main className="mx-auto flex h-full w-full items-center justify-center bg-white text-black">
        <section className="flex w-[30rem] flex-col space-y-6">
          <div className="text-xl font-medium text-[#3e3939]">Login</div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-[#3e3939]">
            <input
              type="text"
              placeholder="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="text-sm w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            />
          </div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-[#3e3939]">
            <input
              type="date"
              placeholder="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="text-sm w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            />
          </div>

          <button
            className="w-32 text-sm transform rounded-sm bg-[#3e3939] py-2 font-base duration-300 hover:bg-[#D72323] text-white"
            onClick={firebaseLoginHandler}
          >
            LOG IN
          </button>

          {/* <a
            href="#"
            className="transform text-sm font-semibold text-gray-500 duration-300 hover:text-gray-300"
          >
            FORGOT PASSWORD?
          </a> */}

          <p className="text-sm">
            No account?
            <a
              href="#"
              className="font-medium text-indigo-500 underline-offset-4 hover:underline"
            >
              Create One
            </a>
          </p>
          <button
            className="px-4 py-2 flex w-60 gap-2 border dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow-md transition duration-150 justify-center items-center"
            onClick={firebaseLoginHandler}
          >
            <img
              className="w-4 h-4"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            />
            <span className="text-gray-700 text-xs">Signin with Google</span>
          </button>
        </section>
      </main>
    </div>
  );
};

export default Login;
