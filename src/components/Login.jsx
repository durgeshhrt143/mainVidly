import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import auth from "../services/AuthService";
import { Redirect } from "react-router-dom";
class Login extends Form {
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
      const { data } = this.state;
      await auth.login(data.email, data.password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors["email"] = "Invalid Username or Password"; //ex.response.data
        this.setState({ errors });
      }
    }
  };
  render() {
    if (auth.getUser()) return <Redirect to={`/`} />;
    return (
      <React.Fragment>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
