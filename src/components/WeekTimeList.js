import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Refresh from 'material-ui-icons/Refresh';

import {
    // BrowserRouter as Router,
    // Route,
    Link
} from 'react-router-dom'

const styles = theme => ({
    card: {
        marginBottom: 10,
        minWidth: 275,
        borderRadius: 10,
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        '&:hover': {
            boxShadow: '2px 3px 5px 0px rgba(158,158,158, 1)',
            backgroundColor: "white",
        }
    },
    title: {
        marginBottom: 16,
        // color: theme.palette.text.secondary,
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
});

class WeekTimeList extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        const { classes, weekTimes, contracts, history, selectedMonday } = this.props;
        let renderWeekTimes = weekTimes
        .filter(weektime => history ? weektime.submitted : !weektime.submitted)
        .map(weektime => {
            let goalContract = null;
            for(let i = 0; i < contracts.length; i++) {
                if(contracts[i].id === weektime.contractId){
                    goalContract = {...contracts[i]};
                    break;
                }   
            };
            let newWeekTime = {...weektime, contract: goalContract};
            // console.log(newWeekTime);
            return newWeekTime;
        })
        .sort((wa, wb) => (wb.mondayDate.getTime() - wa.mondayDate.getTime()));
        if(selectedMonday != null) {
            renderWeekTimes = renderWeekTimes.filter(weektime => weektime.mondayDate.getTime() === selectedMonday.getTime());
        }
        let map = new Map();
        renderWeekTimes.forEach((weektime, index) => {
            for(let i = 0; i < weekTimes.length; i++) {
                if(weektime.weekId === weekTimes[i].weekId){
                    map.set(index, i);
                }
            }
        });
        console.log(map);
        return (
            <div>
                {history ? (
                    <div style={{marginBottom:10}}>
                        <h2 style={{textAlign:"center"}}>Timesheet History</h2>
                        <Link to={'/timesheet'}>
                            <Button raised color="primary">Back</Button>
                        </Link>
                        <IconButton
                        onClick={this.props.selectInitial}
                        color="primary"
                        >
                            <Refresh />
                        </IconButton>
                    </div>
                ) : (
                    <div style={{marginBottom:10}}>
                        <h2 style={{textAlign:"center"}}>Timesheet to be filled</h2>
                        <Link to={'/timesheet/history'}>
                            <Button raised color="primary">View History</Button>
                        </Link>
                        <IconButton
                        onClick={this.props.selectInitial}
                        color="primary"
                        >
                            <Refresh />
                        </IconButton>
                    </div>
                )}
                
                {renderWeekTimes.map((weektime, index) => (
                    <Card key={index} className={classes.card}>
                        <CardContent>
                            <Link to={'/timesheet/weektime' + map.get(index)}>
                                <Typography type="headline" component="h2" className={classes.title}>
                                    Week from {weektime.mondayDate.toLocaleDateString().slice(0,10)} to: {new Date(weektime.mondayDate.getTime() + 6*24*3600*1000).toLocaleDateString().slice(0,10)}
                                </Typography>
                                <Typography className={classes.pos}>Company: {weektime.contract.companyName}   Project: {weektime.contract.projectName}</Typography>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }
}

WeekTimeList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WeekTimeList);