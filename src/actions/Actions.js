import * as types from '../constants/ActionTypes';


export function loadQuizLoader(message, loaderIsOn) {
    return {
        type: types.LOAD_QUIZ_LOADER,
        message, loaderIsOn
    };
}

export function getSuccessQuizLoader(resp, message, loaderIsOn) {
    return {
        type: types.GET_SUCCESS_QUIZ_LOADER,
        resp, message, loaderIsOn
    };
}

export function getErrorQuizLoader(message, loaderIsOn) {
    return {
        type: types.GET_ERROR_QUIZ_LOADER,
        message, loaderIsOn
    };
}

export function savePatientVizitStageLink(patientHash, vizNum, stageNum) {
    return {
        type: types.SAVE_PATIENT_VIZIT_STAGE_LINK,
        patientHash, vizNum, stageNum
    };
}

export function saveAnswerByLink(questionId, answer) {
    return {
        type: types.SAVE_ANSWER_BY_LINK,
        questionId, answer
    }
}

export function changeStageIsActive(activity, patientHash, vizNum, stageNum) {
    return {
        type: types.CHANGE_STAGE_IS_ACTIVE,
        activity, patientHash, vizNum, stageNum
    }
}

export function exitCurrentStage(activity, stickyTitle) {
    return {
        type: types.EXIT_CURRENT_STAGE,
        activity, stickyTitle
    }
}

export function resetStageActivity() {
    return {
        type: types.RESET_STAGE_ACTIVITY
    }
    
}

export function linkVizitProgress(vizitId) {
    return {
        type: types.LINKING_CURRENT_VIZIT_PROGRESS,
        vizitId

    }
}

export function trackStageProgress(currentLink, patient, vizit, stage) {
    return {
        type: types.PROGRESS_TRACKING_STAGE,
        currentLink, patient, vizit, stage
    }
}


export function loadQuestionsData(message, loaderIsOn) {
    return {
        type: types.LOAD_QUESTIONS_DATA,
        message, loaderIsOn
    };
}

export function hidePopupLoader(message, loaderIsOn) {
    return {
        type: types.HIDE_POPUP,
        message, loaderIsOn
    };
}

export function getErrorQuestions(message, loaderIsOn) {
    return {
        type: types.GET_ERROR_QUESTIONS,
        message, loaderIsOn
    };
}

export function getSuccessQuestions(questions, message, loaderIsOn) {
    return {
        type: types.GET_SUCCESS_QUESTIONS,
        questions, message, loaderIsOn
    };
}

export function showAlert(message, alertIsOn) {
    return {
        type: types.ALERTING,
        message, alertIsOn
    };
}

export function changeStickyTitle(stickyTitle) {
    return {
        type: types.CHANGE_STICKY_TITLE,
        stickyTitle
    };
}

export function changeStageNumber(stageNumber) {
    return {
        type: types.CHANGE_STAGE_NUMBER,
        stageNumber
    };
}

export function generateQuestionsInStage(questions, patientHash, stageNum, vizNum) {
    return {
        type: types.GENERATE_QUESTIONS_IN_STAGE,
        questions, patientHash, stageNum, vizNum
    };
}

export function setStageTitle(titleValue) {
    return {
        type: types.SET_STAGE_TITLE,
        titleValue
    }
}

export function setDoctorId(doctorObjId) {
    return {
        type: types.SET_DOCTOR_ID,
        doctorObjId
    }
}

export function saveGeneratedPatientsHash(response) {
    return {
        type: types.SAVE_GENERATED_PATIENTS_HASH,
        response
    }
};

export function createPatientsQuizData() {
    return {
        type: types.CREATE_PATIENTS_QUIZ_DATA,

    }
};

export function updatePatientsQuizData() {
    return {
        type: types.UPDATE_PATIENTS_QUIZ_DATA,

    }
};


export function getPatientsQuizHistory(response) {
    return {
        type: types.GET_PATIENTS_QUIZ_HISTORY,
        response
    }
};

export function initPatientQuestionsTemplate(template) {
    return {
        type: types.INIT_PATIENT_QUESTIONS_TEMPLATE,
        template
    }
};

export function initStagePatientAnswers(questionsLength) {
    return {
        type: types.INIT_STAGE_PATIENT_ANSWERS,
        questionsLength
    }
};


export function saveAnswerTypeRadio(currentQuestionNumber, answerValue) {
    return {
        type: types.SAVE_ANSWER_TYPE_RADIO,
        currentQuestionNumber, answerValue
    }
};

export function refreshStore(storeState, patientsResponse) {
    return {
        type: types.REFRESH_STORE,
        storeState, patientsResponse
    }
};

export function saveStore() {
    return {
        type: types.SAVING_STORE
    }
}

export function createProgressHolder() {
    return {
        type: types.CREATE_PROGRESSHOLDER
    }
}

export function calcVizitProgress(patient, vizit) {
    return {
        type: types.CALC_VIZIT_PROGRESS,
        patient, vizit
    }
}

export function cityRegionsSave(cityRegionsResponse) {
    return {
        type: types.CITY_REGION_LIST_SAVE,
        cityRegionsResponse
    }
}

export function generateCityOptions(cityQuestionId, regionSelected) {
    return {
        type: types.GENERATE_CITY_OPTIONS,
        cityQuestionId, regionSelected
    }
}


export function saveDataToTable(patientHashId, vizitId, stageId) {
    return {
        type: types.SAVE_DATA_TO_TABLE,
        patientHashId, vizitId, stageId
    }

}

export function dataTableSendingSuccess(transferData) {
    return {
        type: types.DATA_TABLE_SENDING_SUCCESS,
        transferData
    }
}

export function dataTableSendingError(transferData) {
    return {
        type: types.DATA_TABLE_SENDING_ERROR,
        transferData
    }
}