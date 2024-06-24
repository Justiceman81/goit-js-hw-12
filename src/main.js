import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { searchImg } from './js/pixabay-api.js';
import {
  createElements,
  showLoader,
  hideLoader,
  showLoadMore,
  hideLoadMore,
} from './js/render-functions.js';

let page = 1;
let searchQuery = '';

export const refs = {
  formEl: document.querySelector('.form-el'),
  inputEl: document.querySelector('.input-search'),
  imgGallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loadMore: document.querySelector('.btn-load-more'),
};

// refs.formEl.addEventListener('submit', async e => {
//   e.preventDefault();
//   refs.imgGallery.innerHTML = '';
//   showLoader();
//   hideLoadMore();
//   page = 1;
//   // searchQuery = e.currentTarget.search.value.trim();

//   const value = e.currentTarget.search.value.trim();

//   if (!value) {
//     iziToast.error({
//       message: 'Info Search input must be filled!',
//     });
//     return;
//   }

//   try {
//     const data = await searchImg(value);
//     if (data.total > 0) {
//       iziToast.success({
//         position: 'topRight',
//         message: `We find ${data.total} photos`,
//       });
//     }
//     if (data.length === 0) {
//       iziToast.error({
//         position: 'topRight',
//         message:
//           'Sorry, there are no images matching your search query. Please try again!',
//       });
//     } else {
//       createElements(data);
//     }
//     imgGallery.innerHTML = createElements(data);
//     if (data.total > 15) {
//       showLoadMore();
//     }
//   } catch (error) {
//     iziToast.error({
//       title: 'Sorry,',
//       message:
//         'there are no images matching your search query. Please try again!',
//       color: 'red',
//     });
//   } finally {
//     hideLoader();
//     refs.formEl.reset();
//   }
// });

// const perPage = 15;

// refs.formEl.addEventListener('submit', async e => {
//   e.preventDefault();
//   refs.imgGallery.innerHTML = '';
//   showLoader();
//   hideLoadMore();
//   page = 1; // Reset page for a new search
//   const value = e.currentTarget.search.value.trim();

//   if (!value) {
//     iziToast.error({
//       message: 'Поле пошуку повинно бути заповнене!',
//       position: 'topRight',
//     });
//     hideLoader();
//     return;
//   }

//   await searchImg();
// });

// refs.loadMore.addEventListener('click', async () => {
//   page += 1;
//   await searchImg();
// });

// const fetchImg = async () => {
//   try {
//     const response = await axios.get('https://pixabay.com/api/', {
//       params: {
//         key: 'YOUR_API_KEY',
//         q: searchQuery,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//         page: page,
//         per_page: perPage,
//       },
//     });

//     const data = response.data;

//     if (data.hits.length === 0 && page === 1) {
//       iziToast.error({
//         position: 'topRight',
//         message:
//           'Вибачте, немає зображень, що відповідають вашому запиту. Спробуйте ще раз!',
//       });
//     } else {
//       createElements(data.hits);
//       if (data.hits.length === perPage) {
//         showLoadMore();
//       } else {
//         hideLoadMore();
//       }
//     }
//   } catch (error) {
//     iziToast.error({
//       title: 'Вибачте,',
//       message:
//         'Немає зображень, що відповідають вашому запиту. Спробуйте ще раз!',
//       color: 'red',
//       position: 'topRight',
//     });
//   } finally {
//     hideLoader();
//     refs.formEl.reset();
//   }
// };
// refs.loadMore.addEventListener('click', async () => {
//   page++;
//   showLoader();
//   try {
//     const res = await searchImg(query, page);
//     console.log(query);
//     refs.imgGallery.insertAdjacentHTML('beforeend', createElements(data));
//     // function scroll
//     const { height: cardHeight } = document
//       .querySelector('.gallery')
//       .firstElementChild.getBoundingClientRect();

//     window.scrollBy({
//       top: cardHeight * 2,
//       behavior: 'smooth',
//     });
//     //
//     const lastPage = Math.ceil(res.data.total / 12);
//     if (page === lastPage) {
//       hideLoadMore();
//       iziToast.info({
//         position: 'topRight',
//         message: "We're sorry, but you've reached the end of search results.",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   } finally {
//     hideLoader();
//   }
// });

refs.formEl.addEventListener('submit', async e => {
  e.preventDefault();
  refs.imgGallery.innerHTML = '';
  showLoader();
  hideLoadMore();
  page = 1; // Reset page for a new search
  searchQuery = e.currentTarget.search.value.trim();

  if (!searchQuery) {
    iziToast.error({
      message: 'Поле пошуку повинно бути заповнене!',
      position: 'topRight',
    });
    hideLoader();
    return;
  }

  await fetchImages();
});

refs.loadMore.addEventListener('click', async () => {
  page += 1;
  await fetchImages();
});

const fetchImages = async () => {
  try {
    const data = await searchImg(searchQuery, page);

    if (data.hits.length === 0 && page === 1) {
      iziToast.error({
        position: 'topRight',
        message:
          'Вибачте, немає зображень, що відповідають вашому запиту. Спробуйте ще раз!',
      });
    } else {
      createElements(data.hits);
      if (data.hits.length === 15) {
        showLoadMore();
      } else {
        hideLoadMore();
      }
      smoothScroll();
    }
  } catch (error) {
    iziToast.error({
      title: 'Вибачте,',
      message:
        'Немає зображень, що відповідають вашому запиту. Спробуйте ще раз!',
      color: 'red',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    if (page === 1) refs.formEl.reset();
  }
};

const smoothScroll = () => {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};
