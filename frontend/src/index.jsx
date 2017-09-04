import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import Root from './components/Root';


const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

const render = (Component, appNode) => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} history={history} />
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
    const appNode = document.getElementById('chainer_ui-root');
    if (appNode) {
      render(Root, appNode);
    }
  });
}

