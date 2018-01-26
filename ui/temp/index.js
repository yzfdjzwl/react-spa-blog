import React from 'react';
import ReactDOM from 'react-dom';
import { createRoutes } from './routes';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

const routes = createRoutes();

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        {routes.map(x =>
          <Route key={() => Math.random()} {...x} />
        )}
      </Switch>
    </Router>
  </div>,
  document.getElementById('app'),
);
