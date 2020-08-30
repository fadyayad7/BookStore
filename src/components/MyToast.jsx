import React, { Component } from "react";

import { Toast } from "react-bootstrap";

class MyToast extends Component {
  state = {};
  render() {
    return (
      <div>
        <Toast
          
          
        >
          <Toast.Header>Hi !</Toast.Header>
          <Toast.Body>can you see me ! 🤓</Toast.Body>
        </Toast>
      </div>
    );
  }
}

export default MyToast;
