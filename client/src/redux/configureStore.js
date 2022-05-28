import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import {combineReducers} from "redux"; 

import userSlice from './userState';

const persistConfig = {
  key: 'root',
  storage
};

const reducers = combineReducers({
  user: userSlice.reducer
 });

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export default store;