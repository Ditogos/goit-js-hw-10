import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_its2MIYBDJ2UdM1DaFX4x9mCrCfAoMF7BKs8ACR9TbSAnQGGZ5VJSQiKKBFzhTiW';

function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error.status);
    });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(resp => {
      return resp.data;
    })
    .catch(error => {
      console.error(error.status);
    });
}

module.exports = { fetchBreeds, fetchCatByBreed };
