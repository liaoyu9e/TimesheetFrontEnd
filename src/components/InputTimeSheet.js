import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
// import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
// import Typography from 'material-ui/Typography';
import InputDay from './InputDay';

const styles = {
    root: {
        flexGrow: 1,
        height: '100%',
    },
    gridItem: {
        padding: "0px",
    }
}

function InputTimeSheet(props) {
    const { classes, weektime } = props;
    console.log(props);
    return (
        <Grid
            className={classes.root}
            container
            spacing={16}
            direction={'row'}
            justify={'center'}
            alignItems={'center'}
        >
            {/* <Grid item xs={12}> */}
            {/* </Grid> */}
            {/* <Grid container> */}
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(weekday => (
                    <Grid key={weekday} item xs className={classes.gridItem}>
                        <InputDay weekDay={weekday} hours={weektime[weekday.toLowerCase()]} hideInput={props.hideInput}/>
                    </Grid>
                ))}
            {/* </Grid> */}
            {/* </Grid> */}
        </Grid>
    );
}

InputTimeSheet.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputTimeSheet);
