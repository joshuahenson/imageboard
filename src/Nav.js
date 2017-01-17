import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileMenu: false,
      twitterLoading: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.twitterLoading = this.twitterLoading.bind(this);
  }
  toggleMenu() {
    this.setState({ mobileMenu: !this.state.mobileMenu });
  }
  twitterLoading() {
    this.setState({ twitterLoading: true });
  }
  // TODO: PROD - fix url
  // Duplicate checks to userId to prevent wrapping adjacent tags in jsx which screws up css
  render() {
    const { logout, userId } = this.props;
    const { mobileMenu, twitterLoading } = this.state;
    return (
      <nav className="nav has-shadow">

        <div className="container">
          <div className="nav-left">
            <Link to="/" className="nav-item is-tab">
              Imageboard
            </Link>
          </div>

          <span aria-hidden="true" className="nav-toggle" onClick={this.toggleMenu}>
            <span />
            <span />
            <span />
          </span>

          <div className={`nav-right nav-menu ${mobileMenu && 'is-active'}`}>
            <Link to="/about" activeClassName="is-active" className="nav-item is-tab">
              About
            </Link>
            {userId &&
              <Link to="/add_image" activeClassName="is-active" className="nav-item is-tab">
                    Add Image
              </Link>
            }
            {userId ?
              <span className="nav-item">
                <button type="button" className="button" onClick={logout} >
                  <span>Logout</span>
                </button>
              </span>
            :
              <span className="nav-item">
                <a
                  href="http://127.0.0.1:3001/auth/twitter" onClick={this.twitterLoading}
                  className={`button is-info ${twitterLoading ? 'is-loading' : 'is-outlined'}`}
                >
                  <span className="icon">
                    <i className="fa fa-twitter" />
                  </span>
                  <span>Login</span>
                </a>
              </span>
            }
          </div>

        </div>
      </nav>
    );
  }
}

Nav.propTypes = {
  logout: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};

export default Nav;
