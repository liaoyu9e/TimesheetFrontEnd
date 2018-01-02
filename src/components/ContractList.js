import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import {
    // BrowserRouter as Router,
    // Route,
    Link
} from 'react-router-dom';

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

class ContractList extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        const { classes, contracts, weekTimes, mondayDate } = this.props;
        let historyWeektimes = weekTimes.filter(weektime => weektime.submitted);
        let renderContracts = contracts.filter(contract => {
            let startDate = new Date(contract.startDate);
            let nextMonday = new Date(mondayDate.getTime() + 7*24*3600*1000);
            if(startDate > nextMonday)
                return false;
            if(contract.endDate != null) {
                let endDate = new Date(contract.endDate);
                if(endDate < mondayDate)
                    return false;
            }
            return true;
        });
        let clearContractsIndex = [];
        for(let i = 0; i < renderContracts.length; i++) {
            let search_index = 0;
            let found = false;
            for(let j = 0; j < historyWeektimes.length; j++) {
                if(historyWeektimes[j].mondayDate.getDate() === mondayDate.getDate() && historyWeektimes[j].contractId === renderContracts[i].id) {
                    let weekId = historyWeektimes[j].weekId;
                    for(let k = 0; k < weekTimes.length; k++) {
                        if(weekId === weekTimes[k].weekId){
                            search_index = k;
                            break;
                        } 
                    }
                    found = true;
                    break;
                }
            }
            if(!found) {
                clearContractsIndex.push(i);
            }
            renderContracts[i] = {...renderContracts[i], search_index: search_index};
        }
        renderContracts = renderContracts.filter((contract, index) => !(index in clearContractsIndex));
        // console.log(this.props);
        return (
            <div>
                {renderContracts.map((contract, index) => (
                    <Card key={contract.id} className={classes.card}>
                        <CardContent>
                            <Link to={'/timesheet/weektime' + contract.search_index}>
                                <Typography type="headline" component="h2" className={classes.title}>
                                    Company: {contract.companyName} Project: {contract.projectName}
                                </Typography>
                                <Typography className={classes.pos}>Started at: {contract.startDate.toLocaleDateString().slice(0,10)}</Typography>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }
}

ContractList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContractList);