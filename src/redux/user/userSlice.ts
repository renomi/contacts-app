import { contactApi } from '@/services/contact';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  isDoingTest: boolean;
};

type UserState = {
  user: User | null;
};

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: initialState,
  reducers: {
    // ? Logout the user by returning the initial state
    logout: () => initialState,
    // Save the user's info
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
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
export const { logout, setUser } = actions;
export default reducer;
