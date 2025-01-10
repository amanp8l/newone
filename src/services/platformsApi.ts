import axios from 'axios';

const API_BASE_URL = 'https://marketing-new.yellowpond-c706b9da.westus2.azurecontainerapps.io/api';

export const fetchConnectedAccounts = async (user_email: string, company_name: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/fetch_connected_accounts`, {
      user_email,
      company_name
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    return response.data.result || [];
  } catch (error: any) {
    console.error('Error fetching connected accounts:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch connected accounts');
  }
};

export const generateJwtToken = async (email: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate_jwt_token`, {
      email
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.data || !response.data.url) {
      throw new Error('Invalid response from server');
    }

    return response.data;
  } catch (error: any) {
    console.error('Error generating JWT token:', error);
    throw new Error(error.response?.data?.message || 'Failed to generate token');
  }
};