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
  render() {
    const { logout, userId } = this.props;
    const { mobileMenu, twitterLoading } = this.state;
    return (
      <nav className="nav has-shadow">

        <div className="container">
          <div className="nav-left">
            <Link to="/" className="nav-item">
              Imageboard
            </Link>
          </div>

          <span aria-hidden="true" className="nav-toggle" onClick={this.toggleMenu}>
            <span />
            <span />
            <span />
          </span>

          <div className={`nav-right nav-menu ${mobileMenu && 'is-active'}`}>
            <Link to="/about" activeClassName="is-active" className="nav-item">
              About
            </Link>
            {userId ?
              <span className="nav-item">
                <Link to="/add_image" activeClassName="is-active">
                  Add Image
                </Link>
                <span className="nav-item">
                  <button type="button" className="button" onClick={logout} >
                    <span>Logout</span>
                  </button>
                </span>
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
