import React, { Component } from "react";
import { Provider } from "react-redux";
import "./App.css";
//router
import { BrowserRouter as Router, Route } from "react-router-dom";

//components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

//store
import store from "./store";
class App extends Component {
  render() {
    console.log(this.props);
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
