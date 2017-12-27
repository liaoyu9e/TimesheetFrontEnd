import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import ContractList from './ContractList';
import { parseQueryParams } from '../utilities';


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

class Histories extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {

        // };
    }

    render() {
        const { classes, user, location, contracts, weekTimes } = this.props;
        if(location.search != "") {
            console.log("search for monday...");
            let query = parseQueryParams(location.search);
            let mondayDate = new Date(query.monday);
            return (
                <div>
                    <Link to='/timesheet'>
                        <Button raised color="primary">Back</Button>
                    </Link>
                    <ContractList contracts={contracts} mondayDate={mondayDate} weekTimes={weekTimes} />
                </div>
            );
        }
        let joinDate = new Date(user.joinDate);
        let offset = (joinDate.getDay() - 1) % 7;
        joinDate.setDate(joinDate.getDate() - offset);
        let now = new Date();
        let mondayDate = [];
        while(joinDate < now) {
            mondayDate.push(new Date(joinDate.getTime()));
            joinDate.setDate(joinDate.getDate() + 7);
        }
        // console.log(this.props.location);
        return (
            <div>
                <Link to='/timesheet'>
                    <Button raised color="primary">Back</Button>
                </Link>
                {mondayDate.map((monday, index) => (
                    <Card key={index} className={classes.card}>
                        <CardContent>
                            <Link to={this.props.match.url + '?monday=' + monday.toLocaleDateString().slice(0,10)}>
                                <Typography type="headline" component="h2" className={classes.title}>
                                    Week from {monday.toLocaleDateString().slice(0,10)} to: {new Date(monday.getTime() + 6*24*3600*1000).toLocaleDateString().slice(0,10)}
                                </Typography>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }
}

Histories.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Histories);