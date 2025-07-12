import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toggleAddBookPopup } from "./popUpSlice";
import { showToast } from "../../showToast";

const bookSlice = createSlice({
  name: "book",
  initialState: {
    loading: false,
    error: null,
    message: null,
    books: [],
  },
  reducers: {
    fetchBooksRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchBooksSuccess(state, action) {
      state.loading = false;
      state.books = action.payload;
    },
    fetchBooksFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    addBookRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addBookSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    addBookFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateBookQuantityRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateBookQuantitySuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    updateBookQuantityFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetBookSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

const backendUrl = "https://library-ms-backend.onrender.com";

export const fetchAllBooks = () => async (dispatch) => {
  dispatch(bookSlice.actions.fetchBooksRequest());
  try {
    const res = await axios.get(`${backendUrl}/api/v1/book/all`, {
      withCredentials: true,
    });

    // Validate & log
    console.log("Fetched books:", JSON.stringify(res.data.books, null, 2));

    dispatch(bookSlice.actions.fetchBooksSuccess(res.data.books));
  } catch (error) {
    console.error("Error fetching books:", error);
    dispatch(
      bookSlice.actions.fetchBooksFailed(
        error.response?.data?.message || "Unknown error"
      )
    );
  }
};

export const addBook = (data) => async (dispatch) => {
  dispatch(bookSlice.actions.addBookRequest());
  await axios
    .post(`${backendUrl}/api/v1/book/admin/add`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(bookSlice.actions.addBookSuccess(res.data.message));
      dispatch(toggleAddBookPopup());
    })
    .catch((err) => {
      dispatch(bookSlice.actions.addBookFailed(err.response.data.message));
    });
};

export const resetBookSlice = (data) => async (dispatch) => {
  dispatch(bookSlice.actions.resetBookSlice());
};

export const updateBookQuantity = (bookId, newQuantity) => async (dispatch) => {
  dispatch(bookSlice.actions.updateBookQuantityRequest());
  try {
    const res = await axios.put(
      `${backendUrl}/api/v1/book/update/${bookId}`,
      { quantity: newQuantity },
      { withCredentials: true }
    );

    dispatch(bookSlice.actions.updateBookQuantitySuccess(res.data.message));
    showToast(res.data.message, "success"); // Optional: use toast here
    dispatch(fetchAllBooks()); // Refresh books list
  } catch (error) {
    dispatch(
      bookSlice.actions.updateBookQuantityFailed(
        error.response?.data?.message || "Error updating quantity"
      )
    );
    showToast(
      error.response?.data?.message || "Error updating quantity",
      "error"
    );
  }
};

export default bookSlice.reducer;
