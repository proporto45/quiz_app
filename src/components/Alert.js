import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';




function getModalStyle() {
    return {
        position: `relative`,
        top: `50%`,
        left: `50%`,
        width: `90%`,
        transform: `translate(-50%, -50%)`,
    };
}

export default class Alert extends Component {
    constructor(props) {
        super(props);
        this.closeAlert = this.closeAlert.bind(this);
    }
    closeAlert() {
        this.props.closeAction('', false);
    }
    render() {
        const alertSplit = this.props.statusText.split('! ');
        const alertTitle = `${alertSplit[0]}!`;
        const alertTextRC = (alertSplit.length > 1) ? `${this.props.statusText.split('! ')[1]}` : '';
        const alertText = (alertSplit.length > 1) ? alertTextRC.split('1)')[0] : '';
        const subLevel1 = (alertSplit.length > 1) ? alertTextRC.split('1)')[1] : '';
        const subLevel2 = (alertSplit.length > 1) ? subLevel1.split('2)') : '';
        const subText1 = (alertSplit.length > 1) ? `1) ${subLevel2[0]}` : '';
        const subText2 = (alertSplit.length > 1) ? `2) ${subLevel2[1]}` : '';
        return (
            <div className="test">
                <Modal open={this.props.status}>
                    <Paper style={getModalStyle()}>
                        <Grid container
                              direction="column"
                              justify="space-around"
                              alignItems="center">
                            <Grid item className='preloaderModalItems'>
                                <Typography variant="h6">
                                    {alertTitle}
                                </Typography>
                            </Grid>
                            <Grid item className='preloaderModalItems2'>
                                <Typography variant="body2">
                                    {alertText}
                                </Typography>
                            </Grid>
                            <Grid item className='preloaderModalItems2'>
                                <Typography variant="body2">
                                    {subText1}
                                </Typography>
                            </Grid>
                            <Grid item className='preloaderModalItems2'>
                                <Typography variant="body2">
                                    {subText2}
                                </Typography>
                            </Grid>
                            <Grid item className='preloaderModalItems'>
                                <Button className="saveButton" variant="contained" color="primary" xs={12}
                                        onClick={this.closeAlert} disableRipple={true}>OK</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Modal>
            </div>
        )
    }
}
