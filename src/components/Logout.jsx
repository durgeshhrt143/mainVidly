import React, { Component } from "react";
import auth from "../services/AuthService";
class Logout extends Component {
  componentDidMount() {
    auth.logout();
  }
  render() {
    return null;
  }
}

export default Logout;
