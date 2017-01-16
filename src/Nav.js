import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileMenu: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  toggleMenu() {
    this.setState({ mobileMenu: !this.state.mobileMenu });
  }
  // TODO: PROD - fix url
  render() {
    const { logout, user } = this.props;
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

          <div className={`nav-right nav-menu ${this.state.mobileMenu && 'is-active'}`}>
            <Link to="/about" activeClassName="is-active" className="nav-item">
              About
            </Link>
            <Link to="/add_image" activeClassName="is-active" className="nav-item">
              Add Image
            </Link>
            <span className="nav-item">
              {user ?
                <button type="button" className="button" onClick={logout} >
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

Nav.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired
};

export default Nav;
