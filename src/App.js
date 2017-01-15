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
  children: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired
};

export default App;
