import React from 'react';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronIconRight from '@material-ui/icons/ChevronRight';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';


export default class PatientListItem extends React.Component {
    constructor(props) {
        super(props);
        this.open = this.open.bind(this);
    }

    open(e, vizitName) {
        const vizitNumber = Number(vizitName.split('Визит ')[1]);
        const stageNumber = (this.props.currentStageLink !== null) ? this.props.currentStageLink.stageId : this.props.currentStage.stageNumber;
        this.props.vizitAction.changeStageIsActive(true);
        const last_name = (this.props.last_name === "") ? "" : this.props.last_name;
        const first_nameSplitted = (this.props.first_name === "") ? "" : `${this.props.first_name.split('')[0]}.`;
        const patronymicSplitted = (this.props.quiz_patronymic === "") ? "" : `${this.props.quiz_patronymic.split('')[0]}.`;

        this.props.vizitAction.changeStickyTitle(`${last_name} ${first_nameSplitted} ${patronymicSplitted}`);
        this.props.storingVizitObject(this.props.patientHash, vizitNumber);
        this.props.vizitAction.generateQuestionsInStage(this.props.questions[vizitNumber], this.props.patientHash, stageNumber, vizitNumber);
        e.preventDefault();
    }

    render() {
        const circleFill = (vizitNumber) => {
            let color;
            let vizitProgressContainer = this.props.progressContainer.progressHolder;
            if (vizitProgressContainer !== undefined) {
                let currentProgress = vizitProgressContainer[this.props.patientHash][vizitNumber - 1];
                switch (true) {
                    case currentProgress === 0:
                        color = '#dbdbdb';
                        break;
                    case currentProgress > 0 && currentProgress <= 99:
                        color = '#facf55';
                        break;
                    case currentProgress >= 100:
                        color = '#66bb6a';
                        break;
                }
                return color;
            }
            // color = '#66bb6a';
        };
        return (
            <a id={this.props.patientHash} name={this.props.patientHash} className="PatientListItemContainer">
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Grid container direction="row"
                              justify="space-between"
                              alignItems="center">
                            <span>{this.props.first_name} {this.props.quiz_patronymic} {this.props.last_name}</span>
                        </Grid>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className="vizitsList">
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="stretch"
                        >
                            <Button onClick={(e) => this.open(e, "Визит 1")} vizit="1" disableRipple={true}>
                                <Grid container direction="row"
                                      justify="space-between"
                                      alignItems="center">
                                    <svg width={24} height={24}>
                                        <circle cx="12" cy="12" r="6" stroke="none" fill={circleFill(1)}/>
                                    </svg>
                                    <span>Визит 1</span>
                                    <ChevronIconRight/>
                                </Grid>
                            </Button>
                            <Divider/>
                            <Button onClick={(e) => this.open(e, "Визит 2")} vizit="2" disableRipple={true}>
                                <Grid container direction="row"
                                      justify="space-between"
                                      alignItems="center">
                                    <svg width={24} height={24}>
                                        <circle cx="12" cy="12" r="6" stroke="none" fill={circleFill(2)}/>
                                    </svg>
                                    <span>Визит 2</span>
                                    <ChevronIconRight/>
                                </Grid>
                            </Button>
                            <Divider/>
                            <Button onClick={(e) => this.open(e, "Визит 3")} vizit="3" disableRipple={true}>
                                <Grid container direction="row"
                                      justify="space-between"
                                      alignItems="center">
                                    <svg width={24} height={24}>
                                        <circle cx="12" cy="12" r="6" stroke="none" fill={circleFill(3)}/>
                                    </svg>
                                    <span>Визит 3</span>
                                    <ChevronIconRight/>
                                </Grid>
                            </Button>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </a>
        )
    }
}
