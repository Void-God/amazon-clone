import axios from "axios";
import API_URL from "../../../config";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : { message: "Login failed" };
  }
};

export const signupUser = async (name:string, email: string, password: string, phoneNumber: number) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, { name, email, password, phoneNumber });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : { message: "Login failed" };
  }
};


export const profile = async (token: string | null) => {
  try {
    const response = await axios.get(`${API_URL}/auth/profile`, {
      headers: {
        Authorization: `bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : { message: "Login failed" };
  }
};
