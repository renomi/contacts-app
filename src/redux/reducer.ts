import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import { reduxStorage } from '@/redux/storage';
import { contactApi } from '@/services/contact';

import userReducer from './user/userSlice';

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
