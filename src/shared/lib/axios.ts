import axios, { type CreateAxiosDefaults } from 'axios';

export const API_BASE_URL = 'https://dormung.goorm.training/api';
// import.meta.env.VITE_BASE_URL;

const baseConfig: CreateAxiosDefaults = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

export const apiClient = axios.create(baseConfig);
