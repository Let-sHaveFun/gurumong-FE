import axios, { type CreateAxiosDefaults } from 'axios';

export const API_BASE_URL = 'http://ab71b0d8eb7dc4f14889dc9728282e0b-1291913263.ap-northeast-2.elb.amazonaws.com/api';
// import.meta.env.VITE_BASE_URL;

const baseConfig: CreateAxiosDefaults = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

export const apiClient = axios.create(baseConfig);
