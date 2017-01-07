import React, { Component } from 'react';


class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = { mobileMenu: false };
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  toggleMenu() {
    this.setState({ mobileMenu: !this.state.mobileMenu });
  }
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
            <a className="nav-item">
          Placeholder
            </a>

          </div>

        </div>
      </nav>
  );
  }
}

export default Nav;
