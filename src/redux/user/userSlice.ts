import { contactApi } from '@/services/contact';
import { Contact } from '@/services/contact/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  isDoingTest: boolean;
};

type UserState = {
  user: User | null;
  contact: Contact | null;
};

const initialState: UserState = {
  user: null,
  contact: null,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: initialState,
  reducers: {
    // ? Logout the user by returning the initial state
    logout: () => initialState,
    // Save the user's info
    setUser: (state, action: PayloadAction<UserState['user']>) => {
      state.user = action.payload;
    },
    // save selected contact to be edited later
    setContact: (state, action: PayloadAction<UserState['contact']>) => {
      state.contact = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      contactApi.endpoints.getContacts.matchFulfilled,
      (state, _action) => {
        state.user = {
          isDoingTest: true,
        };
      },
    );
  },
});

const { actions, reducer } = userSlice;
export const { logout, setUser, setContact } = actions;
export default reducer;
