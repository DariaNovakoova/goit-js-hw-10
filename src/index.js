// Створи фронтенд частину застосунку для пошуку інформації про кота за його породою.

import SlimSelect from 'slim-select';
import '../node_modules/slim-select/dist/slimselect.css';
// import Notiflix from 'notiflix';
import axios from 'axios';
import { fetchBreeds } from './cat-api.js';
import { fetchCatByBreed } from './cat-api.js';

const API_KEY =
  'live_zhCyMsSmRiwMpNdRjSSbOUrCYPKJldDx3htluHl7JoJvwIdGjTlx2hlYQZjLkOtE';

axios.defaults.headers.common['x-api-key'] = API_KEY;

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

const { breedSelect, loader, error, catInfo } = refs;

// action with error
function showError() {
  error.style.display = 'block';
}
function hideError() {
  error.style.display = 'none';
}

// action with loader
function showLoader() {
  loader.style.display = 'block';
}
function hideLoader() {
  loader.style.display = 'none';
}

// action with murkup
function showCatInfo(cat) {
  const catDt = cat[0];
  const catInf = catDt.breeds[0];
  const catMarkup = `<div class="box-text-cat"><h2 class="cat-title">${catInf.name}</h2>
      <p class="cat-text">${catInf.description}</p><p class="cat-temper-text"><b>Temperament:</b> ${catInf.temperament}</p></div>
      <img class="img-cat" src="${catDt.url}" alt="${catInf.name}" width="500"/>`;
  catInfo.innerHTML = catMarkup;
  catInfo.style.display = 'block';
}
function hideCatInfo() {
  catInfo.style.display = 'none';
}

hideError();
showLoader();
hideCatInfo();

breedSelect.addEventListener('change', selectBreedCat);

function selectBreedCat(e) {
  const selectedBreedId = e.target.value;

  hideError();
  showLoader();
  hideCatInfo();

  fetchCatByBreed(selectedBreedId)
    .then(cat => {
      hideLoader();
      showCatInfo(cat);
    })
    .catch(() => {
      hideLoader();
      showError();
    });
}

const arrayBreedsId = [];

fetchBreeds()
  .then(data => {
    hideLoader();
    data.forEach(element => {
      arrayBreedsId.push({ text: element.name, value: element.id });
    });
    new SlimSelect({
      select: breedSelect,
      placeholder: 'Select a breed',
      data: arrayBreedsId,
    });
  })
  .catch(() => {
    hideLoader();
    showError();
  });
