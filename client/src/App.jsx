import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import OTP from './pages/OTP';
import ResetPassword from './pages/ResetPassword';
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './store/slices/authSlice';
import { fetchAllUsers } from './store/slices/userSlice';
import { fetchAllBooks } from './store/slices/bookSlice';
import { fetchUserBorrowedBooks, fetchAllBorrowdBooks } from './store/slices/borrowSlice';
import { Tooltip } from 'react-tooltip'


const App = () => {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    if (isAuthenticated && user?.role === "User") {
      dispatch(fetchUserBorrowedBooks())
      dispatch(fetchAllBooks())
    }
    if (isAuthenticated && user?.role === "Admin") {
      dispatch(fetchAllUsers());
      dispatch(fetchAllBooks());
      dispatch(fetchAllBorrowdBooks());
    }
  }, [isAuthenticated]);

  return <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/otp-verification/:email" element={<OTP />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
      </Routes>
      <ToastContainer theme='dark' />
      <Tooltip id="my-tooltip" />
    </Router>
  </>;
};

export default App;
