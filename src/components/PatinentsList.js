import React from 'react';
import Grid from '@material-ui/core/Grid';
import PatientListItem from './PatientListItem'
import PropTypes from 'prop-types';
import * as QuizActions from '../actions/Actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


class PatinentsList extends React.Component {
    static propTypes = {
        quizState: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {quizState: {QuizPreloaderStates, vizitsProgress, patientsData, currentStage, currentStageLink, patientHash, questionsData}, dispatch} = this.props;
        const actions = bindActionCreators(QuizActions, dispatch);
        // const patientsData = this.props.patientsData;

        const mapObjRecursive = (obj, f) => {
            var k, result, v;
            result = [];
            for (k in obj) {
                v = obj[k];
                result.push(f(k, v));
            }
            return result;
        };
        const patients = (Object.values(patientsData).length == 0) ?
            <span>Нет контактов</span> : mapObjRecursive(patientsData, (key, value) => {
                let firstName = (value.firstName !== undefined) ? value.firstName : "";
                let lastName = (value.lastName !== undefined) ? value.lastName : "";
                let patronymic = (value.patronymic !== undefined) ? value.patronymic : "";
                return <PatientListItem key={key} patientHash={value.hashId} vizitAction={actions}
                                        first_name={firstName} progressContainer={vizitsProgress}
                                        last_name={lastName} quiz_patronymic={patronymic} currentStage={currentStage}
                                        currentStageLink={currentStageLink}
                                        storingVizitProgress={actions.linkVizitProgress.bind(this)}
                                        questions={Object.create(questionsData)}
                                        storingVizitObject={actions.savePatientVizitStageLink.bind(this)}/>
            });

        return (
            <div className="PatinentsListContainer">
                <br/>
                <Grid container
                      direction="column"
                      justify="flex-start"
                      alignItems="stretch" className="PatientsGridItem">
                    <Grid item className="PatientGridItem">
                        {patients}
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

export default connect(mapStateToProps)(PatinentsList);