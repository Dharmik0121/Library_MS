import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toggleRecordBookPopup } from "./popUpSlice";

const borrowSlice = createSlice({
  name: "borrow",
  initialState: {
    loading: false,
    error: null,
    message: null,
    userBorrowedBooks: [],
    allBorrowedBooks: [],
  },
  reducers: {
    fetchUserBorrowedBooksRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchUserBorrowedBooksSuccess(state, action) {
      state.loading = false;
      state.userBorrowedBooks = action.payload;
    },
    fetchUserBorrowedBooksFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    recordBookRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    recordBookSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    recordBookFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    fetchAllBorrowedBooksRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchAllBorrowedBooksSuccess(state, action) {
      state.loading = false;
      state.allBorrowedBooks = action.payload;
    },
    fetchAllBorrowedBooksFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    returnBookRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    returnBookSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    returnBookFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetBorrowSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

const backendUrl = "https://library-ms-backend.onrender.com";

export const fetchUserBorrowedBooks = () => async (dispatch) => {
  dispatch(borrowSlice.actions.fetchUserBorrowedBooksRequest());
  await axios
    .get(`${backendUrl}/api/v1/borrow/my-borrowed-books`, {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(
        borrowSlice.actions.fetchUserBorrowedBooksSuccess(
          res.data.borrowedBooks
        )
      );
    })
    .catch((err) => {
      dispatch(
        borrowSlice.actions.fetchUserBorrowedBooksFailed(
          err.response.data.message
        )
      );
    });
};

export const fetchAllBorrowdBooks = () => async (dispatch) => {
  dispatch(borrowSlice.actions.fetchAllBorrowedBooksRequest());
  try {
    const res = await axios.get(
      `${backendUrl}/api/v1/borrow/get-borrowed-books-by-users`,
      { withCredentials: true }
    );

    // ✅ Ensure only borrowedBooks are stored in Redux
    console.log(
      "Fetched borrowed books:",
      JSON.stringify(res.data.borrowedBooks, null, 2)
    );

    dispatch(
      borrowSlice.actions.fetchAllBorrowedBooksSuccess(res.data.borrowedBooks)
    );
  } catch (err) {
    console.error("Error fetching borrowed books:", err);

    // ✅ Prevents accessing undefined or circular structure
    const errorMessage = err.response?.data?.message || "Unknown error";

    dispatch(borrowSlice.actions.fetchAllBorrowedBooksFailed(errorMessage));
  }
};

export const recordBorrowedBook = (email, id) => async (dispatch) => {
  dispatch(borrowSlice.actions.recordBookRequest());
  await axios
    .post(
      `${backendUrl}/api/v1/borrow/record-borrow-book/${id}`,
      { email },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      dispatch(borrowSlice.actions.recordBookSuccess(res.data.message));
      dispatch(toggleRecordBookPopup());
    })
    .catch((err) => {
      dispatch(borrowSlice.actions.recordBookFailed(err.response.data.message));
    });
};

export const returnBook = (email, id) => async (dispatch) => {
  dispatch(borrowSlice.actions.returnBookRequest());
  await axios
    .put(
      `${backendUrl}/api/v1/borrow/return-borrowed-book/${id}`,
      { email },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      dispatch(borrowSlice.actions.returnBookSuccess(res.data.message));
    })
    .catch((err) => {
      dispatch(borrowSlice.actions.returnBookFailed(err.response.data.message));
    });
};

export const resetBorrowSlice = () => async (dispatch) => {
  dispatch(borrowSlice.actions.resetBorrowSlice());
};

export default borrowSlice.reducer;
