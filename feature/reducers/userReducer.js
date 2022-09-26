import {createSlice} from '@reduxjs/toolkit';

/*
*
//initial state userSlice
*
*/
const initialState = {
  user: {
    firstName: null,
    lastName: null,
    userName: null,
    email: null,
    password: null,
  },
  login: {email: null, password: null},

  newPassword: {
    password: null,
    repeatPassword: null,
  },
};

export const userReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.user = action.payload;
    },
    loginUser: (state, action) => {
      state.login = action.payload;
    },
  },
  createNewPassword: (state, action) => {
    state.newPassword = action.payload;
  },
});

export const {registerUser} = userReducer.actions;
export default userReducer.reducer;
