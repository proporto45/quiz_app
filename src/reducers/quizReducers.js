import * as types from '../constants/ActionTypes';
import sha256, {Hash, HMAC} from "fast-sha256";
import CacheManager from "../custom_modules/cache"


const cache = new CacheManager();
const preInitialState = {
    isSynchronized: false,
    waitForTransfer: [],
    patientsHashIds: null,
    doctorId: "8752test-test-4test-9test-7test30c0e0",
    patientsData: {},
    patientsQuizData: {},
    vizitsProgress: {},
    stageIsActive: false,
    transferReducerComplete: false,
    currentStage: {
        currentPatientInHash: '',
        stageNumber: 1,
        stageName: '',
        vizitStagesLength: 5,
        stageVizit: 1,
        currentQuestion: 0,
        patientsAnswers: [],
        stageQuestions: [],
        rootScrollPosition: 0,
        rootScrollHeight: "0px"
    },
    currentStageLink: null,
    QuizComponentState: {
        stickyTitle: 'Анкеты'
    },
    alertState: {
        alertIsOpen: false,
        alertText: "Внимание!"
    },
    QuizPreloaderStates: {
        preloaderStatusOpen: false,
        preloaderStatusText: 'Загрузка'
    },
    patientQuestionTemplate: {},
    questionsData: {},
    cityRegionsList: {}
};

const questionAnswerTemplate = {
    "questionId": "",
    "answerValue": ""
};

