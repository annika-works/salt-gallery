import './styles/main.scss';

// Create heading node
const heading = document.createElement('h1');
heading.textContent = 'Allan!';

console.log(heading);

// Append heading node to the DOM
const app = document.querySelector('#root');
app.append(heading);
