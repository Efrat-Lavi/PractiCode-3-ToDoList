
import axios from 'axios';

//axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = "https://practicode-3-todolist-server.onrender.com"

console.log("AAA");
console.log(axios.defaults.baseURL);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.message);
    return Promise.reject(error);
  }
);
export default {
  getTasks: async () => {
    console.log('get tasks');
    
    const result = await fetch('https://github.com/ToDoList');
    const data = await result.json()
    console.log('data',data);
    return data;
    //return result.data;
  },

  addTask: async (name) => {
    const result = await axios.post(`/ToDoList/${name}`);
    return result.data;
  },

  setCompleted: async (id, isComplete) => {
    const item = await axios.get(`/ToDoList/${id}`);
    item.data.isComplete = isComplete;
    const result = await axios.put(`/ToDoList/${id}`, item.data);
    return result.data;
  },

  deleteTask: async (id) => {
    const result = await axios.delete(`/ToDoList/${id}`);
    return result.data;
  }
};
