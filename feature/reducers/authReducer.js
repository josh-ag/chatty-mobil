import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const Authenticate = createAsyncThunk('/auth', async (_, thunkAPI) => {
  try {
    const response = await AsyncStorage.getItem('@auth_token');
    const loginId = await AsyncStorage.getItem('@loginId');
    if (response) {
      return {
        isAuthenticated: true,
        loginId: loginId,
      };
    } else {
      await AsyncStorage.removeItem('@auth_token');
      return {isAuthenticated: false};
    }
  } catch (error) {
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
  extraReducers: builder => {
    builder
      .addCase(Authenticate.pending, state => {
        state.isLoading = true;
      })
      .addCase(Authenticate.fulfilled, (state, action) => {
        console.log('Login Payload: ', action.payload);
        state.isLoading = false;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.loginId = action.payload.loginId;
      })
      .addCase(Authenticate.rejected, state => {
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      //logout
      .addCase(logOut.pending, state => {
        //do something
        state.isLoading = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.loginId = null;
      })
      .addCase(logOut.rejected, state => {
        state.isLoading = false;
        //do other things
      });
  },
});

// export const {reset} = authSlice.actions;
export default authSlice.reducer;
