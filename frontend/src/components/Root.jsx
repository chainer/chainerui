import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import ChainerUIContainer from '../containers/ChainerUIContainer';
import ResultDetail from '../containers/ResultDetail';


const Root = ({ store, history }) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={ChainerUIContainer} />
      <Route path="/results/(:resultId)" component={ResultDetail} />
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Root;

