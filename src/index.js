import { fetchBreeds } from './js/cat-api';
import { fetchCatByBreed } from './js/cat-api';

const selectorEl = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
const catInfoEl = document.querySelector('.cat-info');

fetchBreeds(selectorEl);

selectorEl.addEventListener('input', choosingCatBreed);

function choosingCatBreed(evt) {
  loaderEl.classList.remove('is-hidden');
  catInfoEl.classList.add('is-hidden');
  fetchCatByBreed(evt.target.value);
}

export { catInfoEl };
export { selectorEl };
export { loaderEl };
export { errorEl };
