import React, { PropTypes, Component } from 'react';
import axios from 'axios';
import Nav from './Nav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { userId: '' }
    };
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    axios.get('/api/user')
      .then((res) => {
        this.setState({ user: res.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  // TODO: show loading status on button
  logout() {
    axios.get('/api/logout')
      .then(() => {
        this.setState({ user: { userId: '' } });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <div>
        <Nav logout={this.logout} userId={this.state.user.userId} />
        { React.Children.map(this.props.children, (child) => {
          return React.cloneElement(child, {
            userId: this.state.user.userId
          });
        }) }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
