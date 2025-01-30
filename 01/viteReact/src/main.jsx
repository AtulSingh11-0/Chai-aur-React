import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import React from 'react';

// USER data object
const USER = {
  name: 'Atul',
  age: 20,
  address: 'Bengla'
};

// creating React element using JSX
const JSXElement = () => {
  return (
    <div>
      <h1>React Element</h1>
      <p>Reat component called as a function</p>
    </div>
  );
};

// creating React element using React.createElement
const reactElement = React.createElement(
  'div',
  null,
  React.createElement('h1', null, 'React Element'),
  React.createElement('p', null, 'Reat component called as a function'),
  React.createElement('p', null, `Name: ${USER.name}, Age: ${USER.age}, Address: ${USER.address}`),
);

// createRoot(document.querySelector('#atul')).render(<App />); // React component
// createRoot(document.querySelector('#atul')).render(JSXElement()); // JSX element
createRoot(document.querySelector('#atul')).render(reactElement); // React element
