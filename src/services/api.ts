import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'https://kimchi-new.yellowpond-c706b9da.westus2.azurecontainerapps.io/api';
const POLLING_INTERVAL = 19 * 60 * 1000; // 19 minutes in milliseconds
let pollingInterval: NodeJS.Timeout | null = null;

// Store refresh token in memory (consider more secure storage in production)
let currentRefreshToken: string | null = null;

const pollRefreshToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/refresh_token?refresh_token=${encodeURIComponent(refreshToken)}`
    );
    
    if (response.data && response.data.access_token) {
      // Save JWT token to cookies
      Cookies.set('jwt_token', response.data.access_token);
      return response.data.access_token;
    }
    throw new Error('Failed to get new JWT token from polling');
  } catch (error) {
    console.error('Error polling refresh token:', error);
    throw error;
  }
};

const startTokenPolling = (refreshToken: string) => {
  // Clear any existing polling interval
  if (pollingInterval) {
    clearInterval(pollingInterval);
  }

  // Store refresh token
  currentRefreshToken = refreshToken;

  // Initial poll to get first JWT token
  pollRefreshToken(refreshToken).catch(error => {
    console.error('Initial token poll failed:', error);
    stopTokenPolling();
    logout();
  });

  // Set up polling
  pollingInterval = setInterval(async () => {
    try {
      if (currentRefreshToken) {
        await pollRefreshToken(currentRefreshToken);
        console.log('JWT token updated successfully via polling');
      }
    } catch (error) {
      console.error('Failed to poll for new JWT token:', error);
      // Handle polling failure (e.g., force logout if refresh fails)
      stopTokenPolling();
      logout();
    }
  }, POLLING_INTERVAL);
};

const stopTokenPolling = () => {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
  currentRefreshToken = null;
};

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

    // Get initial JWT token and start polling
    const jwtToken = await pollRefreshToken(response.data.refresh_token);
    startTokenPolling(response.data.refresh_token);

    // Include email in userData
    const userData = {
      email: response.data.user_email,
      company: response.data.company || '',
      logo: response.data.logo || null
    };

    return { ...response.data, userData, jwt_token: jwtToken };
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

    // Get initial JWT token and start polling
    const jwtToken = await pollRefreshToken(response.data.refresh_token);
    startTokenPolling(response.data.refresh_token);

    // Create user profile after successful signup
    await createUserProfile(email, company);

    // Include email and company in userData
    const userData = {
      email: response.data.user_email,
      company,
      logo: null
    };

    return { ...response.data, userData, jwt_token: jwtToken };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};

export const logout = () => {
  // Stop the token polling
  stopTokenPolling();
  // Remove JWT token from cookies on logout
  Cookies.remove('jwt_token');
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