import React, { Component } from "react";
import { Link } from 'react-router-dom';

class NavBar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
          <div className="container">
            <Link className="navbar-brand font-weight-bold" to="/">
              <img
                src={"https://image.flaticon.com/icons/svg/746/746980.svg"}
                width="30"
                height="30"
                className="d-inline-block align-top mr-1"
                alt=""
              ></img>
              Bookstore
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/add">
                    ➕ Add Book
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to="/list">
                    📋 Book List
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
