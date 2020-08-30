import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/NavBar";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import BookList from "./components/BookList";
import Book from "./components/Book";
import {BrowserHistory as Router, Switch, Route } from "react-router-dom";
import { HashRouter } from 'react-router-dom';

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class App extends Component {
  
  render() {
    return (
      <HashRouter>
        <NavBar></NavBar>
        <div className="app-container">
          <ReactNotification />
          <div className="container">
            <Switch>
              <Route path="/" exact component={Welcome}></Route>
              <Route path="/add" exact component={Book}></Route>
              <Route path="/edit/:id" exact component={Book}></Route>
              <Route path="/list" exact component={BookList}></Route>
            </Switch>
          </div>
        </div>
        <Footer></Footer>
      </HashRouter>
    );
  }
}

export default App;
