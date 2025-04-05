import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import logo from "../assets/LMSblack.png";
import logo_with_title from "../assets/LMS.png";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { resetAuthSlice, resetPassword } from "../store/slices/authSlice";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa6";
import { showToast } from "../showToast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const dispatch = useDispatch()
  const { loading, error, message, user, isAuthenticated } = useSelector(state => state.auth)
  const navigate = useNavigate();

  const { token } = useParams();

  const handleResetPassword = (e) => {
    e.preventDefault();
    e.preventDefault();
    const data = {
      password,
      confirmPassword,
    };
    dispatch(resetPassword(data, token))
  }

  useEffect(() => {
    if (message) {
      showToast(message, "success")
      dispatch(resetAuthSlice());
      setPassword("");
      setConfirmPassword("");
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
    <>
      <div className="flex flex-col justify-center md:flex-row h-screen">
        {/* {left} */}
        <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-br-[80px] rounded-tr-[80px]">
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
        </div>
        {/* {right} */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 relative bg-white ">
          <Link
            to="/password/forgot"
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
            <h1 className=" text-4xl overflow-hidden font-medium text-center mb-5 ">!! Reset Password !!</h1>
            <p className=" text-gray-800 text-center mb-12">Please enter your new password</p>
            <form onSubmit={handleResetPassword}>
              <div className="mb-4 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-black rounded-md focus:outline-none "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-4 text-black"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="mb-4 relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 border border-black rounded-md focus:outline-none "
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-4 text-black"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
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
    </>
  )
};

export default ResetPassword;
