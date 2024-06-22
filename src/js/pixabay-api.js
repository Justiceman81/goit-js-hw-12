import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { createElements } from './render-functions.js';

export async function searchImg(img) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const options = new URLSearchParams({
    key: '44348563-8832aea6e55efd6ddd80494f7',
    q: `${img}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  const url = `${BASE_URL}${END_POINT}?${options}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Something went wrong: ${error.message}`,
    });
    throw error;
  }
}
