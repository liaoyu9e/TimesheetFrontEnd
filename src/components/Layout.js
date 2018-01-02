import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Route, Switch } from 'react-router-dom';
import Redirect from 'react-router-dom/Redirect';
// import ContractList from './ContractList';
// import InputTimeSheet from './InputTimeSheet';
// import SideBar from './SideBar';
import TimeSheet from './TimeSheet';
// import Detail from './Detail';
// import Histories from './Histories';
// import HistoryDetail from './HistoryDetail';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';



const styles = {
    home: {
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: "auto",
        margin: 10,
    },
}

class Layout extends Component {
    // constructor(props) {
    //     super(props);
    // }
    
    render() {
        const PrivateRoute = ({component: Component, ...rest}) => (
            <Route {...rest} render={(props) => (
                this.props.loggedIn ? (
                    <Component {...props}/>
                ) : (
                    <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }} />
                )
            )} />
         );
        const { classes } = this.props;
        return (
            <div className={classes.home}>
                <div>
                    <Switch>
                        <Route exact path="/" component={Dashboard} />
                        <PrivateRoute path="/timesheet" component={TimeSheet} />
                        {/* <Route path="/timesheet/detail" component={Detail} /> */}
                        <Route path="/login" render={(props) => <LoginForm {...props} onSubmit={this.props.onSubmit} loggedIn={this.props.loggedIn} loginError={this.props.loginError} />} />
                        {/* <Route exact path="/history" component={Histories} />
                        <Route path="/history/detail" component={HistoryDetail} /> */}
                    </Switch>
                    {/* <TimeSheet /> */}
                    {/* <Detail /> */}
                </div>
            </div >
        );
    }   
}

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(Layout);