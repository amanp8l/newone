import axios from 'axios';

const API_BASE_URL = 'https://marketing-new.yellowpond-c706b9da.westus2.azurecontainerapps.io/api';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    if (!response.data) {
      throw new Error('Invalid response from server');
    }

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
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.data) {
      throw new Error('Invalid response from server');
    }

    // Create user profile after successful signup
    await createUserProfile(email, company);

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

export const createUserProfile = async (user_email: string, company_name: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create_user_profile`, {
      user_email,
      company_name
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.data) {
      throw new Error('Failed to create user profile');
    }

    return response.data;
  } catch (error: any) {
    console.error('Error creating user profile:', error);
    throw new Error(error.response?.data?.message || 'Failed to create user profile');
  }
};