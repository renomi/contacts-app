import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import userReducer from './user/userSlice';
import { reduxStorage } from '@/redux/storage';

const persistUserConfig = {
  key: 'rtk:user',
  storage: reduxStorage,
};

const persistedUserReducer = persistReducer(persistUserConfig, userReducer);

const rootReducer = combineReducers({
  userState: persistedUserReducer,
});

export default rootReducer;
