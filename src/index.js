import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;


const refs = {
    input: document.getElementById('search-box'),
    div: document.querySelector('.country-info'),
    list: document.querySelector('.country-list'),
};


refs.input.addEventListener('input', debounce(getValueInput, DEBOUNCE_DELAY));


function getValueInput(even) {
    
    const valueInput = even.target.value.trim();
    console.log(valueInput);
    clearMarkup();
    if (valueInput) {
        fetchCountries(valueInput).then(makeMarkup).catch(onFetchError);
    }

}



function makeMarkup(countries) {
    if (countries.length === 1) {
        createItemCountry(countries)
    }

    else if (countries.length >= 2 && countries.length <= 10) {
        createListCountries(countries);
    }
    else {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
}



function createItemCountry(countries) {
    const itemCountry = countries
    .map(({ name, capital, population, flags, languages }) => {
        const listLanguages = Object.values(languages).join(", ");
        return `<div class="item-country">
        <img src="${flags.svg}" alt="${name}" width="50" height="40">
        <h2 class="item-country-title">${name.official}</h2></div>
        <p><b>Capital:</b> ${capital}</p>
        <p><b>Population:</b> ${population}</p>
        <p><b>Languages:</b> ${listLanguages}</p>
        `;
    }).join('');
    refs.div.innerHTML = itemCountry;
}


function createListCountries(countries) {
    const listCountries = countries.map(({ name, flags }) => {
        return `<li class="li-countries"><img src="${flags.svg}" alt="${name}" width="50" height="40"><h3>${name.official}</h3></li>`;
    }).join('')
    
    refs.list.innerHTML = listCountries;
}



function clearMarkup() {
    refs.div.innerHTML = "";
    refs.list.innerHTML = "";

}

function onFetchError(error) {
  console.error(error);
  Notiflix.Notify.failure('Oops, there is no country with that name');
}