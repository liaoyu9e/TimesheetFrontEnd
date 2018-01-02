import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    // DialogTitle,
  } from 'material-ui/Dialog';
import { connect } from "react-redux";
import Redirect from 'react-router-dom/Redirect';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
// import InputDay from './InputDay';
// import InputTimeSheet from './InputTimeSheet';
// import SideBar from './SideBar';

import { Link } from 'react-router-dom';
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
    card: {
        // minWidth: 275,
        // maxWidth:100,
        padding: 0,
        marginBottom: 10,
        borderRadius: 0,
        backgroundColor: "rgba(255, 255, 255, 0.90)",
        '&:hover': {
            boxShadow: '2px 3px 5px 0px rgba(158,158,158, 1)',
            // boxShadow: '0px 3px 5px 3px rgba(158,158,158, 1)',
            backgroundColor: "white",
        }
    },
    headline: {
        // color: "white",  //theme.palette.common.white
        // margin: 'auto',
        fontSize: "85%",
    },
}

class Detail extends React.Component {
    constructor(props, weekdays) {
        super(props);
        this.state = {
            dialogOpen: false,
            redirected: false,
            updateWeektime: null,
            total: 0
        };
        this.weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    }

    componentWillMount() {
        let { windex } = this.props.match.params;
        let { weekTimes, contracts } = this.props;
        if(weekTimes.length === 0 || contracts.length === 0){
            return;
        }
        console.log("Week time details initializing...");
        
        let weektime = weekTimes[windex];
        this.setState({
            updateWeektime: weektime
        });
        if(!weektime.submitted){
            this.props.initial();
        }
        setTimeout(() => {
            this.sumHours();
        }, 50);
    }

    componentDidUpdate() {
        if(this.props.updated) {
            console.log("Redirecting back to timesheet");
            setTimeout(() => {
                this.setState({redirected: true});
            }, 800);
        }
    }

    limit = (val, max) => {
        max = max.toString();
        if(max <= 0){
            return '0';
        }
        
        if (val[0] === '-') {
          return '0';
        }
      
        if(val.length > max.length || Number(val) > Number(max)) {
            val = max;
        }
      
        return Number(val);
    }

    sumHours = () => {
        let { updateWeektime } = this.state;
        let total = 0;
        this.weekdays.forEach((weekday) => {
            total += updateWeektime[weekday.toLowerCase()];
        });
        this.setState({
            total: total
        });
    }

    onChangeHours = dayOfWeek => event => {
        let hours = this.limit(event.target.value, 24)
        console.log(dayOfWeek, hours);
        let updateWeektime = this.state.updateWeektime;
        let oldHours = updateWeektime[dayOfWeek];
        let oldTotal = this.state.total;
        // let newWeekTime = {...updateWeektime}
        // newWeekTime[dayOfWeek.toLowerCase()] = hours;
        this.setState({
            total: oldTotal - oldHours + hours,
            updateWeektime: {...updateWeektime, [dayOfWeek]: hours}
        });
        setTimeout(() => {
            console.log(this.state.updateWeektime);
        }, 10);
    }

    onChangeNote = event => {
        let updateWeektime = this.state.updateWeektime;
        this.setState({
            updateWeektime: {...updateWeektime, note: event.target.value}
        });
        setTimeout(() => {
            console.log(this.state.updateWeektime);
        }, 10);
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
        if (this.props.fetching) {
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
        let { updateWeektime } = this.state;
        const { updated, classes, contracts } = this.props
        let contract = null;
        for(let i = 0; i < contracts.length; i++) {
            if(updateWeektime.contractId === contracts[i].id) {
                contract = contracts[i];
                break;
            }
        }
        
        return (
            <Grid container className={classes.gridContainer} justify="center">
                <Grid item xs={12}>
                    {updated &&
                        (
                            <div className={classes.alert}>
                                <span className={classes.closebtn} onClick={this.handleCloseAlert}>&times;</span>
                                Successfully updated!
                            </div>
                        )
                    }
                    <Link to={updateWeektime.submitted ? "/timesheet/history" : "/timesheet"}><Button raised color="primary">Back</Button></Link>
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
                    <div className={classes.centerText}>
                        <h2>
                            Week {updateWeektime.mondayDate.toLocaleDateString().slice(0,10)} to {new Date(updateWeektime.mondayDate.getTime() + 6*24*3600*1000).toLocaleDateString().slice(0,10) }
                        </h2>
                        <h2>Project: {contract.projectName}</h2>
                        <h2>Company: {contract.companyName}</h2>
                    </div>
                    {/* <InputTimeSheet weektime={weektime} /> */}
                    <Grid
                    // className={classes.root}
                    container
                    spacing={8}
                    direction={'row'}
                    justify={'center'}
                    alignItems={'center'}
                    >
                        {this.weekdays.map(weekday => (
                            <Grid key={weekday} item xs className={classes.gridItem}>
                                {/* <InputDay 
                                weekDay={weekday} 
                                hours={this.state.updateWeektime[weekday.toLowerCase()]}
                                onAddHour={this.handleAddHour}
                                hideInput={this.state.updateWeektime.submitted}
                                /> */}
                                <Card className={this.props.classes.card}>
                                    <CardContent>
                                        {/* <Typography type="headline" className={classes.headline}>  */}
                                        <Typography align="center" className={this.props.classes.headline}>
                                            {weekday}
                                        </Typography>
                                    </CardContent>
                                    <CardContent>
                                        <TextField
                                            disabled={this.state.updateWeektime.submitted}
                                            label="Hours"
                                            placeholder="Hours"
                                            margin="normal"
                                            value={this.state.updateWeektime[weekday.toLowerCase()]}
                                            onChange={this.onChangeHours(weekday.toLowerCase())}
                                            type="number"
                                        />
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                        <Grid item xs={12} className={classes.gridItem}>
                            <Card className={this.props.classes.card}>
                                <CardContent>
                                    <TextField
                                        fullWidth={true}
                                        disabled={this.state.updateWeektime.submitted}
                                        label="Note"
                                        margin="normal"
                                        multiline={true}
                                        value={this.state.updateWeektime.note == null ? "" : this.state.updateWeektime.note}
                                        onChange={this.onChangeNote}
                                        type="text"
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} className={classes.gridItem}>
                            <Typography align="right">
                                Total: {this.state.total}
                            </Typography>
                        </Grid>
                    </Grid>
                    {!this.state.updateWeektime.submitted && (
                        <Grid
                        // className={classes.root}
                        container
                        spacing={16}
                        direction={'row'}
                        justify={'center'}
                        alignItems={'center'}
                        >
                            <Grid item xs={6} className={classes.gridItem}>
                                <Button raised color="primary" onClick={this.handleClickOpen}>Submit</Button>
                            </Grid>
                            <Grid item xs={6} className={classes.gridItem}>
                                <Button raised color="primary" onClick={this.update}>Save</Button>
                            </Grid>
                        </Grid>
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
        weekTimes: state.weektime.weekTimes,
        contracts: state.weektime.contracts
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