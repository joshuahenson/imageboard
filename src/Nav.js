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
    this.closeMenu = this.closeMenu.bind(this);
    this.twitterLoading = this.twitterLoading.bind(this);
    this.logout = this.logout.bind(this);
  }
  toggleMenu() {
    this.setState({ mobileMenu: !this.state.mobileMenu });
  }
  closeMenu() {
    this.setState({ mobileMenu: false });
  }
  logout() {
    this.setState({ mobileMenu: false });
    this.props.logout();
  }
  twitterLoading() {
    this.setState({ twitterLoading: true });
  }
  render() {
    const { userId, loggingOut } = this.props;
    const { mobileMenu, twitterLoading } = this.state;
    return (
      <nav className="nav has-shadow">

        <div className="container">

          <span aria-hidden="true" className="nav-toggle" onClick={this.toggleMenu}>
            <span />
            <span />
            <span />
          </span>

          {userId ?
            <div className="nav-left">
              <Link to="/about" activeClassName="is-active" className="nav-item is-tab is-hidden-mobile">
                About
              </Link>
              <Link to="/add_image" activeClassName="is-active" className="nav-item is-tab is-hidden-mobile">
                Add Image
              </Link>
              <Link to={`/images/${this.props.userId}`} activeClassName="is-active" className="nav-item is-tab is-hidden-mobile">
                My Images
              </Link>
            </div>
          :
            <div className="nav-left">
              <Link to="/about" activeClassName="is-active" className="nav-item is-tab is-hidden-mobile">
                About
              </Link>
            </div>
          }

          <div className="nav-center">
            <Link to="/" className="nav-item is-tab" onClick={this.closeMenu}>
              <b>Imageboard</b>
            </Link>
          </div>

          {userId ?
            <div className={`nav-right nav-menu ${mobileMenu && 'is-active'}`}>
              <Link to="/add_image" activeClassName="is-active" className="nav-item is-tab is-hidden-tablet" onClick={this.closeMenu}>
                Add Image
              </Link>
              <Link to={`/images/${this.props.userId}`} activeClassName="is-active" className="nav-item is-tab is-hidden-tablet" onClick={this.closeMenu}>
                My Images
              </Link>
              <span className="nav-item">
                <button type="button" className={`button ${loggingOut && 'is-loading'}`} onClick={this.logout} >
                  <span>Logout</span>
                </button>
              </span>
            </div>
          :
            <div className={`nav-right nav-menu ${mobileMenu && 'is-active'}`}>
              <Link to="/about" activeClassName="is-active" className="nav-item is-tab is-hidden-tablet" onClick={this.closeMenu}>
                About
              </Link>
              <span className="nav-item">
                <a
                  href="/auth/twitter" onClick={this.twitterLoading}
                  className={`button is-info ${twitterLoading ? 'is-loading' : 'is-outlined'}`}
                >
                  <span className="icon">
                    <i className="fa fa-twitter" />
                  </span>
                  <span>Login</span>
                </a>
              </span>
            </div>
          }
        </div>
      </nav>
    );
  }
}

Nav.propTypes = {
  loggingOut: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};

export default Nav;
