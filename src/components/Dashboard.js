import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import AccessAlarmIcon from 'material-ui-icons/AccessAlarm';
import Card, { CardContent } from 'material-ui/Card';
import red from 'material-ui/colors/red';
// import Paper from 'material-ui/Paper/Paper';
// import Grid from 'material-ui/Grid';

class DashBoard extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.flexContainer}>
                <Link to="/timesheet">
                    <Card className={classes.card}>
                        <CardContent>
                            <AccessAlarmIcon style={{
                                width: 50,
                                height: 50,
                                marginLeft: 60,
                            }} /> 
                        </CardContent>
                        <CardContent>
                            <Typography type="display1" align="center" className={this.props.classes.title}>
                                Timesheet
                            </Typography>
                        </CardContent>
                    </Card>
                </Link>
            </div>        
        );
    }
}

const styles = theme => ({
    // paper: {
    //     marginBottom: 10,
    //     minWidth: 150,
    //     minHeight: 150,
    //     borderRadius: 10,
    //     backgroundColor: "rgba(255, 255, 255, 0.85)",
    //     '&:hover': {
    //         boxShadow: '2px 3px 5px 0px rgba(158,158,158, 1)',
    //         backgroundColor: "green",
    //     }
    // },
    card: {
        maxWidth: 200,
        minHeight: 200,
        borderRadius: "50%",
        boxShadow: '0px 0px 0px 0px rgba(158,158,158, 1)',
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        '&:hover': {
            boxShadow: '2px 3px 5px 0px rgba(158,158,158, 1)',
            background: "white",
        }

    },
    title: {
        // marginBottom: 16,
        color: theme.palette.text.secondary,
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
    flexContainer: {
        marginTop: 100,
        marginLeft: 100,
        flexDirection: "row",
    },
    vatar: {
        backgroundColor: red[500],
    },
});

// const mapStateToProps = (state) => {
//     return {
        
//     }
//   }
  
//   const mapDispatchToProps = (dispatch) => {
//     return {
        
//     }
//   };
  
export default withStyles(styles)(DashBoard);