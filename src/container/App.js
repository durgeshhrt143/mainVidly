import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./Movies";
import Customer from "./../components/Customer";
import Rental from "./../components/Rental";
import NotFound from "./../components/NotFound";
import NavBar from "./../components/layout/NavBar";
import MovieForm from "./../components/MovieForm";
import Api from "./../components/Api";
import Registration from "./../components/Registration";
import Login from "../components/Login";
import Logout from "../components/Logout";
import Profile from "../components/Profile";
import auth from "../services/AuthService";
import ProtectedRoute from "../components/common/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
class App extends Component {
  state = {};
  componentDidMount() {
    try {
      const user = auth.getUser();
      this.setState({ user });
    } catch (ex) {}
  }
  render() {
    const { user } = this.state;
    console.log(user);
    return (
      <BrowserRouter>
        <React.Fragment>
          <ToastContainer />
          <NavBar user={user} />
          <main className="container" style={{ paddingTop: 20 }}>
            <Switch>
              <Route path={`/profile`} component={Profile} />
              <Route path={`/logout`} component={Logout} />
              <Route path={`/login`} component={Login} />
              <Route path={`/user`} component={Registration} />
              <Route
                path={`/movies/:id`}
                render={props => {
                  if (!user) return <Redirect to={`/login`} />;
                  return <MovieForm {...props} />;
                }}
              />
              <Route
                path={`/movies`}
                render={props => <Movies {...props} user={this.state.user} />}
              />
              <Route path={`/customer`} component={Customer} />
              <ProtectedRoute path={`/rental`} component={Rental} />
              <Route path={`/api`} component={Api} />
              <Route path={`/not-found`} component={NotFound} />
              <Redirect from={`/`} to={`/movies`} exact />
              <Redirect to="/not-found" />
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
