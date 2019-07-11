import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import * as QuizActions from '../actions/Actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


const style = {
    paddingTop: "5px"
};
class InputRadios extends React.Component {

    constructor(props) {
        super(props);
    }
    handleChange = event => {
        const currentSelected = [event.target.value];
        this.props.savingToReduxLink(this.props.questionId, currentSelected);
        if (this.props.questionName == "Отмечалась ли у пациента(ки) какая-либо нежелательная реакция?" && event.target.value == "Да") {
            const alertMessage = `Уважаемый доктор! \n Если у вашего пациента была отмечена нежелательная реакция во время или после приема препарата, настоятельно рекомендуем сообщить об этом. Вы можете сделать это следующими способами: 1) написать в чат Службы поддержки 2) обратиться по электронной почте: Nezabudka@breffi.ru`;
            this.props.showAlert(alertMessage, true);
        }
        event.preventDefault();
    };

    render() {
        const {quizState: {currentStage, stageIsActive, patientsQuizData, patientsData}, dispatch} = this.props;
        const actions = bindActionCreators(QuizActions, dispatch);
        const questionFormId = `${this.props.formId}_${this.props.questionId}`;
        const radios = this.props.answers.map((answer, index) => {
            return <FormControlLabel key={answer.answerId} id={answer.answerId}
                                     value={answer.answerTitle}
                                     control={<Radio disableRipple={true} color="primary"/>}
                                     label={`${answer.answerTitle}`}
                                     labelPlacement="end" style={style}
            />
        });
        return (
            <Grid container
                  direction="row"
                  justify="space-around"
                  alignItems="flex-start">
                <RadioGroup
                    value={this.props.linkToSaved[0]}
                    onChange={this.handleChange} id={questionFormId}>
                    {radios}
                </RadioGroup>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    let t = {
        quizState: state.quiz
    };
    return t;
}

export default connect(mapStateToProps)(InputRadios);