import React from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import blue from '@material-ui/core/colors/blue';
import * as QuizActions from '../actions/Actions';
import StageScreen from '../components/StageScreen'
import StickyBar from '../components/StickyBar'
import Preloader from '../components/Preloader';
import Alert from '../components/Alert';
import StartScreen from '../components/StartScreen';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: blue,
        secondary: {
            main: '#fefefe'
        },
        action: {
            main: '#66bb6a'
        }
    },
});


class QuizApp extends React.Component {
    static propTypes = {
        quizState: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    render() {
        const {quizState: {isCached, QuizPreloaderStates, alertState, currentStageLink,waitForTransfer, QuizComponentState, patientsData, currentStage, stageIsActive}, dispatch} = this.props;
        const actions = bindActionCreators(QuizActions, dispatch);
        return (
            <MuiThemeProvider theme={theme}>
                <StickyBar actions={actions} isOnStage={stageIsActive}
                           currentPatient={currentStage.currentPatientInHash} currentStageObj={currentStage}
                           currentPatientName={QuizComponentState.stickyTitle} currentStageLink={currentStageLink} toTransfer={waitForTransfer}/>
                <div id="root" onScroll={() => {
                    document.activeElement.blur();
                }}>
                    <StartScreen hasCache={isCached} actions={actions} patientsData={patientsData}
                                 isActive={stageIsActive} toTransfer={waitForTransfer} />
                    <StageScreen/>
                    <Preloader status={QuizPreloaderStates.preloaderStatusOpen} statusText={QuizPreloaderStates.preloaderStatusText}/>
                    <Alert status={alertState.alertIsOpen}
                           statusText={alertState.alertText} closeAction={actions.showAlert.bind(this)}/>
                </div>
            </MuiThemeProvider>
        )
    }
}

function mapStateToProps(state) {
    let t = {
        quizState: state.quiz
    };
    return t;
}

export default connect(mapStateToProps)(QuizApp);