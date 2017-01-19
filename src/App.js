import React, { PropTypes, Component } from 'react';
import axios from 'axios';
import Nav from './Nav';
import Notification from './Notification';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { userId: '' },
      loggingOut: false,
      notification: {
        active: false,
        message: '',
        type: ''
      }
    };
    this.logout = this.logout.bind(this);
    this.showNotification = this.showNotification.bind(this);
    this.hideNotification = this.hideNotification.bind(this);
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
  logout() {
    this.setState({ loggingOut: true });
    axios.get('/api/logout')
      .then(() => {
        this.setState({
          user: { userId: '' },
          loggingOut: false
        });
      })
      .catch((error) => {
        this.setState({ loggingOut: false });
        console.error(error);
      });
  }
  showNotification(message, type) {
    this.setState({
      notification: {
        active: true,
        message,
        type
      }
    });
  }
  hideNotification() {
    this.setState({
      notification: {
        active: false,
        message: '',
        type: ''
      }
    });
  }
  render() {
    return (
      <div>
        <Nav logout={this.logout} userId={this.state.user.userId} loggingOut={this.state.loggingOut} />
        <Notification notificationState={this.state.notification} hideNotification={this.hideNotification} />
        { React.Children.map(this.props.children, (child) => {
          return React.cloneElement(child, {
            userId: this.state.user.userId,
            showNotification: this.showNotification
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
