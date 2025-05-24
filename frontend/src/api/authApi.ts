import axios from "./axios/authInstance";

export const loginUserAPI = async (data: {
  mobile: string;
  password: string;
}) => {
  const response = await axios.post("/auth/login", data);
  return response;
};

export const logoutUserAPI = async () => {
  const response = axios.post("/auth/logout");
  return response;
};
