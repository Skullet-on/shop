import { $authHost, $host } from "./index";

export const registration = async (email, password) => {
  return await $host.post("/api/users/registration", {
    email,
    password,
    role: "USER",
  });
};

export const login = async (email, password) => {
  return $host.post("api/users/login", { email, password });
};

export const check = async () => {
  return await $authHost.get("/api/users/refresh");
};

export const logout = async () => {
  return $authHost.post("api/users/logout");
};
