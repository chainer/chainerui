import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import ChainerUIContainer from './containers/ChainerUIContainer';


let appNode = document.createElement('div');
document.body.appendChild(appNode);

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    appNode
  );
};

render(ChainerUIContainer);

if (module.hot) {
  module.hot.accept('./containers/ChainerUIContainer', () => { render(ChainerUIContainer) });
}

