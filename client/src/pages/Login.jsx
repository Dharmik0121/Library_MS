import React, { useEffect, useState } from "react";
import logo from "../assets/LMSblack.png";
import logo2 from "../assets/LMS.png";
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { login, resetAuthSlice } from '../store/slices/authSlice'
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa6";
import { showToast } from "../showToast";


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch()
  const { loading, error, message, user, isAuthenticated } = useSelector(state => state.auth)
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", email)
    data.append("password", password)
    dispatch(login(data))
  }

  useEffect(() => {
    if (message) {
      showToast(message, "success")
      //   dispatch(resetAuthSlice());
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
      {/* <div className="flex flex-col justify-center md:flex-row h-screen">
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
          <div className="max-w-sm w-full">
            <div className="flex justify-center mb-8">
              <div className="rounded-full flex items-center justify-center">
                <img src={logo} alt="logo" className="h-44 w-auto" />
              </div>
            </div>
            <h1 className="text-4xl font-mono text-center overflow-hidden mb-8">
              Welcome Back !!
            </h1>
            <p className="text-gray-800 text-center mb-8">
              Please enter your credientials to login
            </p>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  autoComplete="username"
                  className="w-full px-4 py-3 border border-black rounded-md focus:outline-none "
                />
              </div>
              <div className="mb-4 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoComplete="current-password"
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
              <Link to={'/password/forgot'} className="font-semibold rounded-md text-black mb-12 ">Forgot Password?</Link>
              <div className="block md:hidden font-semibold mt-5 ">
                <p>New to our platform : <Link to={'/register'} className="text-sm text-gray-500 hover:underline">Sign in</Link></p>
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
                  className="border-2 mt-5 border-black  w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition">Sign In</button>
              </>}
            </form>
          </div>
        </div>
        <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tl-[80px] rounded-bl-[80px]">
          <div className="text-center h-[400px]">
            <div className="flex justify-center mb-12">
              <img src={logo2} alt="" className="h-44 w-auto" />
            </div>
            <p className="text-gray-300 mb-12 ">New to our Platform? Sign up now.</p>
            <Link to='/register' className="border-2 mt-5 border-white px-8 w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition">{" "}Sign Up</Link>

          </div>
        </div>
      </div> */}

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-gray-100 p-4">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Login Section */}
          <div className="p-10 flex flex-col justify-center space-y-6">
            <div className="flex justify-center mb-2">
              <div className="rounded-full flex items-center justify-center">
                <img src={logo} alt="logo" className="h-44 w-auto" />
              </div>
            </div>
            <h1 className="text-4xl font-mono text-center overflow-hidden mb-8">
              Welcome Back !!
            </h1>
            <p className="text-gray-800 text-center mb-8">
              Please enter your credientials to login
            </p>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  autoComplete="username"
                  className="w-full px-4 py-3 border border-black rounded-md focus:outline-none "
                />
              </div>
              <div className="mb-4 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoComplete="current-password"
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
              <div className="block md:hidden font-semibold mt-5 ">
                <p>New to our platform : <Link to={'/register'} className="text-sm text-gray-500 hover:underline">Sign in</Link></p>
              </div>
              <div className="text-right">
                <Link to={'/password/forgot'} className="font-semibold rounded-md text-black mb-12 ">Forgot Password?</Link>
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
                  className="border-2 mt-5 border-black  w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition">Sign In</button>
              </>}
            </form>
          </div>

          {/* Register Section */}
          <div className="bg-black text-white p-10 md:flex flex-col justify-center items-center space-y-6 hidden">
            <div className="text-center h-[400px]">
              <div className="flex justify-center mb-12">
                <img src={logo2} alt="" className="h-44 w-auto" />
              </div>
              <p className="text-gray-300 mb-12 ">New to our Platform? Sign up now.</p>
              <Link to='/register' className="border-2 mt-5 border-white px-8 w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition">{" "}Sign Up</Link>

            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Login;
