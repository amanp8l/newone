import axios from 'axios';

const API_BASE_URL = 'https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
    
    // Include email in userData
    const userData = {
      email,
      company: response.data.company || '',
      logo: response.data.logo || null
    };

    return { ...response.data, userData };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const signup = async (email: string, password: string, company: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, {
      email,
      password,
      company,
    });

    // Include email and company in userData
    const userData = {
      email,
      company,
      logo: null
    };

    return { ...response.data, userData };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};