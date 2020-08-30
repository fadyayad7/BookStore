import React, { Component } from "react";


class Footer extends Component {
  state = {};
  render() {
      let fullYear = new Date().getFullYear();
    return (
      <footer className="page-footer font-small blue pt-4 fixed-bottom ">
        <div className="footer-copyright text-center py-3 bg-light">
          © {fullYear}-{fullYear+1} Copyright:
          <span className="font-weight-bold"> fady.ayad</span>
        </div>
      </footer>
    );
  }
}

export default Footer;
