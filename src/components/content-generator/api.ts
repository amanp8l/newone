import axios from 'axios';

const API_BASE_URL = 'https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api';

export const generateCampaignObjective = async (company: string, product: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/campaign`, {
      company,
      product
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const generateTargetAudience = async (company: string, product: string, campaign: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/audience`, {
      company,
      product,
      campaign
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};