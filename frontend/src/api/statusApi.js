import axios from "axios";

// const API_URL = "https://localhost:8000/api/status";
const API_URL = 'https://shirui-li-project3-backend.onrender.com/api/status';

export const fetchStatuses = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching statuses:", error);
    throw error;
  }
};

export const createStatus = async (userId, content, token) => {
  try {
    const response = await axios.post(
      `${API_URL}`,
      { user: userId, content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating status:", error.response?.data || error.message);
    throw error.response?.data || { error: "Error occurred while creating status." };
  }
};

export const updateStatus = async (statusId, content) => {
  try {
    const response = await axios.put(`${API_URL}/${statusId}`, { content });
    return response.data;
  } catch (error) {
    console.error("Error updating status:", error.response?.data || error.message);
    throw error.response?.data || { error: "Error occurred while updating status." };
  }
};

export const deleteStatus = async (statusId) => {
  try {
      const response = await axios.delete(`https://shirui-li-project3-backend.onrender.com/api/status/${statusId}`);
      return response.data;
  } catch (error) {
      console.error("Error deleting status:", error.response?.data || error.message);
      throw error.response?.data || { error: "Error occurred while deleting status." };
  }
};
