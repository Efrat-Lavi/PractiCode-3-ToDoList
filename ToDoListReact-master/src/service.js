
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;
console.log('API URL:', apiUrl);

const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json"
  }
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.message);
    return Promise.reject(error);
  }
);

export default {
  getTasks: async () => {
    const result = await apiClient.get('/');
    return result.data;
  },

  addTask: async (name) => {
    const result = await apiClient.post(`/${name}`);
    return result.data;
  },

  setCompleted: async (id, isComplete) => {
    const item = await apiClient.get(`/${id}`);
    item.data.isComplete = isComplete;
    const result = await apiClient.put(`/${id}`, item.data);
    return result.data;
  },

  deleteTask: async (id) => {
    const result = await apiClient.delete(`/${id}`);
    return result.data;
  }
};
