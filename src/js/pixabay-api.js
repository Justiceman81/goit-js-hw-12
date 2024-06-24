// import axios from 'axios';
// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';

// export async function searchImg(query, page) {
//   const BASE_URL = 'https://pixabay.com';
//   const END_POINT = '/api/';
//   const options = new URLSearchParams({
//     key: '44348563-8832aea6e55efd6ddd80494f7',
//     q: `${query}`,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     page,
//     per_page: 15,
//     safesearch: true,
//   });
//   const url = `${BASE_URL}${END_POINT}?${options}`;

//   try {
//     const res = await axios.get(url);
//     return res.data;
//   } catch (error) {
//     iziToast.error({
//       title: 'Error',
//       message: `Something went wrong: ${error.message}`,
//     });
//     throw error;
//   }
// }
import axios from 'axios';

const API_KEY = '44348563-8832aea6e55efd6ddd80494f7';
const BASE_URL = 'https://pixabay.com/api/';

export const searchImg = async (query, page, perPage) => {
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
    console.error(error);
    throw error;
  }
};
