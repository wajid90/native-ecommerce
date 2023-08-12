import axios from "axios";
import JwtIntercepter from "../../utils/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const loginUser = async ({ user }) => {
  const reponces = await axios.post(
    `http://192.168.212.23:5000/api/users/login`,
    user,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  if (reponces.data) {
    console.log(reponces.data);
    await AsyncStorage.setItem("customer", JSON.stringify(reponces.data));
    await AsyncStorage.setItem("token", JSON.stringify(reponces.data.token));
    return reponces.data;
  }
};

const userProfile = async () => {
  const reponces = await JwtIntercepter.get(`/api/users/profile`);
  if (reponces.data) {
    return reponces.data;
  }
};
const updateUser = async (data) => {
  const reponces = await JwtIntercepter.put(`/api/users/updateProfile`, data);
  if (reponces.data) {
    return reponces.data;
  }
};

const register = async (userData) => {
  console.log(userData);
  const reponces = await axios.post(
    `http://192.168.212.23:5000/api/users/register`,
    userData,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  if (reponces.data) {
    return reponces.data;
  }
};

export const authService = {
  loginUser,
  register,
  userProfile,
  updateUser,
};
