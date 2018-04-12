import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import Root from './components/Root';

document.addEventListener('DOMContentLoaded', () => {
  const appNode = document.getElementById('chainerui-root');
  if (appNode) {
    ReactDOM.render(<Root />, appNode);
  }
});
