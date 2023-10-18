import { fetchBreeds, fetchCatByBreed } from './cats-api';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const selector = document.querySelector('.breed-select');
const load = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInformation = document.querySelector('.cat-info');

load.classList.add('is-hidden');
error.classList.add('is-hidden');

function getPetsList(breed) {
  selector.innerHTML = breed
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('\n');
}
fetchBreeds()
  .then(result => {
    getPetsList(result);
  })
  .then(() => new SlimSelect({ select: `.breed-select` }))
  .catch(() => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!',
      { timeout: 4000, userIcon: false }
    );
  });

selector.addEventListener('change', onSelect);
function onSelect(evt) {
  catInformation.classList.add('is-hidden');
  load.classList.add('is-hidden');
  const selectBreedId = evt.currentTarget.value;

  fetchCatByBreed(selectBreedId)
    .then(data => {
      markup(data);
      catInformation.classList.toggle('is-hidden');
      load.classList.add('is-hidden');
    })
    .catch(() => {
      catInformation.classList.toggle('is-hidden');
      load.classList.add('is-hidden');
      Notiflix.Notify.failure(
        `Oops! Something went wrong! Try reloading the page!`,
        { timeout: 4000, userIcon: false }
      );
    });
}
function markup(data) {
  const { breeds, url } = data[0];
  const { name, temperament, description } = breeds[0];
  const catList = `<img src="${url}" alt="${name}" width=500>
  <div>
<h2 class="title">${name}</h2>
<p class="text">${description}</p>
<p class="text span-text"><span class="span">Temperament:</span> ${temperament}</p>
</div>`;
  catInformation.innerHTML = catList;
}
