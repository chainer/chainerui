import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import ChainerUIContainer from './containers/ChainerUIContainer';


const render = (Component, appNode) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    appNode
  );
};

if (module.hot) {
  let appNode = document.createElement('div');
  document.body.appendChild(appNode);
  render(ChainerUIContainer, appNode);
  module.hot.accept('./containers/ChainerUIContainer', () => { render(ChainerUIContainer, appNode) });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    let appNode = document.getElementById('chainer_ui-root');
    if (appNode) {
      render(ChainerUIContainer, appNode);
    }
  });
}

