import React, { useState } from "react";
import placeHolder from "../assets/placeholder.jpg";
import closeIcon from "../assets/close-square.png";
import keyIcon from "../assets/key.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewAdmin } from '../store/slices/userSlice'
import { toggleAddNewAdminPopup } from '../store/slices/popUpSlice'
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa6";

const AddNewAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);


  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.user)
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result)
      }
      reader.readAsDataURL(file);
      setAvatar(file)
    }
  }

  const handleAddNewAdmin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('avatar', avatar);
    dispatch(addNewAdmin(formData));
  }
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 p-5 flex items-center justify-center z-50">
        <div className="w-full bg-white rounded-lg shadow-lg md:w-1/3">
          <div className="p-6">
            <header className="flex justify-between items-center mb-7 pb-2 border-b-[1px] border-black">
              <div className="flex items-center gap-3 ">
                <img src={keyIcon} alt="key-icon" className="bg-gray-300 rounded-lg p-2" />
                <h3 className="text-xl font-bold ">Add new Admin</h3>
              </div>
              <img className="cursor-pointer" src={closeIcon} alt="close-icon" onClick={() => dispatch(toggleAddNewAdminPopup())} />
            </header>
            <form onSubmit={handleAddNewAdmin}>
              {/* {AvaterSelection} */}
              <div className="flex flex-col items-center mb-6">
                <label htmlFor="avatarInput" className="cursor-pointer">
                  <img className="w-24 h-24 rounded-full object-cover" src={avatarPreview ? avatarPreview : placeHolder} alt="Avatar" />
                  <input type="file" className="hidden" id="avatarInput" accept="image/" onChange={handleImageChange} />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-900 font-medium ">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full py-2 px-4 border border-gray-300 rounded-md"
                  placeholder="Admin's Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-900 font-medium ">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full py-2 px-4 border border-gray-300 rounded-md "
                  placeholder="Admin's Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4 relative">
                <label className="block text-gray-900 font-medium ">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full py-2 px-4 border border-gray-300 rounded-md "
                  placeholder="Admin's Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-black"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => dispatch(toggleAddNewAdminPopup())}
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
    </>
  );
};

export default AddNewAdmin;
