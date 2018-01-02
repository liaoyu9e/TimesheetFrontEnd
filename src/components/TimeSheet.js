import React from 'react';
// import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
// import Button from 'material-ui/Button';
// import ContractList from './ContractList';
import WeekTimeList from './WeekTimeList';
// import Histories from './Histories';
import SideBar from './SideBar';
import Detail from './Detail';
import { fetchContracts, selectInitial, select } from '../store/weektime_actions';
import { connect } from "react-redux";

import {
    // Prompt,
    Route,
    // Link,
    Switch as SwitchRoute
} from 'react-router-dom'

class TimeSheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: false
        };
    }

    componentWillMount() {
        if(this.props.contracts.length > 0 || this.props.weekTimes.length > 0)
            return;
        this.props.fetchContracts();
    }

    render() {
        if(this.props.fetching) {
            return (
                <p>Loading...</p>
            );
        }
        return (
            <Grid container spacing={24}>
                <Grid item xs={12} sm={9}>
                    <Grid container justify="center">
                        {/* <Grid item xs={12} sm={9}>
                            
                        </Grid> */}
                        <Grid item xs={12} sm={9}>
                            <SwitchRoute>
                                <Route 
                                    exact 
                                    path={this.props.match.url} 
                                    render={(props) => (<WeekTimeList {...props} 
                                                        weekTimes={this.props.weekTimes} 
                                                        contracts={this.props.contracts} 
                                                        history={false} 
                                                        selectedMonday={this.props.selectedMonday}
                                                        selectInitial={this.props.selectInitial}
                                                        />
                                            )}
                                 />
                                <Route
                                    exact
                                    path={this.props.match.url + '/history'} 
                                    // render={(props) => (<Histories {...props} user={this.props.user} weekTimes={this.props.weekTimes} contracts={this.props.contracts} />)} 
                                    render={(props) => (<WeekTimeList {...props} 
                                                        weekTimes={this.props.weekTimes} 
                                                        contracts={this.props.contracts} 
                                                        history={true} 
                                                        selectedMonday={this.props.selectedMonday}
                                                        selectInitial={this.props.selectInitial}
                                                        />
                                            )}
                                />
                                <Route
                                    path={this.props.match.url + '/weektime:windex'} 
                                    // render={(props) => (<Detail {...props} weekTimes={this.props.weekTimes} />)} 
                                    component={Detail}
                                />
                            </SwitchRoute>
                            {/* <Prompt message="Are you sure you want to leave?" /> */}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <SideBar selectedMonday={this.props.selectedMonday} select={this.props.select}/>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        contracts: state.weektime.contracts,
        weekTimes: state.weektime.weekTimes,
        fetching: state.weektime.fetching,
        selectedMonday: state.weektime.selectedMonday
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        fetchContracts: () => fetchContracts(dispatch),
        selectInitial: () => selectInitial(dispatch),
        select: (mondayDate) => select(dispatch, mondayDate)
    }
};
  

// TimeSheet.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default connect(mapStateToProps, mapDispatchToProps)(TimeSheet);