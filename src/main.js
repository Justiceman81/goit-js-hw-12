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
let searchQuery = null;

export const refs = {
  formEl: document.querySelector('.form-el'),
  inputEl: document.querySelector('.input-search'),
  imgGallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loadMore: document.querySelector('.btn-load-more'),
};

refs.formEl.addEventListener('submit', async event => {
  event.preventDefault();
  refs.imgGallery.innerHTML = '';
  showLoader();
  hideLoadMore();
  page = 1;
  searchQuery = event.currentTarget.elements['search'].value.trim();
  try {
    const res = await searchImg(searchQuery, page);
    if (res.total > 0);
    {
      iziToast.success({
        position: 'topRight',
        message: `We find ${res.total} photos`,
      });
    }
    if (res.total.length === 0) {
      iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    }
    refs.imgGallery.innerHTML = createElements(res);
    if (res.total > 12) {
      showLoadMore();
    }
  } catch (error) {
    console.log(error);
  } finally {
    event.target.reset();
    hideLoader();
  }
});

refs.loadMore.addEventListener('click', async () => {
  page++;
  showLoadMore();
  try {
    const res = await searchImg(searchQuery, page);
    refs.imgGallery.insertAdjacentHTML('beforeend', createElements(res));
    // function scroll
    const { height: cardHeight } = document
      .querySelector('.img-list')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
    //
    const lastPage = Math.ceil(res.total / 15);
    if (page === lastPage) {
      hideLoadMore();
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
});
