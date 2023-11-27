import axios from 'axios';

const API_KEY =
  'live_zhCyMsSmRiwMpNdRjSSbOUrCYPKJldDx3htluHl7JoJvwIdGjTlx2hlYQZjLkOtE';

axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}
