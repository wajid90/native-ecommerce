import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

axios.defaults.baseURL = "http://192.168.212.23:5000/";
// axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    const tokenData = JSON.parse(token);
    if (tokenData !== null) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${tokenData}`,
        withCredentials: true,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const prevRequest = error?.config;

    if (
      error.response.status === 401 &&
      prevRequest.url === "http://192.168.212.23:5000/api/users/refresh"
    ) {
      AsyncStorage.clear();
      return Promise.reject(error);
    }

    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const tokenData = await AsyncStorage.getItem("token");
      await axios
        .get("http://192.168.212.23:5000/api/users/refresh", {
          headers: {
            Authorization: `Bearer ${JSON.parse(tokenData)}`,
          },
          withCredentials: true,
        })
        .then(async (data) => {
          console.log(data);
          if (data?.status === 200) {
            await AsyncStorage.setItem(
              "token",
              JSON.stringify(data?.data?.acessToken)
            );
            axios.headers[
              "Authorization"
            ] = `Bearer ${data?.data?.acessToken} `;
          }
        })
        .catch((error) => {
          return Promise.reject(error);
        });
      return axios(prevRequest);
    }
    return Promise.reject(error);
  }
);

const JwtIntercepter = axios;

export default JwtIntercepter;
