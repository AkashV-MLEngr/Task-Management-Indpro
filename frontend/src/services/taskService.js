import axios from "axios";
import { getAuthToken } from "./authService";

const API_URL = "http://localhost:5007/api/tasks";


export const fetchTaskProgress = async () => {
  const token = getAuthToken();
  const response = await axios.get(`${API_URL}/progress`, {
    headers: { Authorization:`Bearer ${token}` },
  });
  return response.data;
};


export const fetchTaskList = async () => {
  const token = getAuthToken();
  const response = await axios.get(`${API_URL}/show`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


export const addTask = async (taskData) => {
  const token = getAuthToken();
  const response = await axios.post(`${API_URL}/add`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


export const deleteTask = async (taskId) => {
  const token = getAuthToken();
  const response = await axios.delete(`${API_URL}/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


export const updateTask = async (taskId, taskData) => {
  const token = getAuthToken();
  const response = await axios.put(`${API_URL}/${taskId}`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


export const fetchTaskById = async (taskId) => {
  const token = getAuthToken();
  const response = await axios.get(`${API_URL}/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};