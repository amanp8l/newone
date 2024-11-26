import axios from 'axios';

const API_BASE_URL = 'https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io';

export const generatePlatformContent = async (platform: string, rawContent: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/${platform}_post_raw`, {
      raw_content: rawContent
    });
    return response.data;
  } catch (error) {
    console.error(`Error generating ${platform} content:`, error);
    throw error;
  }
};