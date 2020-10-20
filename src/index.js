// const app = document.querySelector('#root');
/* eslint-disable no-console */
import axios from 'axios';
import './styles/main.scss';
import githubLogo from './assets/GitHub_Logo.png';

const githubhandler = document.querySelector('footer img');
const mainElement = document.querySelector('main');
const searchBtn = document.querySelector('#search-btn');
const searchInput = document.querySelector('#search-input');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');

githubhandler.setAttribute('src', githubLogo);

const baseUrl = 'https://api.unsplash.com/search/photos';
const API_KEY = 'yX30oA4euofvCkZShYflX41XXG__CP6oiTaZ7AFa19w';
let search = '';
let page = 1;
const maxItems = 10;

const getImages = endpoint => axios.get(endpoint)
  .then(({ data }) => {
    console.log(data);
    const { results } = data;
    results.forEach(({ urls: images }) => {
      mainElement.innerHTML += `<img src=${images.small}>`;
    });
  })
  .catch(error => {
    console.log(error);
  });

if (page <= 1) prevBtn.setAttribute('disabled', 'disabled');

searchBtn.addEventListener('click', e => {
  e.preventDefault();
  page = 1;
  search = searchInput.value;
  const endpoint = `${baseUrl}?per_page=${maxItems}&page=${page}&query=${search}&client_id=${API_KEY}`;
  mainElement.innerHTML = '';
  if (search) getImages(endpoint);
});

nextBtn.addEventListener('click', () => {
  prevBtn.removeAttribute('disabled');
  page += 1;
  const endpoint = `${baseUrl}?per_page=${maxItems}&page=${page}&query=${search}&client_id=${API_KEY}`;
  mainElement.innerHTML = '';
  if (search) getImages(endpoint);
  console.log('next', page);
});

prevBtn.addEventListener('click', () => {
  page -= 1;
  if (page < 2) prevBtn.setAttribute('disabled', 'disabled');
  const endpoint = `${baseUrl}?per_page=${maxItems}&page=${page}&query=${search}&client_id=${API_KEY}`;
  mainElement.innerHTML = '';
  if (search) getImages(endpoint);
  console.log('prev', page);
});
