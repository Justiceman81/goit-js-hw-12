import axios from 'axios';

const API_KEY = '44348563-8832aea6e55efd6ddd80494f7';
const BASE_URL = 'https://pixabay.com/api/';

export const searchImg = async (query, page) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 15,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
