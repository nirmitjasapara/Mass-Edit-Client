import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import RegistrationPage from "../../routes/RegistrationPage/RegistrationPage";
import LoginPage from "../../routes/LoginPage/LoginPage";
import AddPage from "../../routes/AddPage/AddPage";
import SubstitutionPage from "../../routes/SubstitutionPage/SubstitutionPage";
import JudgePage from "../../routes/JudgePage/JudgePage";
import DonePage from "../../routes/DonePage/DonePage";
import HomePage from "../../routes/HomePage/HomePage";
import PrivateRoute from "../Utils/PrivateRoute";
import PublicOnlyRoute from "../Utils/PublicOnlyRoute";
import CustomContext from "../../contexts/CustomContext";
import ApiService from "../../services/api-service";
import TokenService from "../../services/token-service";
import "./App.css";

class App extends Component {
  static contextType = CustomContext;

  componentDidMount() {
    this.getServerData();
    this.interval = setInterval(this.getServerData, 2000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  getServerData = () => {
    this.context.clearError();
    ApiService.getDocs()
      .then(this.context.setDocs)
      .catch(this.context.setError);
    if (TokenService.hasAuthToken()) {
      ApiService.getTemplates()
        .then(this.context.setTemplates)
        .catch(this.context.setError);
    }
  };
  renderMainRoutes() {
    return (
      <Switch>
        <Route exact path={"/"} component={HomePage} />
        <PublicOnlyRoute path={"/login"} component={LoginPage} />
        <PublicOnlyRoute path={"/register"} component={RegistrationPage} />
        <PrivateRoute path={"/add"} component={AddPage} />
        <PrivateRoute path={"/edit/:id"} component={SubstitutionPage} />
        <PrivateRoute path={"/judge/:id"} component={JudgePage} />
        <PrivateRoute path={"/view/:id"} component={DonePage} />
      </Switch>
    );
  }
  render() {
    const { error } = this.context;
    return (
      <div className="App">
        <Route component={Header} />
        {error ? (
          <p className="red">There was an error, try again</p>
        ) : (
          this.renderMainRoutes()
        )}
      </div>
    );
  }
}

export default App;
