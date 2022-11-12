import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const Authenticate = createAsyncThunk('/auth', async (_, thunkAPI) => {
  try {
    // await AsyncStorage.clear();
    const response = await AsyncStorage.getItem('@auth_token');
    if (response) {
      return {
        isAuthenticated: true,
      };
    } else {
      await AsyncStorage.removeItem('@auth_token');
      return {isAuthenticated: false};
    }
  } catch (error) {
    // await AsyncStorage.clear();
    const message = error;
    console.log('ErrorGettingAuthToken: ', message);

    return thunkAPI.rejectWithValue(message);
  }
});

export const logOut = createAsyncThunk('/auth/logout', async (_, thunkAPI) => {
  try {
    const response = await AsyncStorage.clear();
    return JSON.parse(response);
  } catch (error) {
    //do something if "error"
  }
});

/*
*
//initial state userSlice
*
*/
const initialState = {
  isLoading: true,
  isAuthenticated: false,
  loginId: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // reducers: {
  //   reset: state => {
  //     state.Authenticate = false;
  //     state.loginId = null;
  //   },
  // },
  extraReducers: builder => {
    builder
      .addCase(Authenticate.pending, state => {
        state.isLoading = true;
      })
      .addCase(Authenticate.fulfilled, (state, action) => {
        console.log('Login Payload: ', action.payload);
        state.isLoading = false;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.loginId = null;
      })
      .addCase(Authenticate.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.loginId = null;
      })
      //logout
      .addCase(logOut.pending, state => {
        //do something
        state.isLoading = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.isLoading = false;
        state.loginId = null;
        state.isAuthenticated = false;
      })
      .addCase(logOut.rejected, state => {
        state.isLoading = false;
        //do other things
      });
  },
});

// export const {reset} = authSlice.actions;
export default authSlice.reducer;
