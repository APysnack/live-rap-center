import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// UTILS
function assembleResponse(res) {
  console.log(res);
  var assembledResponse = {
    token: res.headers.authorization,
    user: res.data,
  };
  return JSON.stringify(assembledResponse);
}

function assembleError(err) {
  var assembledError = {
    code: err.code,
    errorMessages: err.response.data.status,
  };

  return JSON.stringify(assembledError);
}

const API_URL = "http://localhost:3001";

// FUNCTIONS TO BE EXECUTED
export const registerUser = createAsyncThunk("user/registerUser", (payload) => {
  return axios
    .post(`${API_URL}/signup`, payload)
    .then((res) => assembleResponse(res))
    .catch((error) => assembleError(error));
});

export const loginUser = createAsyncThunk("user/loginUser", (payload) => {
  return axios
    .post(`${API_URL}/login`, payload)
    .then((res) => assembleResponse(res))
    .catch((error) => error);
});

export const loginWithToken = createAsyncThunk("user/currentUser", (config) => {
  return axios
    .get(`${API_URL}/current_user`, config)
    .then((res) => res.data)
    .catch((error) => error);
});

export const logoutUser = createAsyncThunk("user/logoutUser", (config) => {
  return axios
    .delete(`${API_URL}/logout`, config)
    .then((res) => assembleResponse(res))
    .catch((error) => error.message);
});

// INITIAL STATE
const userInitialState = {
  userState: {
    isLoading: false,
    user: null,
    error: [],
  },
};

// SLICE
const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {},
  extraReducers: {
    [loginUser.pending.type]: (state, action) => {
      state.userState = {
        isLoading: true,
      };
    },
    [loginUser.fulfilled.type]: (state, action) => {
      let res = JSON.parse(action.payload);
      if (res.token) {
        localStorage.setItem("auth_token", res.token);
        state.userState = {
          isLoading: false,
          user: res.user.data,
        };
      } else {
        state.userState = {
          isLoading: false,
          error: ["we were unable to log you in with this information"],
        };
      }
    },
    [loginUser.rejected.type]: (state, action) => {
      console.log(action);
      state.userState = {
        isLoading: false,
        user: null,
      };
    },
    [registerUser.pending.type]: (state, action) => {
      state.userState = {
        isLoading: true,
      };
    },
    [registerUser.fulfilled.type]: (state, action) => {
      let res = JSON.parse(action.payload);
      let errMessage = [];
      if (res?.errorMessages?.message) {
        errMessage.push(res?.errorMessages?.message);
        state.userState = {
          isLoading: false,
          error: [...errMessage],
        };
      } else {
        localStorage.setItem("auth_token", res.token);
        state.userState = {
          isLoading: false,
          user: res.user.data,
          error: [],
        };
      }
    },
    [registerUser.rejected.type]: (state, action) => {
      console.log(`failed ${action}`);
      state.userState = {
        isLoading: false,
        user: {},
        error: ["view register user rejected type"],
      };
    },
    [logoutUser.pending.type]: (state, action) => {
      state.userState = {
        isLoading: true,
      };
    },
    [logoutUser.fulfilled.type]: (state, action) => {
      localStorage.removeItem("auth_token");
      state.userState = {
        isLoading: false,
        user: null,
        error: [],
      };
    },
    [logoutUser.rejected.type]: (state, action) => {
      state.userState = {
        isLoading: false,
        user: [],
        error: action.payload,
      };
    },
    [loginWithToken.pending.type]: (state, action) => {
      state.userState = {
        isLoading: true,
        error: [],
      };
    },
    [loginWithToken.fulfilled.type]: (state, action) => {
      state.userState = {
        isLoading: false,
        user: action.payload,
        error: [],
      };
    },
    [loginWithToken.rejected.type]: (state, action) => {
      state.userState = {
        isLoading: false,
        user: null,
        error: ["view login with user rejected type"],
      };
    },
  },
});

export default userSlice;
