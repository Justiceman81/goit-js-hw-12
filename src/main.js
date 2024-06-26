import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

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
let lightbox = new SimpleLightbox('.gallery a');

export const refs = {
  formEl: document.querySelector('.form-el'),
  inputEl: document.querySelector('.input-search'),
  listEl: document.querySelector('.img-list'),
  imgGallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loadMore: document.querySelector('.btn-load-more'),
};
refs.formEl.addEventListener('submit', async e => {
  e.preventDefault();
  refs.imgGallery.innerHTML = '';
  showLoader();
  hideLoadMore();
  page = 1;
  searchQuery = e.currentTarget.elements['search'].value.trim();
  try {
    const res = await searchImg(searchQuery, page);
    if (res.totalHits > 0) {
      iziToast.success({
        position: 'topRight',
        message: `We found ${res.totalHits} photos`,
      });
    }
    if (res.hits.length === 0) {
      iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    }
    refs.imgGallery.innerHTML = createElements(res.hits);
    lightbox.refresh();
    if (res.totalHits > 15) {
      showLoadMore();
    }
  } catch (error) {
    console.log(error);
  } finally {
    e.target.reset();
    hideLoader();
  }
});

refs.loadMore.addEventListener('click', async () => {
  page++;
  showLoader();
  try {
    const res = await searchImg(searchQuery, page);
    const newElements = createElements(res.hits);
    refs.imgGallery.insertAdjacentHTML('beforeend', newElements);
    lightbox.refresh();

    const cardHeight = document
      .querySelector('.gallery')
      .lastElementChild.getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    const lastPage = Math.ceil(res.totalHits / 15);
    if (page >= lastPage) {
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
