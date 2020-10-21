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

const clearPage = () => {
  mainElement.innerHTML = '';
};

const resetPagination = () => {
  prevBtn.removeAttribute('disabled');
  nextBtn.removeAttribute('disabled');
};

const checkPagination = (prevPage, nextPage) => {
  resetPagination();
  if (!prevPage) prevBtn.setAttribute('disabled', 'disabled');
  if (!nextPage) nextBtn.setAttribute('disabled', 'disabled');
};

const getImages = (dataSearch, dataPage) => {
  axios.get(`https://agile-springs-56924.herokuapp.com/api/images/${dataSearch}?page=${dataPage}`)
    .then(({ data }) => {
      const { images } = data;
      checkPagination(data.prev, data.next);
      page = data.currentPage;
      images.forEach(({ url }) => {
        mainElement.innerHTML += `<label>
        <input type="checkbox" />
          <div class="card">
            <div class="front"><img src=${url}></div>
            <div class="back">Test</div>
          </div>
        </label>`;
      });
    })
    .catch(error => {
      console.log(error);
    });
};

searchBtn.addEventListener('click', e => {
  e.preventDefault();
  clearPage();
  search = searchInput.value;
  if (search) getImages(search, 1);
});

nextBtn.addEventListener('click', () => {
  clearPage();
  if (search) getImages(search, page + 1);
});

prevBtn.addEventListener('click', () => {
  clearPage();
  if (search) getImages(search, page - 1);
});

document.addEventListener('mousemove', event => {
  eye.moveEye(irisLeft, event.pageX, event.pageY);
  eye.moveEye(irisRight, event.pageX, event.pageY);
});

export default {
  getImages, searchBtn, page, searchInput, search,
};
