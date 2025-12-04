import axios from "axios";

const API = process.env.REACT_APP_API_URL;

// Register
export const registerUser = async (data) => {
  return await axios.post(`${API}/api/auth/register`, data);
};

// Login
export const loginUser = async (data) => {
  return await axios.post(`${API}/api/auth/login`, data);
};
