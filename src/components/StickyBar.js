import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MyoBridge from '../custom_modules/myoBridge/myoBridge'
import myoStoryClmRest from '../custom_modules/storyClmRest'

const quizStoryTableConnector = new myoStoryClmRest();

export default class StickyBar extends React.Component {
    constructor(props) {
        super(props);
        this.closeAction = this.closeAction.bind(this);
        this.arrowActionContinue = this.arrowActionContinue.bind(this);
        this.stickyAction = this.stickyAction.bind(this);
    }

    closeAction(stageCount) {
        if (this.props.isOnStage) {
            console.log(this.props.currentStageLink);
            this.props.actions.trackStageProgress(this.props.currentStageLink, this.props.currentStageObj.currentPatientInHash, this.props.currentStageObj.stageVizit, stageCount);
            this.props.actions.calcVizitProgress(this.props.currentStageObj.currentPatientInHash, this.props.currentStageObj.stageVizit);
            this.props.actions.savePatientVizitStageLink(this.props.currentStageObj.currentPatientInHash, this.props.currentStageObj.stageVizit, stageCount);
            this.props.actions.exitCurrentStage(false);
            this.props.actions.saveStore();
        } else {
            MyoBridge.Presentation.Close();
        }
        event.preventDefault();
    }

    arrowActionContinue(stageCount) {
        console.log(stageCount);
        if (stageCount === 1) {
            this.props.actions.trackStageProgress(this.props.currentStageLink, this.props.currentStageObj.currentPatientInHash, this.props.currentStageObj.stageVizit, stageCount);
            this.props.actions.calcVizitProgress(this.props.currentStageObj.currentPatientInHash, this.props.currentStageObj.stageVizit);
            this.props.actions.exitCurrentStage(false);
            this.props.actions.saveStore();
        } else {
            stageCount--;

            this.props.actions.saveStore();
            this.props.actions.savePatientVizitStageLink(this.props.currentStageObj.currentPatientInHash, this.props.currentStageObj.stageVizit, stageCount);
            this.props.actions.changeStageNumber(stageCount);
        }
    }

    stickyAction(savingComplete, stickyButtonType) {
        if (this.props.isOnStage) {
            let stageNum = (this.props.currentStageLink !== undefined || this.props.currentStageLink !== null) ? this.props.currentStageLink.stageId : 0;
            console.log(stageNum);
            this.props.actions.saveDataToTable(this.props.currentStageObj.currentPatientInHash, this.props.currentStageObj.stageVizit, stageNum);
            if (savingComplete.length !== 0) {
                this.props.actions.loadQuestionsData('Сохранение', true);
                quizStoryTableConnector.sendData(savingComplete)
                    .then((result) => {
                        this.props.actions.hidePopupLoader('Сохранено', false);
                        if (result) {
                            this.props.actions.dataTableSendingSuccess(savingComplete);
                        } else {
                            this.props.actions.dataTableSendingError(savingComplete);
                        }
                        if (stickyButtonType === "arrowButton") {
                            this.arrowActionContinue(stageNum);
                        } else if (stickyButtonType === "closeButton") {
                            this.closeAction(stageNum);
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                if (stickyButtonType === "arrowButton") {
                    this.arrowActionContinue(stageNum);
                } else if (stickyButtonType === "closeButton") {
                    this.closeAction(stageNum);
                }
            }
        } else {
            MyoBridge.Presentation.Close();
        }
    }


    render() {
        const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        const ratio = window.devicePixelRatio || 1;
        const screen = {
            width: window.screen.width * ratio,
            height: window.screen.height * ratio
        };
        const isIphoneX = (screen.width == 1125 && screen.height === 2436);
        const isIphoneXr = (screen.width == 828 && screen.height === 1792);
        const isIphoneXsMax = (screen.width == 1242 && screen.height === 2436);
        const isMonobrov = (isIphoneXsMax || isIphoneXr || isIphoneX);
        const barClass = (iOS && isMonobrov) ? "stickyBar iphonex_nav" : "stickyBar";
        return (
            <div>
                <AppBar className={barClass}>
                    <Grid
                        container
                        spacing={0}
                        alignItems="baseline"
                        alignContent="center"
                    >
                        <Grid item xs={3}>
                            <IconButton onClick={(event) => {
                                this.stickyAction(this.props.toTransfer, "arrowButton");
                                event.preventDefault();
                            }} disableRipple={true}>
                                <ChevronLeftIcon color="secondary" fontSize="large"/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1"
                                        color="secondary" align="center">{this.props.currentPatientName}</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Button color="secondary" onClick={(event) => {
                                this.stickyAction(this.props.toTransfer, "closeButton");
                                event.preventDefault();
                            }} disableRipple={true}>Закрыть</Button>
                        </Grid>
                    </Grid>
                </AppBar>
            </div>
        )
    }
}
