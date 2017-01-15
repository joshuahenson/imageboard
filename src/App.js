import React, { PropTypes } from 'react';
import Nav from './Nav';

const App = ({ children }) => {
  return (
    <div>
      <Nav />
      { children }
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object
};

export default App;
