import axios from "axios";

const API_URL = "http://172.16.5.74:3000";

export const businessList = async (token: string | null) => {
  try {
    const response = await axios.get(`${API_URL}/business/list`, {
      headers: {
        Authorization: `bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : { message: "Login failed" };
  }
};
