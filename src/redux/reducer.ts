import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';

const rootReducer = combineReducers({
  userState: userReducer,
});

export default rootReducer;
