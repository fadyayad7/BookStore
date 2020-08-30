import React, { Component } from "react";
import { Jumbotron, Image } from "react-bootstrap";
class Welcome extends Component {
  state = {};
  render() {
    return (
      <Jumbotron className="container mt-5 shadow bg-light text-center">
        <h1>Welcome to my Book Store ! 🛒😊</h1>
      </Jumbotron>
    );
  }
}

export default Welcome;
