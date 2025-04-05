import React, { useEffect, useState } from "react";
import { PiKeyReturnBold } from "react-icons/pi";
import { FaSquareCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux"
import { toggleReturnBookPopup } from "../store/slices/popUpSlice";
import { showToast } from '../showToast'
import { fetchAllBooks, resetBookSlice } from '../store/slices/bookSlice'
import { fetchAllBorrowdBooks, resetBorrowSlice } from '../store/slices/borrowSlice'
import ReturnBookPopup from "../popups/ReturnBookPopup";
import Header from "../layout/Header";

const Catalog = () => {

  const dispatch = useDispatch();
  const { returnBookPopup } = useSelector(state => state.popup)
  const { message, loading, error, allBorrowedBooks } = useSelector(state => state.borrow)

  const [filter, setFilter] = useState("borrowed")

  const formatDateAndTime = (timestamp) => {
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

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getFullYear())}`;
  };

  const currentDate = new Date();

  const borrowedBooks = allBorrowedBooks?.filter(book => {
    const dueDate = new Date(book.dueDate);
    return dueDate > currentDate
  })

  const overDueBooks = allBorrowedBooks?.filter(book => {
    const dueDate = new Date(book.dueDate);
    return dueDate <= currentDate
  })

  const booksToDisplay = filter === "borrowed" ? borrowedBooks : overDueBooks;

  const [email, setEmail] = useState("")
  //make useState for borrowedBookId
  const [borrowedBookId, setBorrowedBookId] = useState("");
  const openReturnBookPopup = (bookId, email) => {
    setBorrowedBookId(bookId);
    setEmail(email);
    dispatch(toggleReturnBookPopup());
  }

  useEffect(() => {
    if (message) {
      showToast(message, "success")
      dispatch(fetchAllBooks())
      dispatch(fetchAllBorrowdBooks())
      dispatch(resetBookSlice())
      dispatch(resetBorrowSlice())
    }
    if (error) {
      showToast(error, "error")
      dispatch(resetBorrowSlice())
    }
  }, [dispatch, loading, error, message])

  return (
    <>
      <main className="relative flex-1 p-6 pt-28 ">
        <Header />
        {/* {subHeader} */}
        <header className="flex flex-col gap-1 sm:flex-row md:items-center ">
          <button
            onClick={() => setFilter("borrowed")}
            className={`relative rounded sm:rounded-tr-none sm:rounded-br-none sm:rounded-tl-lg  sm:rounded-bl-lg text-center border-2 font-semibold py-2 w-full sm:w-72 ${filter === "borrowed" ? "bg-black text-white " : "bg-gray-200 text-black border-gray-200 hover:bg-gray-300"}`}>
            Borrowed Books
          </button>
          <button onClick={() => setFilter("overDue")}
            className={`relative rounded sm:rounded-tl-none sm:rounded-bl-none sm:rounded-tr-lg  sm:rounded-br-lg text-center border-2 font-semibold py-2 w-full sm:w-72 ${filter === "overDue" ? "bg-black text-white " : "bg-gray-200 text-black border-gray-200 hover:bg-gray-300"}`}>
            OverDue Borrowers
          </button>
        </header>

        {
          booksToDisplay && booksToDisplay?.length > 0 ? (
            <>
              <div className="mt-6 overflow-auto bg-white rounded-md shadow-lg ">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2 text-left">ID</th>
                      <th className="px-4 py-2 text-left">User Name</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-center">Price</th>
                      <th className="px-4 py-2 text-left">Due Date</th>
                      <th className="px-4 py-2 text-left">Date&Time</th>
                      <th className="px-4 py-2 text-center">Return</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      booksToDisplay?.map((book, index) => (
                        <tr key={index} className={(index + 1) % 2 === 0 ? "bg-gray-50" : ""}>
                          <td className="px-4 py-2">{index + 1}</td>
                          <td className="px-4 py-2">{book?.user?.name}</td>
                          <td className="px-4 py-2">{book?.user?.email}</td>
                          <td className="px-4 py-2 flex justify-center">{book.price}</td>
                          <td className="px-4 py-2">{formatDate(book.dueDate)}</td>
                          <td className="px-4 py-2">{formatDateAndTime(book.createdAt)}</td>
                          <td className="px-4 py-2 flex justify-center">
                            {book.returnDate ? (
                              <FaSquareCheck className="w-6 h-6 cursor-pointer" />
                            ) : (
                              <PiKeyReturnBold className="w-6 h-6 cursor-pointer" onClick={() => openReturnBookPopup(book.book, book?.user.email)} />
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <h3 className="text-3xl mt-5 font-medium">
              No {filter === "borrowed" ? "borrowed" : "overDue"} books found!!
            </h3>
          )

        }
      </main>
      {
        returnBookPopup && <ReturnBookPopup bookId={borrowedBookId} email={email} />
      }
    </>
  )
};

export default Catalog;
