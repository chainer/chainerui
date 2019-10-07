import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import configureStore from '../store/configureStore';
import ProjectsContainer from '../containers/ProjectsContainer';
import PlotContainer from '../containers/PlotContainer';
import ResultDetail from '../containers/ResultDetail';
import AssetsContainer from '../containers/AssetsContainer';

const store = configureStore();

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rehydrated: false,
    };
  }

  componentDidMount() {
    persistStore(store, {}, () => {
      this.setState({ rehydrated: true });
    });
  }

  render() {
    if (!this.state.rehydrated) {
      return <div>loading...</div>;
    }
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Route exact path="/" component={ProjectsContainer} />
          <Route exact path="/projects/:projectId" component={PlotContainer} />
          <Route exact path="/projects/:projectId/results/:resultId" component={ResultDetail} />
          <Route
            exact
            path="/projects/:projectId/results/:resultId/assets"
            component={AssetsContainer}
          />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Root;
