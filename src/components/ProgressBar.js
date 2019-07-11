import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

export default class ProgressBar extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const currentPatient = this.props.activeStage.currentPatientInHash;
        const currentVizit = this.props.activeStage.stageVizit;
        const currentVizitProgress = (this.props.activeProgress.progressHolder != undefined && currentPatient != '') ? this.props.activeProgress.progressHolder[currentPatient][currentVizit - 1] : 0;

        return (
            <div className="progressBarContainer">
                <Grid container
                      direction="column"
                      justify="center"
                      alignItems="stretch"
                >
                    <span>
                        Анкета заполнена на {currentVizitProgress}%
                    </span>
                    <LinearProgress variant="determinate" value={currentVizitProgress}/>

                </Grid>
            </div>
        )
    }
}
