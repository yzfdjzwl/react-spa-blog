import 'normalize.css';
import './common/global.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoutes } from './routes';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

const logger = createLogger();
const store = createStore(
    reducers,
    applyMiddleware(logger, thunk),
);
const routes = createRoutes();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        {routes.map(x =>
          <Route key={x.path || Math.random()} {...x} />
        )}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app'),
);
