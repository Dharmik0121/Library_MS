import React, { useEffect, useState } from "react";
import logo from "../assets/LMSBlack.png";
import logo_with_title from "../assets/LMS.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { forgotPassword, resetAuthSlice } from "../store/slices/authSlice";
import { FaSpinner } from "react-icons/fa6";
import { showToast } from "../showToast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const { loading, error, message, user, isAuthenticated } = useSelector(state => state.auth)
  const navigate = useNavigate();

  const handelForgotPassword = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email))
  }

  useEffect(() => {
    if (message) {
      showToast(message, "success")
      dispatch(resetAuthSlice());
      setEmail("");
    }
    if (error) {
      showToast(error, "error")
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, loading])

  if (isAuthenticated) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="flex flex-col justify-center md:flex-row h-screen">
      {/* {Left} */}
      <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tr-[80px] rounded-br-[80px]">
        <div className="text-center h-[450px]">
          <div className="flex justify-center mb-12">
            <img src={logo_with_title} alt="logo" className="mb-12 w-auto h-44" />
          </div>
          <h3 className="text-gray-300 mb-12 max-w-[320px] mx-auto text-2xl font-medium leading-10">
            &quot;Your premier digital library for borrowing and reading book&quot;
          </h3>
        </div>
      </div>
      {/* {Right} */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 relative bg-white ">
        <Link
          to="/login"
          className="border-2 border-black rounded-3xl font-bold w-52 py-2 px-4 fixed top-10 -right-28 hover:bg-black hover:text-white transition duration-300 text-start"
        >
          Back
        </Link>
        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-12">
            <div className="rounded-full flex items-center justify-center">
              <img src={logo} alt="logo" className="h-44 w-auto" />
            </div>
          </div>
          <h1 className=" text-4xl overflow-hidden font-medium text-center mb-5 ">!! Forgot Password !!</h1>
          <p className=" text-gray-800 text-center mb-12">Please enter your email</p>
          <form onSubmit={handelForgotPassword}>
            <div className="mb-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                className="w-full px-4 py-3 border border-black rounded-md focus:outline-none "
              />
            </div>
            {loading ? <>
              <button
                disabled
                className="border-2 mt-5 border-black w-full font-semibold bg-gray-800 text-white py-2 rounded-lg flex justify-center items-center"
              >
                <FaSpinner className="animate-spin mr-2" />
                Processing...
              </button>
            </> : <>
              <button
                disabled={loading}
                className="border-2 mt-5 border-black  w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition">Reset Password</button>
            </>}

          </form>
        </div>
      </div>
    </div>
  )
};

export default ForgotPassword;
