import axios from "axios";

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

const errorInterceptor = async (error) => {
  const originalRequest = error.config;

  if (error.response.status === 401) {
    try {
      const response = await $authHost.get("api/users/refresh");
      localStorage.setItem("token", response.data.accessToken);

      return $authHost.request(originalRequest);
    } catch (error) {
      console.log("НЕ АВТОРИЗОВАН");
    }
  }
  return error.response;
};

$authHost.interceptors.request.use(authInterceptor);

$authHost.interceptors.response.use(authInterceptor, errorInterceptor);

export { $host, $authHost };
