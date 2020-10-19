/* eslint-disable no-console */
import axios from 'axios';
import './styles/main.scss';

// const app = document.querySelector('#root');

const baseUrl = 'https://api.unsplash.com/search/photos';
// const envVariables = process.env;

// const { API_KEY } = envVariables;

axios.get(`${baseUrl}?per_page=10&page=1&query=cats&client_id=yX30oA4euofvCkZShYflX41XXG__CP6oiTaZ7AFa19w`)
  .then(response => {
    // handle success
    console.log(response);
  })
  .catch(error => {
    // handle error
    console.log(error);
  });
