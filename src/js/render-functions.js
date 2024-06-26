import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from '../main.js';

const lightbox = new SimpleLightbox('.gallery a');

export function createElements(values) {
  return values
    .map(value => {
      return `<li class="list-el">
                <a href="${value.largeImageURL}"><img src='${value.webformatURL}' alt='${value.tags}'></a>
                <div class="content">
                    <div class="item"><h3>Likes</h3><p>${value.likes}</p></div>
                    <div class="item"><h3>Views</h3><p>${value.views}</p></div>
                    <div class="item"><h3>Comments</h3><p>${value.comments}</p></div>
                    <div class="item"><h3>Downloads</h3><p>${value.downloads}</p></div>
                </div>
            </li>`;
    })
    .join('');
}
export function showLoader() {
  refs.loader.classList.remove('hidden');
}
export function hideLoader() {
  refs.loader.classList.add('hidden');
}
export function showLoadMore() {
  refs.loadMore.classList.remove('hidden');
}
export function hideLoadMore() {
  refs.loadMore.classList.add('hidden');
}
