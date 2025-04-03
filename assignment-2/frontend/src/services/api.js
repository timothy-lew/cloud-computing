// src/services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchGithubCode = async (query) => {
  try {
    const response = await apiClient.get(
      `/github/code?query=${encodeURIComponent(query)}`
    );
    return response.data;
  } catch (error) {
    console.error('Error searching GitHub code:', error);
    throw error;
  }
};

export const searchGithubRepo = async (query) => {
  try {
    const response = await apiClient.get(
      `/github/repo?query=${encodeURIComponent(query)}`
    );
    return response.data;
  } catch (error) {
    console.error('Error searching GitHub repositories:', error);
    throw error;
  }
};

export default apiClient;
