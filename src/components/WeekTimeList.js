import React from 'react';
import PropTypes, { element } from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import { parseQueryParams } from '../utilities';
import { weektime } from '../store/weektimeReducer';

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
    constructor(props) {
        super(props);
    }

    // attachContract = (weektime) => {
    //     let { contracts } = this.props;
    //     let contract = null;
    //     contracts.forEach(element => {
    //         if(element.id = weektime.contractId)
    //             contract = element;
    //     });
    //     return {...weektime, contract: contract};
    // }

    render() {
        const { classes, weekTimes, contracts } = this.props;
        let renderWeekTimes = weekTimes.filter(weektime => !weektime.submitted).map(weektime => {
            let goalContract = null;
            for(let i = 0; i < contracts.length; i++) {
                if(contracts[i].id == weektime.contractId){
                    goalContract = {...contracts[i]};
                    break;
                }   
            };
            let newWeekTime = {...weektime, contract: goalContract};
            // console.log(newWeekTime);
            return newWeekTime;
        });
        let map = new Map();
        renderWeekTimes.forEach((weektime, index) => {
            for(let i = 0; i < weekTimes.length; i++) {
                if(weektime.weekId == weekTimes[i].weekId){
                    map.set(index, i);
                }
            }
        });
        console.log(map);
        return (
            <div>
                <Link to={this.props.match.url + '/history'}>
                    <Button raised color="primary">View History</Button>
                </Link>
                {renderWeekTimes.map((weektime, index) => (
                    <Card key={index} className={classes.card}>
                        <CardContent>
                            <Link to={this.props.match.url + '/weektime' + map.get(index)}>
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