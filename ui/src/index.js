import 'normalize.css';
import '@common/global.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoutes } from './routes';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import '@common/nprogress.css';
import axios from 'axios';
import NProgress from 'nprogress';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

// injection nprogress
axios.interceptors.request.use(config => {
	console.log('request');
	NProgress.start();
	return config;
});

axios.interceptors.response.use(config => {
	console.log('response');
	NProgress.done();
	return config;
});

const logger = createLogger();
const store = createStore(
    reducers,
    // 本地调试插件
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
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
