import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_its2MIYBDJ2UdM1DaFX4x9mCrCfAoMF7BKs8ACR9TbSAnQGGZ5VJSQiKKBFzhTiW';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return axios.get('/breeds').then(response => {
    return response.data;
  });
}

function fetchCatByBreed(breedId) {
  return axios.get(`/images/search?breed_ids=${breedId}`).then(resp => {
    return resp.data;
  });
}

module.exports = { fetchBreeds, fetchCatByBreed };
