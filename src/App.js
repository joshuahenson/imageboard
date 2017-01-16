import React, { PropTypes } from 'react';
import Nav from './Nav';

const App = ({ children, location }) => {
  return (
    <div>
      <Nav location={location} />
      { children }
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default App;
