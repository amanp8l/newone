import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'https://kimchi-new.yellowpond-c706b9da.westus2.azurecontainerapps.io/api';
const ACCESS_TOKEN_EXPIRY = 5 * 60 * 1000; // 19 minutes in milliseconds
let refreshTimeout: NodeJS.Timeout | null = null;

// Cookie names and options
const COOKIE_CONFIG = {
  ACCESS_TOKEN: 'jwt_token',
  REFRESH_TOKEN: 'refresh_token',
  options: {
    secure: true,
    sameSite: 'strict' as const,
    expires: 365 // days
  }
};

// Function to handle token refresh
const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = Cookies.get(COOKIE_CONFIG.REFRESH_TOKEN);
  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}/refresh_token?refresh_token=${refreshToken}`,
      {}, // Empty body as required by the API
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    if (response.data?.access_token) {
      Cookies.set(COOKIE_CONFIG.ACCESS_TOKEN, response.data.access_token, COOKIE_CONFIG.options);
      return response.data.access_token;
    }
    throw new Error('Invalid response from refresh token endpoint');
  } catch (error) {
    Cookies.remove(COOKIE_CONFIG.ACCESS_TOKEN);
    Cookies.remove(COOKIE_CONFIG.REFRESH_TOKEN);
    throw error;
  }
};

// Setup automatic token refresh
const setupTokenRefresh = () => {
  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
  }

  refreshTimeout = setTimeout(async () => {
    try {
      await refreshAccessToken();
      setupTokenRefresh(); // Setup next refresh
    } catch (error) {
      console.error('Failed to refresh token:', error);
      logout(); // Force logout on refresh failure
    }
  }, ACCESS_TOKEN_EXPIRY);
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/login`,
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    if (!response.data) {
      throw new Error('Invalid response from server');
    }

    // Store tokens
    Cookies.set(COOKIE_CONFIG.ACCESS_TOKEN, response.data.access_token, COOKIE_CONFIG.options);
    Cookies.set(COOKIE_CONFIG.REFRESH_TOKEN, response.data.refresh_token, COOKIE_CONFIG.options);

    // Setup automatic token refresh
    setupTokenRefresh();

    // Prepare user data
    const userData = {
      email: response.data.user_email,
      company: response.data.company || '',
      logo: response.data.logo || null
    };

    return {
      ...response.data,
      userData,
      jwt_token: response.data.access_token
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const signup = async (email: string, password: string, company: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/signup`,
      { email, password, company },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    if (!response.data) {
      throw new Error('Invalid response from server');
    }

    // Store tokens
    Cookies.set(COOKIE_CONFIG.ACCESS_TOKEN, response.data.access_token, COOKIE_CONFIG.options);
    Cookies.set(COOKIE_CONFIG.REFRESH_TOKEN, response.data.refresh_token, COOKIE_CONFIG.options);

    // Setup automatic token refresh
    setupTokenRefresh();

    // Prepare user data
    const userData = {
      email: response.data.user_email,
      company,
      logo: null
    };

    return {
      ...response.data,
      userData,
      jwt_token: response.data.access_token
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};

export const logout = () => {
  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
    refreshTimeout = null;
  }
  Cookies.remove(COOKIE_CONFIG.ACCESS_TOKEN);
  Cookies.remove(COOKIE_CONFIG.REFRESH_TOKEN);
};

// Helper function to get current access token (for other files)
export const getAccessToken = (): string => {
  const token = Cookies.get(COOKIE_CONFIG.ACCESS_TOKEN);
  if (!token) {
    throw new Error('No JWT token found');
  }
  return token;
};