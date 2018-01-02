import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import InputTimeSheet from './InputTimeSheet';
import SideBar from './SideBar';

import {
    // BrowserRouter as Router,
    // Route,
    Link
} from 'react-router-dom'


const styles = {
    gridContainer: {
        height: "100%",
    }
}

class HistoryDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Grid container spacing={24}>
                <Grid item xs={12} sm={9}>
                    <Grid container className={this.props.classes.gridContainer} justify="center">
                        <Grid item xs={12} sm={10}>
                            <Link to="/history"><Button raised color="primary">Back</Button></Link>
                            <InputTimeSheet hideInput={true}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <SideBar hideInput={true} />
                </Grid>
            </Grid>
        )
    }
}

HistoryDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HistoryDetail);