import './styles/main.scss';

// Create heading node
const heading = document.createElement('h1');
heading.textContent = 'Allan!';

// Append heading node to the DOM
const app = document.querySelector('#root');
app.append(heading);
