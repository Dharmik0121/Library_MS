import React, { useEffect, useState } from "react";
import logo from "../assets/LMSBlack.png";
import logo2 from "../assets/LMS.png";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { otpVerification, resetAuthSlice } from "../store/slices/authSlice";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa6";
import { showToast } from "../showToast";


const OTP = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();

  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const handleOtpVerification = (e) => {
    e.preventDefault();
    dispatch(otpVerification(email, otp));
  };

  useEffect(() => {
    if (message) {
      showToast(message, "success")
      dispatch(resetAuthSlice());
      navigate(`/otp-verification/${email}`)
    }
    if (error) {
      showToast(error, "error")
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, loading]);

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row h-screen">
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
          <Link
            to="/register"
            className="border-2 border-black rounded-3xl font-bold w-52 py-2 px-4 fixed top-10 -left-28 hover:bg-black hover:text-white transition duration-300 text-end"
          >
            Back
          </Link>
          <div className="max-w-sm w-full">
            <div className="flex justify-center mb-8">
              <div className="rounded-full flex items-center justify-center">
                <img src={logo} alt="logo" className="h-44 w-auto" />
              </div>
            </div>
            <h1 className="text-4xl font-mono text-center overflow-hidden mb-8">
              Check your mailbox
            </h1>
            <p className="text-gray-800 text-center mb-8">
              Please enter the otp to preceed
            </p>
            <form onSubmit={handleOtpVerification}>
              <div className="mb-4">
                <input
                  type="number"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="OTP"
                  className="w-full px-4 py-3 border border-black rounded-md focus:outline-none "
                />
              </div>
              {/* <button className="border-2 mt-5 border-black  w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition">Verify</button> */}
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
                  className="border-2 mt-5 border-black  w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition">Verify</button>
              </>}
            </form>
          </div>
        </div>
        {/* {RightSide} */}
        <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-lg rounded-tl-[80px] rounded-bl-[80px]">
          <div className="text-center h-[400px]">
            <div className="flex justify-center mb-12">
              <img src={logo2} alt="" className="h-44 w-auto" />
            </div>
            <p className="text-gray-300 mb-12 ">New to our Platform? Sign up now.</p>
            <Link to='/register' className="border-2 mt-5 border-white px-8 w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition">{" "}Sign Up</Link>

          </div>
        </div>
      </div>
    </>
  );
};

export default OTP;
