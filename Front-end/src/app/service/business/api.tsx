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
export const addBusinessApi = async (token: string, data: any) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register-business`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Adding business failed" };
  }
};


export const deleteBusinessApi = async (token: string, businessId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/business/${businessId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Deleting business failed" };
  }
};