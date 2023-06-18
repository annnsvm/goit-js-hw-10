const BASE_URL = 'https://api.thecatapi.com';
const API_KEY =
  'live_lPixJkDnUublkPEw1sG07f8BFxmQQbfe4opNZfER2yHMYmY4RTEXEKcsuV1kqKBm';

import { catInfoEl } from '..';
import { loaderEl } from '..';
import { errorEl } from '..';
import { selectorEl } from '..';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function fetchBreeds(selectList) {
  return fetch(`${BASE_URL}/v1/breeds`)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }

      return res.json();
    })
    .then(data => {
      loaderEl.classList.add('is-hidden');
      errorEl.classList.add('is-hidden');
      selectorEl.classList.remove('is-hidden');
      const listId = data
        .map(el => `<option value="${el.id}">${el.name}</option>`)
        .join('');
      selectList.insertAdjacentHTML('beforeend', listId);
    })
    .catch(error => {
      loaderEl.classList.add('is-hidden');
      selectorEl.classList.add('is-hidden');
      Notify.failure('Ooops , something went wrong...');
    });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `${BASE_URL}/v1/images/search?limit=1&breed_ids=${breedId}&api_key=${API_KEY}`
  )
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .then(data => {
      loaderEl.classList.add('is-hidden');
      catInfoEl.classList.remove('is-hidden');
      return data;
    })
    .then(img => {
      const catImg = `
    <div class="cat-container"> <img src="${img[0].url}" alt="${img[0].breeds[0].name}">
    <div class="cat-info-js"><h2>${img[0].breeds[0].name}</h2><p>${img[0].breeds[0].description}</p><p><span class="temperament">Temperament:</span> ${img[0].breeds[0].temperament}</p></div></div>`;
      return (catInfoEl.innerHTML = catImg);
    })
    .catch(error => {
      Notify.failure('Ooops , something went wrong...');
    });
}
