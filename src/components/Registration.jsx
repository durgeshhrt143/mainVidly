import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import * as userService from "../services/UserService";
class Registration extends Form {
  state = {
    data: {
      email: "",
      password: ""
    },
    errors: {}
  };
  schema = {
    email: Joi.string()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };
  doSubmit = async () => {
    try {
      const { data } = await userService.registration(this.state.data);
      localStorage.setItem("token1", data.token);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status) {
        const errors = { ...this.state.error };
        errors.email = "already register"; //ex.response.data
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <React.Fragment>
        <h1>Registration Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Registration")}
        </form>
      </React.Fragment>
    );
  }
}

export default Registration;
