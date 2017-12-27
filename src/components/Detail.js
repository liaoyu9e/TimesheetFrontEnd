import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from 'material-ui/Dialog';
import { connect } from "react-redux";
import Redirect from 'react-router-dom/Redirect';
import InputDay from './InputDay';
// import InputTimeSheet from './InputTimeSheet';
// import SideBar from './SideBar';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import { update, updateInitial } from '../store/weektime_actions';

const styles = {
    gridContainer: {
        height: "100%",
    },
    root: {
        flexGrow: 1,
        height: '100%',
    },
    gridItem: {
        padding: "0px",
    },
    alert: {
        padding: '20px',
        backgroundColor: '#4CAF50',
        color: 'white',
    },
    closebtn: {
        marginLeft: '15px',
        color: 'white',
        fontWeight: 'bold',
        float: 'right',
        fontSize: '22px',
        cursor: 'pointer',
        transition: '0.3s',
        '&:hover': {
            color: "black",
        }
    },
    flexContainer: {
        display: "flex",
        flexWrap: "nowrap",
    },
}

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            redirected: false,
            updateWeektime: null
        };
    }

    componentWillMount() {
        console.log("Week time details initializing...");
        this.props.initial();
        let { windex } = this.props.match.params;
        let { weekTimes } = this.props;
        let weektime = weekTimes[windex];
        this.setState({
            updateWeektime: weektime
        });
    }

    componentDidUpdate() {
        if(this.props.updated) {
            console.log("Redirecting back to timesheet");
            setTimeout(() => {
                this.setState({redirected: true});
            }, 1000);
        }
    }

    handleAddHour = (dayOfWeek, hours) => {
        console.log(dayOfWeek, hours);
        let updateWeektime = this.state.updateWeektime;
        // let newWeekTime = {...updateWeektime}
        // newWeekTime[dayOfWeek.toLowerCase()] = hours;
        this.setState({
            updateWeektime: {...updateWeektime, [dayOfWeek.toLowerCase()]: hours}
        });
        console.log(this.state.updateWeektime);
    }

    update = () => {
        console.log(this.state.updateWeektime);
        this.props.update(this.state.updateWeektime);
    }

    submit = () => {
        console.log(this.state.updateWeektime);
        this.props.submit(this.state.updateWeektime);
    }

    handleClickOpen = () => {
        this.setState({ dialogOpen: true });
    };

    handleCancel = () => {
        this.setState({ dialogOpen: false });
    };
    
    handleOK = () => {
        this.setState({ dialogOpen: false });
        this.submit();
    };

    render() {
        if(this.props.fetching) {
            return (
                <p>Loading...</p>
            );
        }
        if (this.state.redirected) {
            console.log("Updated or submit successfully, redirecting back...")
            return (
                <Redirect to='/timesheet' />
            )
        }
        return (
            <Grid container className={this.props.classes.gridContainer} justify="center">
                <Grid item xs={12}>
                    {this.props.updated &&
                        (
                            <div className={this.props.classes.alert}>
                                <span className={this.props.classes.closebtn} onClick={this.handleCloseAlert}>&times;</span>
                                Successfully updated!
                            </div>
                        )
                    }
                    <Link to="/timesheet"><Button raised color="primary">Back</Button></Link>
                    <div>
                        <Dialog
                        open={this.state.dialogOpen}
                        onClose={this.handleCancel}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
                            {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure to submit this timesheet? Action cannot be undone.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleCancel} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={this.handleOK} color="primary" autoFocus>
                                    OK
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                    {/* <InputTimeSheet weektime={weektime} /> */}
                    <Grid
                    className={this.props.classes.root}
                    container
                    spacing={16}
                    direction={'row'}
                    justify={'center'}
                    alignItems={'center'}
                    >
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(weekday => (
                            <Grid key={weekday} item xs className={this.props.classes.gridItem}>
                                <InputDay 
                                weekDay={weekday} 
                                hours={this.state.updateWeektime[weekday.toLowerCase()]}
                                onAddHour={this.handleAddHour}
                                hideInput={this.state.updateWeektime.submitted}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    {!this.state.updateWeektime.submitted && (
                        <div>
                            <Button raised color="primary" onClick={this.handleClickOpen}>Submit</Button>
                            <Button raised color="primary" onClick={this.update}>Save</Button>
                        </div>
                    )}
                </Grid>
            </Grid>
        )
    }
}

// Detail.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

const mapStateToProps = (state) => {
    return {
        fetching: state.weektime.fetching,
        updated: state.weektime.updated,
        weekTimes: state.weektime.weekTimes
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        update: (weektime) => update(weektime, dispatch),
        submit: (weektime) => update(weektime, dispatch, true),
        initial: () => updateInitial(dispatch)
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Detail));