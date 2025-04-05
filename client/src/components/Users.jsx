import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from '../layout/Header'

const Users = () => {
  const dispatch = useDispatch();
  const { loading, users } = useSelector((state) => state.user);
  // console.log("Users from Redux:", users);
  const navigate = useNavigate();

  const formData = (timestamp) => {
    const date = new Date(timestamp);

    const formatedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getFullYear())}`;
    const formatedTime =
      String(date.getHours()).padStart(2, "0") +
      ":" +
      String(date.getMinutes()).padStart(2, "0") +
      ":" +
      String(date.getSeconds()).padStart(2, "0");
    const result = `${formatedDate} ${formatedTime}`;
    return result;
  };
  // console.log(users);
  return (
    <>
      <main className="relative flex-1 p-6 pt-28 ">
        <Header />
        <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
          <h1 className="text-xl font-medium md:text-2xl md:font-semibold">Registered Users</h1>
        </header>
        {/* {table} */}
        {
          users && users.filter((u) => u.role === "User").length > 0 ? (
            <>
              <div className="overflow-x-auto bg-white rounded-md shadow-lg mt-6">
                <table className="min-w-full border-collapse ">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2 text-left">ID</th>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Role</th>
                      <th className="px-4 py-2 text-center">No. of books borrowed</th>
                      <th className="px-4 py-2 text-center">Registered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      users.filter((u) => u.role === "User").map((user, index) => (
                        <tr className={((index + 1) % 2 === 0 ? "bg-gray-200" : "")} key={user._id}>
                          <td className="px-4 py-2 text-left">{index + 1}</td>
                          <td className="px-4 py-2 text-left">{user.name}</td>
                          <td className="px-4 py-2 text-left">{user.email}</td>
                          <td className="px-4 py-2 text-left">{user.role}</td>
                          <td className="px-4 py-2 text-center">{user?.borrowedBooks.length}</td>
                          <td className="px-4 py-2 text-center">{formData(user.createdAt)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-3xl mt-5 font-medium text-gray-600">No registered user found in library</h3>
            </>
          )
        }

      </main>
    </>
  )
};

export default Users;


