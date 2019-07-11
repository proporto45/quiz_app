import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';

function getModalStyle() {
    return {
        position: `relative`,
        top: `50%`,
        left: `50%`,
        width: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}

export default class Preloader extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="test">
                <Modal open={this.props.status}>
                    <Paper style={getModalStyle()}>
                        <Grid container
                              direction="column"
                              justify="space-around"
                              alignItems="center">
                            <Grid item className='preloaderModalItems'>
                                <CircularProgress thickness={3}/>
                            </Grid>
                            <Grid item className='preloaderModalItems'>
                                <Typography variant="body2">
                                    {this.props.statusText}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Modal>
            </div>
        )
    }
}
