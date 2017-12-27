import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import './App.css';
import 'react-infinite-calendar/styles.css';
import { blue, white} from 'material-ui/colors';
import { BrowserRouter as Router } from 'react-router-dom';

import MenuAppBar from './components/MenuAppBar';
import Layout from './components/Layout';
import StickFooter from './components/StickFooter';
import { login, logout, checkSession } from './store/auth_actions';
import { connect } from "react-redux";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    // secondary: white,
    // text: {
    // primary: white,
  },
});

class App extends Component {

  componentWillMount () {
    console.log("App Initializing...");
    this.props.checkSession();
  }

  render() {
    if(this.props.loggingIn){
      return (
        <p>Loading...</p>
      );
    }
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <div className="screen">
            <MenuAppBar />
            <Layout onSubmit={this.props.onSubmit} loggedIn={this.props.loggedIn} />
            <StickFooter />
          </div>
        </MuiThemeProvider >
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      loggingIn: state.user.loggingIn,
      loggedIn: state.user.loggedIn,
      error: state.user.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onSubmit: (username, password) => login(username, password, dispatch),
      checkSession: () => checkSession(dispatch),
      logout: () => logout(dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
