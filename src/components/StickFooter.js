import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: {
        backgroundColor: "#1976D2",
        textAlign: 'center',
        padding: "20px",
        flex: "0 0 auto",
    },
    copyright: {
        // marginBottom: 16,
        color: "white",
    },
});
function StickFooter(props) {
    const { classes } = props;
    return (
        <footer className={classes.root}>
            <Grid container spacing={24}>
                <Grid item xs={6} sm={8} color="#ffffff">
                    <Typography className={classes.copyright}>
                        Copyright © 2017.Authright All rights reserved.
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={1}>
                    <a className="grey-text text-lighten-4 right" href="http://www.authright.com/page_about/">About Us</a>
                </Grid>
                <Grid item xs={6} sm={1}>
                <a className="grey-text text-lighten-4 right" href="http://www.authright.com/contact_us/">Contact Us</a>
                </Grid>
                <Grid item xs={6} sm={1}>
                <a className="grey-text text-lighten-4 right" href="http://www.authright.com/event/">News</a>
                </Grid>
            </Grid>
        </footer>
    );
}

StickFooter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StickFooter);