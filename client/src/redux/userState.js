import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// UTILS
function assembleResponse(res) {
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

const API_URL = 'http://localhost:3001';

// FUNCTIONS TO BE EXECUTED
export const registerUser = createAsyncThunk('user/registerUser', (payload) => {
  return axios
    .post(`${API_URL}/signup`, payload)
    .then((res) => assembleResponse(res))
    .catch((error) => assembleError(error));
});

export const loginUser = createAsyncThunk('user/loginUser', (payload) => {
  return axios
    .post(`${API_URL}/login`, payload)
    .then((res) => assembleResponse(res))
    .catch((error) => console.log(error));
});

export const loginWithToken = createAsyncThunk('user/currentUser', (config) => {
  return axios
    .get(`${API_URL}/current_user`, config)
    .then((res) => res.data)
    .catch((error) => error);
});

export const logoutUser = createAsyncThunk('user/logoutUser', (config) => {
  return axios
    .delete(`${API_URL}/logout`, config)
    .then((res) => assembleResponse(res))
    .catch((error) => error.message);
});

export const updateProfilePicture = createAsyncThunk(
  'user/updateProfilePicture',
  (payload) => {
    return axios
      .post(`${API_URL}/profile-picture`, payload)
      .then((res) => res.data)
      .catch((error) => error.message);
  }
);

// INITIAL STATE
const userInitialState = {
  userState: {
    user: null,
    isLoading: false,
    isLoggedIn: false,
    error: [],
  },
};

// SLICE
const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {},
  extraReducers: {
    [loginUser.pending.type]: (state, action) => {
      state.userState = {
        user: null,
        isLoading: true,
        isLoggedIn: false,
        error: [],
      };
    },
    [loginUser.fulfilled.type]: (state, action) => {
      let res = JSON.parse(action.payload);
      let user = res.user.data;
      if (res.token) {
        localStorage.setItem('auth_token', res.token);
        state.userState = {
          user: user,
          isLoading: false,
          isLoggedIn: true,
          error: [],
        };
      } else {
        state.userState = {
          isLoading: false,
          error: ['we were unable to log you in with this information'],
        };
      }
    },
    [loginUser.rejected.type]: (state, action) => {
      state.userState = {
        user: null,
        isLoading: false,
        isLoggedIn: false,
        error: ['Error attempting to log in this user'],
      };
    },
    [registerUser.pending.type]: (state, action) => {
      state.userState = {
        user: null,
        isLoading: true,
        isLoggedIn: false,
        error: [],
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
        localStorage.setItem('auth_token', res.token);
        state.userState = {
          user: res.user.data,
          isLoading: false,
          isLoggedIn: true,
          error: [],
        };
      }
    },
    [registerUser.rejected.type]: (state, action) => {
      console.log(`failed ${action}`);
      state.userState = {
        user: null,
        isLoading: false,
        isLoggedIn: false,
        error: ['attempt to register user has failed'],
      };
    },
    [logoutUser.pending.type]: (state, action) => {
      state.userState = {
        user: null,
        isLoading: true,
        isLoggedIn: false,
        error: [],
      };
    },
    [logoutUser.fulfilled.type]: (state, action) => {
      localStorage.removeItem('auth_token');
      state.userState = {
        user: null,
        isLoading: false,
        isLoggedIn: false,
        error: [],
      };
    },
    [logoutUser.rejected.type]: (state, action) => {
      state.userState = {
        user: null,
        isLoading: false,
        isLoggedIn: false,
        error: action.payload,
      };
    },
    [loginWithToken.pending.type]: (state, action) => {
      state.userState = {
        user: null,
        isLoading: true,
        isLoggedIn: false,
        error: [],
      };
    },
    [loginWithToken.fulfilled.type]: (state, action) => {
      state.userState = {
        user: action.payload.data,
        isLoading: false,
        isLoggedIn: true,
        error: [],
      };
    },
    [loginWithToken.rejected.type]: (state, action) => {
      state.userState = {
        user: null,
        isLoading: false,
        isLoggedIn: false,
        error: ['Error trying to log in with token'],
      };
    },
    [updateProfilePicture.pending.type]: (state, action) => {
      state.userState = {
        user: null,
        isLoading: true,
        isLoggedIn: true,
        error: [],
      };
    },
    [updateProfilePicture.fulfilled.type]: (state, action) => {
      state.userState = {
        user: action.payload.data,
        isLoading: false,
        isLoggedIn: true,
        error: [],
      };
    },
    [updateProfilePicture.rejected.type]: (state, action) => {
      console.log(`failed ${action}`);
      state.userState = {
        isLoading: false,
        user: {},
        error: ['Update profile picture was unsuccessful'],
      };
    },
  },
});

export default userSlice;
