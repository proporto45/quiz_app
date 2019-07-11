import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ProgressBar from './ProgressBar'
import QuestionBox from './QuestionBox'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import StageTitle from './StageTitle';
import BtnSave from './BtnSave';
import * as QuizActions from '../actions/Actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


class StageScreen extends React.Component {
    constructor(props) {
        super(props);
        this.buttonClick = this.buttonClick.bind(this);
    }

    buttonClick() {

    }

    componentDidMount() {
        const {quizState: {currentStage, stageIsActive, patientsQuizData, patientsData}, dispatch} = this.props;
        const actions = bindActionCreators(QuizActions, dispatch);
        let currentPatinetnHash = currentStage.currentPatientInHash;
        const currentStageId = currentStage.stageNumber;
        const currentVizit = currentStage.stageVizit;
        const questions = currentStage.stageQuestions;
        const patientsAnswers = currentStage.patientsAnswers;


        let questionsViewArr;
        if (questions !== undefined && questions.length !== 0) {
            const currentQuestions = questions.filter((current) => {
                if (current.stageId === currentStageId) {
                    return true;
                }
            });

            actions.initStagePatientAnswers(questions.length);
            actions.setStageTitle(currentStageName);
        }


        const stageContainerClassName = `StageScreenContainer ${(stageIsActive ? 'active' : 'nonActive')}`;


    };

    render() {
        const {quizState: {currentStage, transferReducerComplete, vizitsProgress, stageIsActive, waitForTransfer, currentStageLink}, dispatch} = this.props;
        const actions = bindActionCreators(QuizActions, dispatch);
        const currentQuestions = currentStage.stageQuestions.filter((current) => {
            if (current.stageId === currentStage.stageNumber) {
                return true;
            }
        });
        const currentStageTitle = <StageTitle stageTitle={currentQuestions}/>;
        const currentPatinetnHash = currentStage.currentPatientInHash;
        const stageContainerClassName = `StageScreenContainer ${(this.props.quizState.stageIsActive ? 'active' : 'hidden nonActive')}`;
        const stageButton = <BtnSave toTransfer={waitForTransfer} currentStageObj={currentStage}
                                     exitStage={actions.exitCurrentStage.bind(this)}
                                     nextStage={actions.changeStageNumber.bind(this)}
                                     currentStageLink={currentStageLink} actions={actions}
                                     storeSaveComplete={transferReducerComplete}/>;
        const formId = `${currentPatinetnHash}_${currentStage.stageVizit}_${currentStage.stageNumber}`;
        const vizitId = currentStage.stageVizit;
        const stageId = currentStage.stageNumber;


        const questions = (currentStageLink !== null) ? currentStageLink.stageQuestions.map((question, index) => {
            return <QuestionBox key={question.questionId} id={question.questionId} vizitId={vizitId} stageId={stageId}
                                currentPatinetnHash={currentPatinetnHash} formId={formId} title={question.questionTitle}
                                type={question.questionType} answers={question.answers}
                                stageObjectLink={currentStageLink}/>
        }) : "";


        return (
            <div id="StageScreenContainer" className={stageContainerClassName}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <ProgressBar activeStage={currentStage} activeProgress={vizitsProgress}/>
                    </Grid>
                    <Grid item/>
                    {currentStageTitle}
                    <Grid
                        container
                        direction="column"
                        justify="space-between"
                        alignItems="stretch"
                    >
                        {questions}
                        {stageButton}
                    </Grid>
                </Grid>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let t = {
        quizState: state.quiz
    };
    return t;
}

export default connect(mapStateToProps)(StageScreen);