import React, { Component } from 'react';
import axios from 'axios';


class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileMenu: false,
      user: { userId: '' }
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    axios.get('/api/user')
      .then((res) => {
        this.setState({ user: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  toggleMenu() {
    this.setState({ mobileMenu: !this.state.mobileMenu });
  }
  // TODO: show pending status?
  logout() {
    axios.get('/api/logout')
      .then(() => {
        this.setState({ user: '' });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // TODO: PROD - fix url
  render() {
    return (
      <nav className="nav has-shadow">

        <div className="container">
          <div className="nav-left">
            <a className="nav-item">
              Imageboard
            </a>
          </div>

          <span aria-hidden="true" className="nav-toggle" onClick={this.toggleMenu}>
            <span />
            <span />
            <span />
          </span>

          <div className={`nav-right nav-menu ${this.state.mobileMenu && 'is-active'}`}>
            <a className="nav-item">
              Placeholder
            </a>
            <span className="nav-item">
              {this.state.user.userId ?
                <button className="button" onClick={this.logout} >
                  <span>Logout</span>
                </button>
              :
                <a href="http://127.0.0.1:3001/auth/twitter" className="button is-info is-outlined" >
                  <span className="icon">
                    <i className="fa fa-twitter" />
                  </span>
                  <span>Login</span>
                </a>
              }
            </span>

          </div>

        </div>
      </nav>
  );
  }
}

export default Nav;