export default function quiz(state = preInitialState, action) {
    switch (action.type) {

        case types.SAVE_GENERATED_PATIENTS_HASH:
            let hashes = action.response.map((item) => {
                let hashed = sha256.hash(item.userId).join('');
                item.hashId = hashed;
                return hashed;
            });
            return {...state, patientsHashIds: hashes};


        case types.CREATE_PATIENTS_QUIZ_DATA:
            let savedHashes = state.patientsHashIds;
            let patientsWithQuestions = {};
            savedHashes.forEach((item, index) => {
                (function (element) {
                    patientsWithQuestions[element] = JSON.parse(JSON.stringify(state.questionsData));
                })(item)
            });
            return {
                ...state,
                patientsQuizData: patientsWithQuestions
            };

        case types.UPDATE_PATIENTS_QUIZ_DATA:
            return state;
        //

        case types.SET_STAGE_TITLE:
            return {
                ...state,
                currentStage: {
                    ...state.currentStage,
                    stageName: action.titleValue
                }
            };

        case types.SET_DOCTOR_ID:
            return {
                ...state,
                doctorId: action.doctorObjId
            };
        case types.GET_SUCCESS_QUIZ_LOADER:
            const validPatients = action.resp.filter((item, index) => {
                if (item.isValid) {
                    return true;
                }
            });
            return {
                ...state,
                patientsData: validPatients,
                QuizPreloaderStates: {
                    preloaderStatusOpen: action.loaderIsOn,
                    preloaderStatusText: action.message
                }
            };
        case types.LOAD_QUIZ_LOADER:
            return {
                ...state,
                QuizPreloaderStates: {
                    preloaderStatusOpen: action.loaderIsOn,
                    preloaderStatusText: action.message
                }

            };
        case types.GET_ERROR_QUIZ_LOADER:
            return {
                ...state,
                QuizPreloaderStates: {
                    preloaderStatusOpen: action.loaderIsOn,
                    preloaderStatusText: action.message
                }

            };

        case types.ALERTING:
            return {
                ...state,
                alertState: {
                    alertIsOpen: action.alertIsOn,
                    alertText: action.message
                }

            };
        case types.CHANGE_STAGE_IS_ACTIVE:
            return {
                ...state,
                stageIsActive: action.activity
            };
        case types.SAVE_PATIENT_VIZIT_STAGE_LINK:
            const linkStages = state.patientsQuizData[action.patientHash][action.vizNum];
            let link = 1;
            if (action.stageNum === undefined) {
                let NonAnsweredStages = [];
                linkStages.forEach((item, index) => {
                    if (item.stageProgress < 100 || item.stageProgress === "") {
                        NonAnsweredStages.push(index);
                    }
                });
                link = (NonAnsweredStages.length !== 0) ? state.patientsQuizData[action.patientHash][action.vizNum][NonAnsweredStages[0]] : state.patientsQuizData[action.patientHash][action.vizNum][0];
            } else {
                link = state.patientsQuizData[action.patientHash][action.vizNum][action.stageNum - 1];
            }
            return {
                ...state,
                currentStageLink: link
            };

        //

        case types.SAVE_ANSWER_BY_LINK:
            const isLink = state.currentStageLink;
            const isQuestionId = action.questionId;
            const isAnswer = action.answer;
            let editedArr, LCount = 0;
            const oneAnswerProcent = 100 / isLink.stageQuestions.length;
            if (state.currentStageLink != null) {
                editedArr = (isLink.stageQuestions).map((item, index) => {
                    if (index == isQuestionId) {
                        item.userAnswer = isAnswer;
                    }
                    if (item.userAnswer != '') {
                        LCount++;
                    }

                    return item;
                });
                let result = Math.round(oneAnswerProcent * LCount);
                result = (result > 100) ? 100 : result;
                isLink.stageProgress = result;

                return {
                    ...state,
                    currentStageLink: isLink
                };
            } else {
                return state;
            }


        case types.INIT_PATIENT_QUESTIONS_TEMPLATE:
            return {
                ...state,
                patientQuestionTemplate: action.template
            };
        case types.LOAD_QUESTIONS_DATA:

            return {
                ...state,
                QuizPreloaderStates: {
                    ...state.QuizPreloaderStates,
                    preloaderStatusOpen: action.loaderIsOn,
                    preloaderStatusText: action.message
                }
            };
        case types.HIDE_POPUP:
            return {
                ...state,
                QuizPreloaderStates: {
                    preloaderStatusOpen: action.loaderIsOn,
                    preloaderStatusText: action.message
                }
            };
        case types.GET_ERROR_QUESTIONS:
            return {
                ...state,
                QuizPreloaderStates: {
                    preloaderStatusOpen: action.loaderIsOn,
                    preloaderStatusText: action.message
                }
            };
        case types.CHANGE_STICKY_TITLE:
            return {
                ...state,
                QuizComponentState: {
                    stickyTitle: action.stickyTitle
                }
            };


        case types.INIT_STAGE_PATIENT_ANSWERS:
            let currentStageAnswersTemplate = [];
            for (let i = 0; i < action.questionsLength; i++) {
                let answerObject = {
                    "questionId": i,
                    "answerValue": ""
                };
                currentStageAnswersTemplate.push(answerObject);
            }
            return {
                ...state,
                currentStage: {
                    ...state.currentStage,
                    patientsAnswers: currentStageAnswersTemplate
                }
            };

        case types.SAVE_ANSWER_TYPE_RADIO:
            let test = state.currentStage.patientsAnswers;
            return {
                ...state,
                currentStage: {
                    ...state.currentStage,
                    patientsAnswers: [
                        ...state.currentStage.patientsAnswers,
                        {
                            "questionId": action.currentQuestionNumber,
                            "answerValue": action.answerValue
                        }
                    ]
                }
            };
        case types.RESET_STAGE_ACTIVITY:
            return {
                ...state,
                QuizComponentState: {
                    stickyTitle: "Анкеты"
                },
                stageIsActive: false
            };
        // return state;
        case types.EXIT_CURRENT_STAGE:
            let stickyBarTitle = action.stickyTitle ? action.stickyTitle : 'Анкеты';
            document.getElementById('StartScreenContainer').style.height = `${state.currentStage.rootScrollHeight}px`;
            document.getElementById('StageScreenContainer').style.height = `${0}px`;
            // document.getElementById('StageScreenContainer').style.height = `${state.currentStage.rootScrollHeight + 500}px`;
            document.getElementById('root').style.height = `${state.currentStage.rootScrollHeight}px`;

            window.location = (""+window.location).replace(/#[A-Za-z0-9_]*$/,'')+"#" + state.currentStage.currentPatientInHash;

            // document.getElementById('root').style.height = `${state.currentStage.rootScrollHeight}px`;


            document.getElementById('root').scrollTop = parseInt(state.currentStage.rootScrollPosition);
            return {
                ...state,
                QuizComponentState: {
                    stickyTitle: stickyBarTitle
                },
                stageIsActive: action.activity,
                currentStageLink: null
            };
        case types.CHANGE_STAGE_NUMBER:
            document.getElementById('root').scrollTop = -document.getElementById('StageScreenContainer').offsetHeight;

            return {
                ...state,
                currentStage: {
                    ...state.currentStage,
                    currentPatientInHash: state.currentStage.currentPatientInHash,
                    stageNumber: action.stageNumber,
                    vizitStagesLength: state.currentStage.vizitStagesLength,
                    stageVizit: state.currentStage.stageVizit,
                    stageQuestions: state.currentStage.stageQuestions
                }
            };
        case types.GENERATE_QUESTIONS_IN_STAGE:
            const indexScrollVal = document.getElementById('root').scrollTop;
            const indexHeight = document.getElementById('StartScreenContainer').scrollHeight;
            document.getElementById('StageScreenContainer').style.height = "auto";
            document.getElementById('StageScreenContainer').style.display = "block";
            document.getElementById('root').style.height = `100%`;
            document.getElementById('root').scrollTop = -`${document.getElementById('StageScreenContainer').offsetHeight}px`;
            return {
                ...state,
                currentStage: {
                    ...state.currentStage,
                    currentPatientInHash: action.patientHash,
                    stageNumber: state.currentStageLink.stageId,
                    vizitStagesLength: action.questions.length,
                    stageVizit: action.vizNum,
                    stageQuestions: action.questions,
                    rootScrollPosition: indexScrollVal,
                    rootScrollHeight: indexHeight
                },
            };
        case types.GET_SUCCESS_QUESTIONS:
            let questions = action.questions;
            let reformatedQuestions = Object.create(null);
            let vizits = Object.keys(questions);
            vizits.forEach((current, index) => {
                let currentVizitArr = action.questions[index + 1];
                let stageCount, tempQuestionId;
                let vizitStageCounts = [];
                let tmpObj = {};
                let tmpQuestionsObj = {};
                let tmpAnswersObj = {};
                currentVizitArr.forEach((current, index, arr) => {
                    if (index == 0) {
                        tmpObj = {};
                    }
                    if (stageCount == current.stageNumber) {
                        if (tempQuestionId == current.questionId) {
                            tmpObj.stageQuestions[tempQuestionId].answers.push({
                                answerId: current.answerId,
                                answerTitle: current.answers
                            });
                        } else if (tempQuestionId != current.questionId) {
                            tempQuestionId = current.questionId;
                            let newTmpObj = {
                                questionId: current.questionId,
                                questionTitle: current.questionTitle,
                                questionType: current.answerType,
                                userAnswer: '',
                                answers: []
                            };
                            tmpObj.stageQuestions.push(newTmpObj);
                            tmpObj.stageQuestions[tempQuestionId].answers.push({
                                answerId: current.answerId,
                                answerTitle: current.answers
                            });
                        }
                    } else if (stageCount != current.stageNumber) {
                        if (current.stageNumber != 1) {
                            vizitStageCounts.push(tmpObj);
                        }
                        tmpObj = Object.create(null);
                        tmpQuestionsObj = Object.create(null);
                        tmpAnswersObj = Object.create(null);
                        stageCount = current.stageNumber;
                        tmpObj.stageId = stageCount;
                        tmpObj.stageName = current.stageName;
                        tmpObj.stageProgress = "";
                        tmpObj.stageQuestions = [];
                        tmpQuestionsObj.questionId = current.questionId;
                        tempQuestionId = current.questionId;
                        tmpQuestionsObj.questionTitle = current.questionTitle;
                        tmpQuestionsObj.questionType = current.answerType;
                        tmpQuestionsObj.answers = [];
                        tmpQuestionsObj.userAnswer = '';
                        tmpAnswersObj.answerId = current.answerId;
                        tmpAnswersObj.answerTitle = current.answers;
                        tmpQuestionsObj.answers.push(tmpAnswersObj);
                        tmpObj.stageQuestions.push(tmpQuestionsObj);
                    }
                    if (index == (arr.length - 1)) {
                        vizitStageCounts.push(tmpObj);
                    }
                });
                reformatedQuestions[index + 1] = vizitStageCounts;
            });
            return {
                ...state,
                questionsData: reformatedQuestions,
                QuizPreloaderStates: {
                    preloaderStatusOpen: action.loaderIsOn,
                    preloaderStatusText: action.message
                }

            };
        case types.REFRESH_STORE:
            let cachedStore = action.storeState;
            let patients = action.patientsResponse.filter((item, index) => {
                if (item.isValid) {
                    return true;
                }

            });
            cachedStore.patientsData = patients;
            let quizedPatientsData = cachedStore.patientsQuizData;
            let quizedPatientsArr = Object.keys(quizedPatientsData);
            let progressHolderContainer = cachedStore.vizitsProgress.progressHolder;
            let hashesResponsed = patients.map((item) => {
                let hashedId = sha256.hash(item.userId).join('');
                item.hashId = hashedId;
                return hashedId;
            });
            cachedStore.patientsHashIds = hashesResponsed;
            hashesResponsed.forEach((item, index) => {
                (function (element) {
                    if (quizedPatientsArr.indexOf(element) === -1) {
                        quizedPatientsData[element] = JSON.parse(JSON.stringify(cachedStore.questionsData));
                        progressHolderContainer[element] = [0, 0, 0];
                    }
                })(item)
            });
            cachedStore.QuizComponentState.stickyTitle = "Анкеты";
            cachedStore.stageIsActive = false;


            // QuizComponentState: {
            //     stickyTitle: "Анкеты"
            // },
            // stageIsActive: false
            return cachedStore;

        case types.SAVING_STORE:
            cache.writeData('myo__quizStore', state)
                .then((result) => {
                    //storyClm.tables!
                })
                .catch((error) => {
                    alert(error);
                });
            return state;
            // return {...state, state};
        case types.CREATE_PROGRESSHOLDER:
            const patientsHashes = state.patientsHashIds;
            let progressHolder = Object.create(null);
            patientsHashes.forEach((item, index) => {
                (function (element) {
                    progressHolder[element] = [0, 0, 0];
                })(item)
            });
            return {
                ...state,
                vizitsProgress: {
                    ...state.vizitsProgress,
                    progressHolder
                }
            };
        case types.CALC_VIZIT_PROGRESS:
            let patientWithSavedQuestions = state.patientsQuizData[action.patient][action.vizit];
            let stageOfVizitProcent = Math.round(100 / state.currentStage.vizitStagesLength);
            let stagesProcent = 0;
            patientWithSavedQuestions.forEach((item) => {
                let stProgress = (item.stageProgress != "") ? item.stageProgress : "0";
                stProgress = parseInt(stProgress) * stageOfVizitProcent / 100;
                stagesProcent += stProgress;
            });
            const vizitProcent = (stagesProcent >= 100) ? 100 : Math.round(stagesProcent);
            let patientProgressVizit = state.vizitsProgress;
            patientProgressVizit.progressHolder[action.patient][action.vizit - 1] = vizitProcent;
            return {
                ...state,
                vizitsProgress: patientProgressVizit
            };
        case types.GENERATE_CITY_OPTIONS:
            const questionNumber = action.cityQuestionId;
            let region = (action.regionSelected !== "") ? action.regionSelected : "Все";
            const cityList = state.cityRegionsList.cityRegions;
            let currentStageObjectLink = state.currentStageLink;
            let currentStageObject = state.currentStage;
            let currentStageId = state.currentStage.stageNumber;
            let updatedCityList = [];
            cityList.forEach((item, index) => {
                if (item.cityRegion == region) {
                    updatedCityList = item.cities;
                }
            });
            updatedCityList.sort((a, b) => {
                let itemA = a.toLowerCase();
                let itemB = b.toLowerCase();

                if (itemA < itemB) return -1;
                if (itemA > itemB) return 1;
                return 0;
            });
            let resulUpdatedCity = [];
            updatedCityList.forEach((item, index) => {
                let tmpObjCity = {
                    "answerId": index,
                    "answerTitle": item
                };
                resulUpdatedCity.push(tmpObjCity);
            });

            currentStageObjectLink.stageQuestions[questionNumber].answers = resulUpdatedCity;

            return {
                ...state,
                currentStageLink: currentStageObjectLink
            };


        case types.CITY_REGION_LIST_SAVE:
            const cityResponsed = action.cityRegionsResponse;
            return {
                ...state,
                cityRegionsList: cityResponsed
            };
        case types.SAVE_DATA_TO_TABLE:
            const patientHashId = action.patientHashId;
            const vizitNumberIs = action.vizitId.toString();
            const stageIdIs = action.stageId.toString();
            const currentLinkIs = state.currentStageLink;
            const currentStageNameIs = currentLinkIs.stageName;
            const currentStageProgressIs = currentLinkIs.stageProgress.toString();
            const currentVizitProgressIs = state.vizitsProgress.progressHolder[patientHashId][vizitNumberIs - 1].toString();
            const doctorIdIs = state.doctorId;
            let currentDateTime = new Date();
            currentDateTime = `${currentDateTime.toLocaleDateString()} в ${currentDateTime.getHours()}:${currentDateTime.getMinutes()}:${currentDateTime.getSeconds()}`;
            let quizDataToTable = state.waitForTransfer;
            currentLinkIs.stageQuestions.forEach((item, index) => {
                if (item.userAnswer != "") {
                    let tempDataContainer = {
                        doctorId: doctorIdIs,
                        patientId: patientHashId,
                        vizitId: vizitNumberIs,
                        stageId: stageIdIs,
                        stageName: currentStageNameIs,
                        stageProgress: currentStageProgressIs,
                        questionId: item.questionId.toString(),
                        questionTitle: item.questionTitle,
                        questionType: item.questionType,
                        patientAnswer: item.userAnswer.join(';'),
                        vizitProgress: currentVizitProgressIs,
                        date: currentDateTime
                    };
                    quizDataToTable.push(tempDataContainer);
                }
            });
            const exNewState = {
                ...state,
                waitForTransfer: quizDataToTable,
                QuizPreloaderStates: {
                    preloaderStatusOpen: true,
                    preloaderStatusText: "Сохранение"
                }
            };
            return {
                ...state,
                uizPreloaderStates: {
                    preloaderStatusOpen: true,
                    preloaderStatusText: "Сохранение"
                }
            };



        //
        //
        //
        //
        //

        case types.DATA_TABLE_SENDING_ERROR:
            const dataNonTransfered = action.transferData;
            let error_transferReducerComplete = state.transferReducerComplete;
            let error_isSynchronized = state.isSynchronized;
            let error_waitForTransfer = state.waitForTransfer;

            error_transferReducerComplete = false;
            error_isSynchronized = false;
            error_waitForTransfer = error_waitForTransfer.concat(dataNonTransfered);

            return {
                ...state,
                transferReducerComplete: error_transferReducerComplete,
                isSynchronized: error_isSynchronized,
                waitForTransfer: error_waitForTransfer
            };


        case types.DATA_TABLE_SENDING_SUCCESS:
            const dataTransfered = action.transferData;
            const success_transferReducerComplete = true;
            const success_isSynchronized = true;
            const success_waitForTransfer = [];
            return {
                ...state,
                transferReducerComplete: true,
                isSynchronized: true,
                waitForTransfer: []
            };
        default:
            return state;
    }
}
