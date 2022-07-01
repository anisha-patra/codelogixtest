
import React, { Component } from "react";
import './App.css';
import Login from "./login";
import Register from "./register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./layout";

function App() {
  return (
    // <div className="App">
    //   <Login />

    // </div>
    <React.Fragment>
      <Router>
        <Switch>
          <Route
            path="/"
            name="Layouts"
            render={(props) => <Layout {...props} />}
          />
        </Switch>

      </Router>
    </React.Fragment>
  );
}

export default App;
