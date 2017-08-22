import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';
import ChainerUIContainer from './containers/ChainerUIContainer';


const store = configureStore();

const render = (Component, appNode) => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    appNode
  );
};

if (module.hot) {
  const appNode = document.createElement('div');
  document.body.appendChild(appNode);
  render(ChainerUIContainer, appNode);
  module.hot.accept('./containers/ChainerUIContainer', () => { render(ChainerUIContainer, appNode); });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    const appNode = document.getElementById('chainer_ui-root');
    if (appNode) {
      render(ChainerUIContainer, appNode);
    }
  });
}

