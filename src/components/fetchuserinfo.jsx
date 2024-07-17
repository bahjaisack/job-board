import axios from 'axios';

/**
 * Fetch user information from the server.
 * @returns {Promise<Object>} The user information.
 * @throws Will throw an error if the request fails.
 */
const fetchUserInfo = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get('http://localhost:3001/account', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error.response || error.message || error);
    throw error.response ? error.response.data : error.message;
  }
};

export default fetchUserInfo;
