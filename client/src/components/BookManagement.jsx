import React, { useEffect, useState } from "react";
import { BookA, NotebookPen } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleAddBookPopup, toggleReadBookPopup, toggleRecordBookPopup } from "../store/slices/popUpSlice";
import { showToast } from "../showToast";
import { fetchAllBooks, resetBookSlice } from '../store/slices/bookSlice'
import { fetchAllBorrowdBooks, resetBorrowSlice } from "../store/slices/borrowSlice";
import Header from '../layout/Header'
import AddBookPopup from '../popups/AddBookPopup'
import RecordBookPopup from '../popups/RecordBookPopup'
import ReadBookPopup from '../popups/ReadBookPopup'

const BookManagement = () => {
  const dispatch = useDispatch()
  const { loading, error, message, books } = useSelector(state => state.book)
  // console.log("This is Books from bookManagement : ", books);
  const { user, isAuthenticated } = useSelector(state => state.auth)
  const { addBookPopup, readBookPopup, recordBookPopup } = useSelector(state => state.popup)
  const { loading: borrowSliceLoading, error: borrowSliceError, message: borrowSliceMessage } = useSelector(state => state.borrow)

  const navigate = useNavigate();

  const [readBook, setReadBook] = useState({})
  const openReadPopup = (id) => {
    const book = books.find(book => book._id === id);
    setReadBook(book);
    dispatch(toggleReadBookPopup());
  }

  const [borrowBookId, setBorrowBookId] = useState("");
  const openRecordBookPopup = (bookId) => {
    setBorrowBookId(bookId)
    dispatch(toggleRecordBookPopup());
  }

  useEffect(() => {
    if (message || borrowSliceMessage) {
      showToast(message || borrowSliceMessage, "success")
      dispatch(fetchAllBooks());
      dispatch(fetchAllBorrowdBooks());
      dispatch(resetBookSlice())
      dispatch(resetBorrowSlice())
    }
    if (error || borrowSliceError) {
      showToast(error || borrowSliceError, "error")
      dispatch(resetBookSlice());
      dispatch(resetBorrowSlice())
    }
  }, [dispatch, message, error, loading, borrowSliceError, borrowSliceLoading, borrowSliceMessage])

  const [searchedKeyword, setSearchedKeyword] = useState("")
  const handleSearch = (e) => {
    setSearchedKeyword(e.target.value.toLowerCase());
  }
  const searchedBooks = books.filter((book) => book.title.toLowerCase().includes(searchedKeyword))

  return (
    <>
      <main className="relative flex-1 p-6 pt-28">
        <Header />
        <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center ">
          <h2 className="text-xl font-medium md:text-2xl md:font-semibold">{user && user.role === "Admin" ? "Book Management" : "Books"}</h2>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            {
              isAuthenticated && user.role === "Admin" && (
                <button
                  className="relative pl-10 w-full sm:w-52 gap-3 flex items-center justify-center bg-black py-2 px-2 text-white rounded-md hover:bg-gray-800"
                  onClick={() => dispatch(toggleAddBookPopup())}><span className="bg-white justify-center yexy-[27px] absolute left-5 items-center overflow-hidden rounded-full text-black w-[25px] h-[25px]">+</span> Add Book</button>
              )
            }
            <input
              type="text"
              placeholder="Search Books..."
              className="w-full sm:w-52 border-gray-300 p-2 rounded-md"
              value={searchedKeyword}  // Corrected: Use searchedKeyword, not searchedBooks
              onChange={handleSearch}
            />
          </div>
        </header>

        {/* {Table} */}
        {
          books && books.length > 0 ? (
            <div className="mt-6 overflow-auto bg-white rounded-md shadow-lg">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Author</th>
                    {isAuthenticated && user.role === "Admin" && <th className="px-4 py-2 text-left">quanity</th>}
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Availability</th>
                    {isAuthenticated && user.role === "Admin" && <th className="px-4 py-2 text-center">record Book</th>}

                  </tr>
                </thead>
                <tbody>
                  {
                    searchedBooks.map((book, index) => (
                      <tr key={book._id} className={(index + 1) % 2 === 0 ? "bg-gray-50" : ""}>
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{book.title}</td>
                        <td className="px-4 py-2 ">{book.author}</td>
                        {isAuthenticated && user.role === "Admin" && <td className="px-4 py-2 text-left">  {book.quantity} </td>}
                        <td className="px-4 py-2 ">  {book.price} </ td>
                        <td className="px-4 py-2 ">
                          {book.quantity > 0 ?
                            <span className="text-green-600 font-medium px-4 py-2 rounded-md">
                              Available
                            </span>
                            :
                            <span className="text-red-600 font-medium py-2 px-4 rounded-md whitespace-nowrap">
                              Not Available
                            </span>
                          }
                        </td>
                        {isAuthenticated && user.role === "Admin" && (
                          <td className="px-4 py-2 flex space-x-2 justify-center">
                            <BookA className="cursor-pointer" onClick={() => openReadPopup(book._id)} />
                            <NotebookPen className="cursor-pointer" onClick={() => openRecordBookPopup(book._id)} />
                          </td>
                        )}
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          ) : (
            <>
              <h3 className="text-3xl mt-5 font-medium">No Books Found in library</h3>
            </>
          )
        }
      </main>
      {addBookPopup && <AddBookPopup />}
      {readBookPopup && <ReadBookPopup book={readBook} />}
      {recordBookPopup && <RecordBookPopup bookId={borrowBookId} />}
    </>
  )
};

export default BookManagement;
