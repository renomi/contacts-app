import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import userReducer from './user/userSlice';
import { reduxStorage } from '@/redux/storage';
import { contactApi } from '@/services/contact';

const persistUserConfig = {
  key: 'rtk:user',
  storage: reduxStorage,
};

const persistedUserReducer = persistReducer(persistUserConfig, userReducer);

const rootReducer = combineReducers({
  userState: persistedUserReducer,
  [contactApi.reducerPath]: contactApi.reducer,
});

export default rootReducer;
