import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { persistStore } from 'redux-persist';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from '../store/configureStore';
import ProjectsContainer from '../containers/ProjectsContainer';
import PlotContainer from '../containers/PlotContainer';
import ResultDetail from '../containers/ResultDetail';
import AssetsContainer from '../containers/AssetsContainer';


const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rehydrated: false
    };
  }

  componentDidMount() {
    persistStore(store, {}, () => {
      this.setState({ rehydrated: true });
    });
  }

  render() {
    if (!this.state.rehydrated) {
      return (<div>loading...</div>);
    }
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={ProjectsContainer} />
          <Route path="/projects/(:projectId)" component={PlotContainer} />
          <Route path="/projects/(:projectId)/results/(:resultId)" component={ResultDetail} />
          <Route path="/projects/(:projectId)/results/(:resultId)/assets" component={AssetsContainer} />
        </Router>
      </Provider>
    );
  }
}

export default Root;

