import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toggleSettingPopup } from "./popUpSlice";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    message: null,
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    registerRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    otpVerificationRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    otpVerificationSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    otpVerificationFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    loginRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    logoutSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    },
    getUserRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getUserSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    getUserFailed(state, action) {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    forgotPasswordRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    forgotPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetPasswordRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    resetPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updatePasswordRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    updatePasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    resetAuthSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
      // state.isAuthenticated = state.isAuthenticated;
      // state.user = state.user;
    },
  },
});

const backendUrl = "https://library-ms-backend.onrender.com";

export const resetAuthSlice = () => (dispach) => {
  dispach(authSlice.actions.resetAuthSlice());
};

export const register = (data) => async (dispach) => {
  dispach(authSlice.actions.registerRequest());
  await axios
    .post(`${backendUrl}/api/v1/auth/register`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispach(authSlice.actions.registerSuccess(res.data));
    })
    .catch((error) => {
      dispach(authSlice.actions.registerFailed(error.response.data.message));
    });
};

export const otpVerification = (email, otp) => async (dispach) => {
  dispach(authSlice.actions.otpVerificationRequest());
  await axios
    .post(
      `${backendUrl}/api/v1/auth/verify-otp`,
      { email, otp },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      dispach(authSlice.actions.otpVerificationSuccess(res.data));
    })
    .catch((error) => {
      dispach(
        authSlice.actions.otpVerificationFailed(error.response.data.message)
      );
    });
};

export const login = (data) => async (dispach) => {
  dispach(authSlice.actions.loginRequest());
  await axios
    .post(`${backendUrl}/api/v1/auth/login`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispach(authSlice.actions.loginSuccess(res.data));
    })
    .catch((error) => {
      dispach(authSlice.actions.loginFailed(error.response.data.message));
    });
};

export const logout = () => async (dispach) => {
  dispach(authSlice.actions.logoutRequest());
  await axios
    .get(`${backendUrl}/api/v1/auth/logout`, {
      withCredentials: true,
    })
    .then((res) => {
      dispach(authSlice.actions.logoutSuccess(res.data.message));
      dispach(authSlice.actions.resetAuthSlice());
    })
    .catch((error) => {
      dispach(authSlice.actions.logoutFailed(error.response.data.message));
    });
};

export const getUser = () => async (dispach) => {
  dispach(authSlice.actions.getUserRequest());
  await axios
    .get(`${backendUrl}/api/v1/auth/me`, {
      withCredentials: true,
    })
    .then((res) => {
      dispach(authSlice.actions.getUserSuccess(res.data));
    })
    .catch((error) => {
      dispach(authSlice.actions.getUserFailed(error.response.data.message));
    });
};

export const forgotPassword = (email) => async (dispach) => {
  dispach(authSlice.actions.forgotPasswordRequest());
  await axios
    .post(
      `${backendUrl}/api/v1/auth/password/forgot`,
      { email },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      dispach(authSlice.actions.forgotPasswordSuccess(res.data));
    })
    .catch((error) => {
      dispach(
        authSlice.actions.forgotPasswordFailed(error.response.data.message)
      );
    });
};

export const resetPassword = (data, token) => async (dispach) => {
  dispach(authSlice.actions.resetPasswordRequest());
  await axios
    .put(`${backendUrl}/api/v1/auth/password/reset/${token}`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispach(authSlice.actions.resetPasswordSuccess(res.data));
    })
    .catch((error) => {
      dispach(
        authSlice.actions.resetPasswordFailed(error.response.data.message)
      );
    });
};

export const updatePassword = (data) => async (dispach) => {
  dispach(authSlice.actions.updatePasswordRequest());
  await axios
    .put(`${backendUrl}/api/v1/auth/password/update`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispach(authSlice.actions.updatePasswordSuccess(res.data.message));
      dispach(toggleSettingPopup());
    })
    .catch((error) => {
      dispach(
        authSlice.actions.updatePasswordFailed(error.response.data.message)
      );
    });
};

export default authSlice.reducer;
