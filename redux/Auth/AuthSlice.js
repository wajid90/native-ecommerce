import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authService } from "./AuthService";
import { Alert } from "react-native";

const getUserfromLocalStorage = async () => {
  const customerData = await AsyncStorage.getItem("customer");
  return customerData ? JSON.parse(customerData) : null;
};

const tokenfromLocalStorage = async () => {
  const tokenData = await AsyncStorage.getItem("token");
  return tokenData ? JSON.parse(tokenData) : null;
};

const initialState = {
  customer: ()=>getUserfromLocalStorage(),
  orders: [],
  isError: false,
  isSuccess: false,
  isLoadding: false,
  message: "",
  token: ()=>tokenfromLocalStorage(),
};
export const resetState = createAction("Reset_all");

export const AuthLogin = createAsyncThunk(
  "customer/login",
  async (user, thunkAPI) => {
    try {
      return await authService.loginUser({ user });
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const AuthRegister = createAsyncThunk(
  "customer/register",
  async (user, thunkAPI) => {
    console.log(user);
    try {
      return await authService.register(user);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const profileData = createAsyncThunk(
  "customer/profile",
  async (thunkAPI) => {
    try {
      return await authService.userProfile();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const updateUserData = createAsyncThunk(
  "customer/update-customer",
  async (data, thunkAPI) => {
    try {
      return await authService.updateUser(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AuthLogin.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(AuthLogin.fulfilled, (state, action) => {
        state.isLoadding = false;
        state.isSuccess = true;
        state.customer = action.payload;
      })
      .addCase(AuthLogin.rejected, (state, action) => {
        state.isLoadding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.response?.data?.message;
        state.customer = null;
        if (state.isError) {
          Alert.alert(
            "Login Error",
            "All feild Are Required Please The Field Properly ...",
            [
              {
                text: "OK",
                onPress: () => {},
              },
            ]
          );
        }
      })
      .addCase(AuthRegister.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(AuthRegister.fulfilled, (state, action) => {
        state.isLoadding = false;
        state.isSuccess = true;
        state.registerUser = action.payload;
      })
      .addCase(AuthRegister.rejected, (state, action) => {
        state.isLoadding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.response?.data?.message;
        state.customer = null;
        if (state.isError) {
          Alert.alert(
            "Register Error",
            "All feild Are Required Please The Field Properly ...",
            [
              {
                text: "Ok",
                onPress: () => {},
              },
            ]
          );
        }
      })
      .addCase(updateUserData.pending, (state) => {
        state.isLoadding = true;
      })
      .addCase(updateUserData.fulfilled, async (state, action) => {
        state.isLoadding = false;
        state.isSuccess = true;
        state.updatedUser = action.payload;

        let currentuser = JSON.parse(await AsyncStorage.getItem("customer"));

        let newUserData = {
          _id: currentuser?._id,
          token: currentuser?.token,
          firstName: action?.payload?.firstName,
          lastName: action?.payload?.lastName,
          email: action?.payload?.email,
          mobile: action?.payload?.mobile,
        };
        await AsyncStorage.setItem("customer", JSON.stringify(newUserData));
        state.customer = newUserData;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.isLoadding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(resetState, () => initialState);
  },
});

export default authSlice.reducer;
