import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Input from 'material-ui/Input';

const styles = ({
    card: {
        // minWidth: 275,
        // maxWidth:100,
        padding: 0,
        marginBottom: 10,
        borderRadius: 0,
        backgroundColor: "rgba(255, 255, 255, 0.90)",
        '&:hover': {
            boxShadow: '2px 3px 5px 0px rgba(158,158,158, 1)',
            // boxShadow: '0px 3px 5px 3px rgba(158,158,158, 1)',
            backgroundColor: "white",
        }
    },
    headline: {
        // color: "white",  //theme.palette.common.white
        // margin: 'auto',
        fontSize: "85%",
    },
    overrideButton: {
        margin: 'auto',
        // '&:hover': {
        //     backgroundColor: '#BBDEFB',
        // },
    },
});

class InputDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hours: this.props.hours,
            addHours: 0,
            hideInput: this.props.hideInput
        };
    }

    // componentDidMount() {
    //     if (this.props.hideInput == true) {
    //         this.setState({
    //             hideInput: true
    //         })
    //     }
    // }
    
    onClickHour = () => {
        let newHours = this.state.hours + this.state.addHours;
        this.setState({
            hours: newHours
        });
        setTimeout(() => {
            this.props.onAddHour(this.props.weekDay, this.state.hours);
            console.log(this.state.hours, this.state.addHours);
        }, 10)
    }

    onChangeHours(event) {
        this.setState({
            addHours: parseInt(event.target.value)
        });
    }

    render() {
        return (
            <div>
                <Card className={this.props.classes.card}>
                    <CardContent>
                        {/* <Typography type="headline" className={classes.headline}>  */}
                        <Typography align="center" className={this.props.classes.headline}>
                            {this.props.weekDay}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography align="center" className={this.props.classes.headline}>
                            {this.state.hours}
                        </Typography>
                    </CardContent>
                    {this.state.hideInput == false &&
                        <div>
                            <CardContent>
                                <form noValidate autoComplete="off" disabled={this.state.hideInput}>
                                    <TextField
                                        label="Hours"
                                        placeholder="Hours"
                                        className={this.props.classes.textField}
                                        margin="normal"
                                        onChange={(event) => this.onChangeHours(event)}
                                        type="number"
                                    />
                                </form>
                            </CardContent>
                            <CardActions>
                                <Button color="primary" className={this.props.classes.overrideButton} onClick={this.onClickHour}>
                                    Add
                            </Button>
                            </CardActions>
                        </div>}
                    {/* <Input
                                disabled={this.props.hideInput}
                                placeholder="Hours"
                                onChange={(event) => this.onChangeHours(event)}
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                            /> */}
                </Card>
            </div>
        );
    }
}

InputDay.propTypes = {
    classes: PropTypes.object.isRequired,
    // hours: React.PropTypes.number,
    // addHours: React.PropTypes.number
};

export default withStyles(styles)(InputDay);