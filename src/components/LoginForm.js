import React from 'react';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import Redirect from 'react-router-dom/Redirect';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 50,
        textAlign: 'center'
    },
    alert: {
        padding: 20,
        backgroundColor: '#f44336',
        color: 'white',
    },
    closebtn: {
        marginLeft: 15,
        color: 'white',
        fontWeight: 'bold',
        float: 'right',
        fontSize: 22,
        cursor: 'pointer',
        transition: '0.3s',
        '&:hover': {
            color: "black",
        }
    },
});

const AlertBox = function(props) {
    if(!props.display) {
        return null;
    }
    return (
        <div className={props.classes.alert}>
            <span className={props.classes.closebtn} onClick={props.onClick}>&times;</span>
            {props.children}
        </div>
    );
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            alert: false,
            loginError: this.props.loginError,
            showPassword: false,
        }
    }

    sendCredential = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.username, this.state.password);
    }

    handleCloseAlert = alertname => event => {
        console.log("alert closed")
        this.setState({ [alertname]: false });
    }

    handleMouseDownPassword = event => {
        event.preventDefault();
    };
    
    handleClickShowPasssword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    componentDidMount() {
        let { state } = this.props.location;
        if (state !== undefined && 'from' in state && state.from.pathname !== '/') {
            this.setState({ alert: true })
        }
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        
        if (this.props.loggedIn) {
            console.log("redirecting back")
            return (
                <Redirect to={from} />
            )
        }
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        {/* {this.state.alert &&
                            (
                                <div className={classes.alert}>
                                    <span className={classes.closebtn} onClick={this.handleCloseAlert}>&times;</span>
                                    Please log in before any action!
                                </div>
                            )
                        } */}
                        <AlertBox classes={classes} display={this.state.alert} onClick={this.handleCloseAlert('alert')}>
                            Please log in before any action!
                        </AlertBox>
                        <AlertBox classes={classes} display={this.state.loginError} onClick={this.handleCloseAlert('loginError')}>
                            Invalid username or password!
                        </AlertBox>
                    </Grid>
                    <Grid item xs={12}>
                        <h1 style={{ textAlign: 'center' }}>Welcome to Authright HRM System</h1>
                    </Grid>
                    <Grid item xs={4} />
                    <Grid item xs={4}>
                        <form onSubmit={(event) => this.sendCredential(event)}>
                            <TextField
                                fullWidth={true}
                                helperText="Enter your username here"
                                label="Username"
                                placeholder="Your Username"
                                required={true}
                                onChange={(event) => this.setState({ username: event.target.value })}
                            />
                            {/* <TextField
                                fullWidth={true}
                                type="password"
                                helperText="Enter your Password"
                                label="Password"
                                placeholder="Your Password"
                                required={true}
                                onChange={(event) => this.setState({ password: event.target.value })}
                            /> */}
                            <FormControl className={classes.formControl} fullWidth={true} required={true}>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    id="password"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    value={this.state.password}
                                    onChange={this.handleChange('password')}
                                    placeholder="Your Password"
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        onClick={this.handleClickShowPasssword}
                                        onMouseDown={this.handleMouseDownPassword}
                                        >
                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                />
                                <FormHelperText>Enter your password here</FormHelperText>
                            </FormControl>
                            <Button raised type="submit" label="Submit" color="primary" style={{ margin: 30 }}>Login</Button>
                        </form>
                    </Grid>
                    <Grid item xs={4} />
                </Grid>
            </div>
        );
    }
}
export default withStyles(styles)(LoginForm);