import React, { useState } from 'react'
import closeIcon from "../assets/close-square.png";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../store/slices/authSlice';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa6';
import { toggleSettingPopup } from '../store/slices/popUpSlice';
import settingIcon from '../assets/setting.png'

const SettingPopup = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);




  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.user)
  const navigate = useNavigate();

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    const data = {
      currentPassword,
      newPassword,
      confirmNewPassword,
    };
    dispatch(updatePassword(data));
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 p-5 flex items-center justify-center z-50">
      <div className="w-full bg-white rounded-lg shadow-lg sm:w-auto lg:w-1/2 2xl:w-1/3 ">
        <div className="p-6">
          <header className="flex justify-between items-center mb-7 pb-2 border-b-[1px] border-black">
            <div className="flex items-center gap-3 ">
              <img src={settingIcon} alt="key-icon" className="bg-gray-300 rounded-lg p-2" />
              <h3 className="text-xl font-bold ">Update Password</h3>
            </div>
            <img className="cursor-pointer" src={closeIcon} alt="close-icon" onClick={() => dispatch(toggleSettingPopup())} />
          </header>
          <form onSubmit={handleUpdatePassword}>

            <div className="mb-4 relative gap-4 items-center ">
              <label className="block text-gray-900 font-medium w-full ">
                Current Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full py-2 px-4 border border-gray-300 rounded-md "
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-black"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="mb-4 relative gap-4 items-center ">
              <label className="block text-gray-900 font-medium w-full ">
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                className="w-full py-2 px-4 border border-gray-300 rounded-md "
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-9 text-black"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="mb-4 relative gap-4 items-center ">
              <label className="block text-gray-900 font-medium w-full ">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full py-2 px-4 border border-gray-300 rounded-md "
                placeholder="Confirm Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-black"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => dispatch(toggleSettingPopup())}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                Close
              </button>
              {loading ? <>
                <button
                  disabled
                  className="px-4 py-2 font-semibold bg-black text-white rounded-md hover:bg-gray-800"
                >
                  <FaSpinner className="animate-spin mx-2" />
                </button>
              </> : <>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 font-semibold bg-black text-white rounded-md hover:bg-gray-800">
                  Add
                </button>
              </>
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SettingPopup


