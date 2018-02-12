import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import './styles.css';
import Root from './components/Root';


const render = (Component, appNode) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    appNode
  );
};

if (module.hot) {
  const appNode = document.createElement('div');
  document.body.appendChild(appNode);
  render(Root, appNode);
  module.hot.accept('./containers/Root', () => { render(Root, appNode); });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    const appNode = document.getElementById('chainerui-root');
    console.log(JSON.parse(appNode.dataset.constants));
    if (appNode) {
      render(Root, appNode);
    }
  });
}

