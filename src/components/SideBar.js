import React from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
// import Button from 'material-ui/Button';

const styles = {
    card: {
        // minWidth: 275,
        width: "100%",
        margin: "10px 0px",
        '&:hover': {
            boxShadow: '0px 3px 5px 0px rgba(158,158,158, 1)',
            backgroundColor: "white",
        },
        borderRadius: 5,
        backgroundColor: "rgba(255, 255, 255, 0.85)",
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    shadowing: {
        boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
        //same as card default, possible to use prop from themes to change it
    },
}

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // hideInput: false,
        };
    }

    componentDidMount() {
        // if (this.props.hideInput == true) {
        //     this.setState({
        //         hideInput: true
        //     })
        // }
    }

    onCalenderSelect = (date) => {
        let offset = (date.getDay() - 1) % 7;
        date.setDate(date.getDate() - offset);
        this.props.select(date);
    }

    // const { classes } = props;
    render() {
        return (
            <div>
                <InfiniteCalendar className={this.props.classes.shadowing}
                    theme={{
                        headerColor: '#2196f3',
                        weekdayColor: 'rgba(33, 150, 243, 0.90)',
                    }}
                    width={"100%"}
                    height={window.innerWidth * 0.15} // height={336} 
                    locale={{
                        weekStartsOn: 1
                    }}
                    selected={this.props.selectedMonday == null ? new Date() : this.props.selectedMonday}
                    onSelect={this.onCalenderSelect}
                />
                <Card className={this.props.classes.card}>
                    <CardContent>
                        <Typography type="headline" component="h2" align="center">
                            Contact Info
                        </Typography>
                        <Typography className={this.props.classes.pos}>{"Contact"}</Typography>
                        <Typography component="p">
                            Description<br />
                            {'"Contractor Description: "'}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
}
SideBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideBar);