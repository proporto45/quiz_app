import React from 'react';
import InputCheckboxes from './InputCheckboxes';
import InputRadios from './InputRadios';
import InputSelects from './InputSelects';
import InputSelectNums from './InputSelectNums';
import AutoNumber from './AutoNumber';
import * as QuizActions from '../actions/Actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


class Answers extends React.Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        const {quizState: {currentStage, stageIsActive, patientsQuizData, currentStageLink}, dispatch} = this.props;
        const actions = bindActionCreators(QuizActions, dispatch);
    }

    render() {
        const answerType = this.props.type;
        const {quizState: {currentStage, stageIsActive, cityRegionsList, patientsQuizData, currentStageLink}, dispatch} = this.props;
        const actions = bindActionCreators(QuizActions, dispatch);
        let answersComponent;
        const currentAnswer = currentStageLink.stageQuestions[this.props.questionId].userAnswer;
        const currentQuestions = currentStageLink.stageQuestions;
        const currentQuestion = currentStageLink.stageQuestions[this.props.questionId].questionTitle;
        // const growthAnswer = currentStageLink.stageQuestions[2].userAnswer;
        // const weightAnswer = currentStageLink.stageQuestions[3].userAnswer;
        // const currentAnswer = (currentStageLink != null) ? currentStageLink[this.props.questionId].userAnswer : '';
        let autoNumberProps = '';
        if (currentQuestion == "ИМТ") {
            autoNumberProps = {
                "growthAnswer": currentStageLink.stageQuestions[2].userAnswer,
                "weightAnswer": currentStageLink.stageQuestions[3].userAnswer
            }
        } else if (currentQuestion == "Индекс GERD-HRQL") {
            autoNumberProps = [];
            for (let i = 0; i < 10; i++) {
                let tempElement = currentStageLink.stageQuestions[i].userAnswer;
                if (tempElement !== "") {
                    tempElement = parseInt(tempElement);
                    autoNumberProps.push(tempElement)
                    // tempElement = parseInt(tempElement);
                }
                else {
                    autoNumberProps = "";
                }
            }
        }

        switch (answerType) {
            case 'InputCheckbox':
                answersComponent =
                    <InputCheckboxes savingToReduxLink={actions.saveAnswerByLink.bind(this)} linkToSaved={currentAnswer}
                                     questionId={this.props.questionId} formId={this.props.formId}
                                     usersData={patientsQuizData} answers={this.props.answers}/>;
                break;
            case 'InputRadio':
                answersComponent =
                    <InputRadios showAlert={actions.showAlert.bind(this)}
                                 savingToReduxLink={actions.saveAnswerByLink.bind(this)} linkToSaved={currentAnswer}
                                 questionId={this.props.questionId} questionName={currentQuestion}
                                 formId={this.props.formId}
                                 answers={this.props.answers}/>;
                break;
            case 'InputSelects':
                answersComponent =
                    <InputSelects savingToReduxLink={actions.saveAnswerByLink.bind(this)} linkToSaved={currentAnswer}
                                  questionId={this.props.questionId} formId={this.props.formId}
                                  answers={this.props.answers} questionTitle={this.props.titleCheck}
                                  updateCitySelectOptions={actions.generateCityOptions.bind(this)}/>;
                break;
            case 'InputSelectNum':
                answersComponent =
                    <InputSelectNums savingToReduxLink={actions.saveAnswerByLink.bind(this)} linkToSaved={currentAnswer}
                                     questionId={this.props.questionId} formId={this.props.formId}
                                     answers={this.props.answers} questionNumType={this.props.titleCheck}/>;
                break;
            case 'autoNumber':
                answersComponent =
                    <AutoNumber savingToReduxLink={actions.saveAnswerByLink.bind(this)}
                                currentQuestions={currentQuestions} questionName={currentQuestion}
                                linkToSaved={currentAnswer} questionId={this.props.questionId}
                                calcAttr={autoNumberProps}
                                formId={this.props.formId}/>;
                break;
            // case 'InputText':
            //     answersComponent = <InputText id={this.props.id}><span>{this.props.answerTitle}</span></InputText>;
            default:
                answersComponent = <InputCheckboxes questionId={this.props.questionId} formId={this.props.formId}
                                                    answers={this.props.answers}/>;
        }
        return (
            <React.Fragment>
                {answersComponent}

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

export default connect(mapStateToProps)(Answers);