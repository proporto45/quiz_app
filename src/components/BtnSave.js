import React from 'react';
import Button from '@material-ui/core/Button';
import * as QuizActions from '../actions/Actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import myoStoryClmRest from '../custom_modules/storyClmRest'

const quizStoryTableConnector = new myoStoryClmRest();

class BtnSave extends React.Component {
    constructor(props) {
        super(props);
        this.btnStage = this.btnStage.bind(this);
        this.continueStaging = this.continueStaging.bind(this);
    }

    continueStaging(stageCount) {
        if (stageCount === this.props.currentStageObj.vizitStagesLength) {
            this.props.actions.saveStore();
            this.props.exitStage(false);
        } else {
            stageCount++;
            this.props.actions.saveStore();
            this.props.actions.savePatientVizitStageLink(this.props.currentStageObj.currentPatientInHash, this.props.currentStageObj.stageVizit, stageCount);
            this.props.nextStage(stageCount);
        }
    }

    btnStage(savingComplete) {


        let stageNum = (this.props.currentStageLink !== undefined || this.props.currentStageLink !== null) ? this.props.currentStageLink.stageId : 0;

        this.props.actions.calcVizitProgress(this.props.currentStageObj.currentPatientInHash, this.props.currentStageObj.stageVizit);
        this.props.actions.saveDataToTable(this.props.currentStageObj.currentPatientInHash, this.props.currentStageObj.stageVizit, stageNum);


        if (savingComplete.length != 0) {
            this.props.actions.loadQuestionsData('Сохранение', true);
            quizStoryTableConnector.sendData(savingComplete)
                .then((result) => {
                    this.props.actions.hidePopupLoader('Сохранено', false);
                    if (result === true) {
                        this.props.actions.dataTableSendingSuccess(savingComplete);
                    } else {
                        // alert(result);
                        this.props.actions.dataTableSendingError(savingComplete);
                    }
                    this.continueStaging(stageNum);
                })
                .catch((error) => {
                alert(error.toString())
                    console.error(error);
                });


        } else {
            this.continueStaging(stageNum);
        }
    }

    render() {
        const {quizState: {currentStage, waitForTransfer, stageIsActive, patientsQuizData, currentStageLink}, dispatch} = this.props;
        const actions = bindActionCreators(QuizActions, dispatch);
        const btnLabel = (this.props.currentStageObj.stageNumber === this.props.currentStageObj.vizitStagesLength) ? 'Сохранить и выйти' : 'Сохранить и продолжить';
        return (
            <React.Fragment>
                <Button className="saveButton" variant="contained" color="primary" xs={12}
                        onClick={() => {
                            this.btnStage(waitForTransfer)
                        }} disableRipple={true}>{btnLabel}</Button>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    let t = {
        quizState: state.quiz
    };
    return t;
}

export default connect(mapStateToProps)(BtnSave);