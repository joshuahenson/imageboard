import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import Board from './Board';
import About from './About';
import AddImage from './AddImage';
import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Board} />
      <Route path="about" component={About} />
      <Route path="add_image" component={AddImage} />
    </Route>
  </Router>,
  document.getElementById('root')
);
