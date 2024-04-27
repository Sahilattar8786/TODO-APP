import { configureStore } from '@reduxjs/toolkit';
import { combineReducers,applyMiddleware } from 'redux'; 
import {thunk} from 'redux-thunk';
import {userLoginReducer,userRegisterReducer,userUpdateReducer} from "./reducer/userReducer";

const reducer =combineReducers({
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userUpdate:userUpdateReducer
})

const middleware=[thunk];
const userInfoFromStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem("userInfo")):null;
const initialState = {
  userLogin:{userInfo:userInfoFromStorage},
};

const store = configureStore({
    reducer ,initialState ,middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
})
