import axios from "axios";
import API_URL from "../../../config";


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
