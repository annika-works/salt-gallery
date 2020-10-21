// const app = document.querySelector('#root');
/* eslint-disable no-console */
import axios from 'axios';
import './styles/main.scss';
import githubLogo from './assets/GitHub_Logo.png';
import EyesImg from './assets/face-without-eyes.svg';
import eye from './eyes';

const githubhandler = document.querySelector('footer img');
const eyeHandler = document.querySelector('.face img');
const irisLeft = document.querySelector('div.iris-left');
const irisRight = document.querySelector('div.iris-right');
const mainElement = document.querySelector('main');
const searchBtn = document.querySelector('#search-btn');
const searchInput = document.querySelector('#search-input');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');

githubhandler.setAttribute('src', githubLogo);
eyeHandler.setAttribute('src', EyesImg);

let search = '';
let page = 1;

const getImages = endpoint => axios.get(endpoint)
  .then(({ data }) => {
    const { results } = data;
    results.forEach(({ urls: images }) => {
      mainElement.innerHTML += `<div class="flipcard-wrapper"><div class="flipcard-front"><img src=${images.small}></div></div>`;
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
});

prevBtn.addEventListener('click', () => {
  page -= 1;
  if (page < 2) prevBtn.setAttribute('disabled', 'disabled');
  const endpoint = `${baseUrl}?per_page=${maxItems}&page=${page}&query=${search}&client_id=${API_KEY}`;
  mainElement.innerHTML = '';
  if (search) getImages(endpoint);
});

document.addEventListener('mousemove', event => {
  eye.moveEye(irisLeft, event.pageX, event.pageY);
  eye.moveEye(irisRight, event.pageX, event.pageY);
});

export default {
  getImages, searchBtn, page, searchInput, search,
};
