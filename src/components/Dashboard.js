import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper/Paper';

class DashBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <h1 style={{textAlign:'center'}}>DashBoard</h1>
                </Grid>
                <Grid item xs={3} />
                <Grid item xs={6}>
                    <Grid container justify='center'>
                        <Grid item xs={3}>
                            <Link to="/timesheet">
                                <Paper className={classes.paper} elevation={4}>
                                    <Typography type="headline" component="h2">
                                        Timesheet
                                    </Typography>
                                </Paper>
                            </Link>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>
                                <Link to="/">
                                    <Typography type="headline" component="h2">
                                        home
                                    </Typography>
                                </Link>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>
                                <Link to="/">
                                    <Typography type="headline" component="h2">
                                        home
                                    </Typography>
                                </Link>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>
                                <Link to="/">
                                    <Typography type="headline" component="h2">
                                        home
                                    </Typography>
                                </Link>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3} />
            </Grid>         
        );
    }
}

const styles = theme => ({
    paper: {
        marginBottom: 10,
        minWidth: 150,
        minHeight: 150,
        borderRadius: 10,
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        '&:hover': {
            boxShadow: '2px 3px 5px 0px rgba(158,158,158, 1)',
            backgroundColor: "green",
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

// const mapStateToProps = (state) => {
//     return {
        
//     }
//   }
  
//   const mapDispatchToProps = (dispatch) => {
//     return {
        
//     }
//   };
  
export default withStyles(styles)(DashBoard);