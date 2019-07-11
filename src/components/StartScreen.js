import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import PatinentsList from './PatinentsList'
import dataPatients from '../patients.json';
import * as QuizActions from '../actions/Actions';
import CacheManager from '../custom_modules/cache'
import MyoBridge from '../custom_modules/myoBridge/myoBridge'
import myoStoryClmRest from '../custom_modules/storyClmRest'
import questionData from '../questionData.json'
import questionData2 from '../constants/questionData'

import patientQuestionsTemplate from '../patientQuestionsTemplate.json'
import patientQuestionsTemplate2 from '../constants/patientQuestionsTemplate'
import cityRegions from '../cityRegions.json'
import cityRegions2 from '../constants/cityRegions'
import ConfigurationPreset from '../constants/Configuration'

const quizStoryTableConnector = new myoStoryClmRest();

const myHeaders = {
    "Accept": "application/json",
    "Accept-Language": "en-us,en;q=0.5",
    "Content-Type": "application/json"
};

const myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
};
export default class StartScreen extends React.Component {
    constructor(props) {
        super(props);
        this.cache = new CacheManager();
        this.hackCache = this.hackCache.bind(this);
    }

    hackCache() {
        this.cache.clear();
    }

    refreshState = (json, doctorJson) => {
        this.cache.readData('myo__quizStore')
            .then((result) => {

                if (result != null) {

                    this.props.actions.refreshStore(result, json);

                    if (this.props.toTransfer.length > 0) {
                        quizStoryTableConnector.sendData(this.props.toTransfer)
                            .then((result) => {
                                console.log(result);
                                this.props.actions.hidePopupLoader('Вопросы загружены', false);
                                if (result) {
                                    this.props.actions.dataTableSendingSuccess(this.props.toTransfer);
                                } else {
                                    this.props.actions.dataTableSendingError(this.props.toTransfer);
                                }
                                this.props.actions.saveStore();
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    }


                } else {
                    this.props.actions.getSuccessQuizLoader(json, 'Успешно', true);
                    this.props.actions.saveGeneratedPatientsHash(json);
                    this.props.actions.setDoctorId(doctorJson);


                    // fetch(questionData, myInit)
                    //     .then((response) => {
                    //         return response.json()
                    //     })
                    //     .then((json) => {
                    this.props.actions.getSuccessQuestions(questionData2.questionData, 'Вопросы загружены', false);
                    // this.props.actions.getSuccessQuestions(json, 'Вопросы загружены', false);
                    this.props.actions.createProgressHolder();
                    this.props.actions.createPatientsQuizData();
                    // fetch(patientQuestionsTemplate, myInit)
                    //     .then((response) => {
                    //         return response.json();
                    //     })
                    //     .then((template) => {
                            this.props.actions.initPatientQuestionsTemplate(patientQuestionsTemplate2.patientQuestionsTemplate);
                            // fetch(cityRegions, myInit)
                            //     .then((cityJson) => {
                            //         return cityJson.json();
                            //     })
                            //     .then((cityResponse) => {
                                    this.props.actions.cityRegionsSave(cityRegions2.cityRegions);
                                // })
                                // .catch((error) => {
                                //     this.props.actions.getErrorQuestions(`${error.toString()} from cityRegions`, true);
                                // })

                        // })
                        // .catch((error) => {
                        //     this.props.actions.getErrorQuestions(`${error.toString()} from patientQuestionsTemplate`, true);
                        // });
                    // })
                    // .catch((error) => {
                    //     this.props.actions.getErrorQuestions(`${error.toString()} from questionData`, true);
                    // });
                }
            })
            .catch((error) => {


                this.props.actions.getErrorQuestions(`${error.toString()} from myo__quizStore`, true);
            });
    };

    componentDidMount() {
        MyoBridge.UI.HideCloseBtn();

        this.props.actions.loadQuestionsData('Инициализация', true);
        setTimeout(() => {
            MyoBridge.MyoUser.GetLocalContactsMock((contactsdata) => {
                // MyoBridge.MyoUser.GetLocalContacts((contactsdata) => {
                try {
                    this.refreshState(contactsdata.data, "234234kk124jj");
                    // MyoBridge.MyoUser.Get((data) => {
                    //     this.refreshState(contactsdata.data, data.data.userId);
                    // });
                }
                catch (error) {
                    this.props.actions.showAlert(error.toString(), true);
                }
            });


        }, 1000);
    }

    render() {
        let counter = 0;
        const self = this;

        function hackStorage(event) {
            event.preventDefault();
            counter++;
            if (counter >= 10) {
                counter = 0;
                let password = prompt("Введите пароль");
                if (password == "NoSecret5") {
                    self.hackCache();
                    MyoBridge.Presentation.Close();
                }

            }

        }

        const startContainerClassName = `StartScreenContainer ${(this.props.isActive ? 'nonActive' : 'active')}`;
        return (
            <div id="StartScreenContainer" className={startContainerClassName}>
                <Grid container className="welcomeBlock" spacing={24}>
                    <Grid item xs={12}>
                        <div className="StartScreenContainer0">
                            <Typography variant="subtitle1">
                                Компания РООИ «Здоровье человека» выражает Вам почтение и благодарит за сотрудничество.
                                Просим
                                Вас
                                заполнить анкету пациента, c целью сбора обобщенной информации, которая поможет оценить
                                эффективность терапии препаратом Париет в рамках наблюдательного
                                неинтервенционного многоцентрового исследования приверженности и удовлетворённости
                                терапией
                                пациентов с эрозивной формой ГЭРБ.
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12}/>
                    <Grid item xs={12}>
                        <div className="StartScreenContainer0">
                            <Typography variant="h6" onTouchEnd={hackStorage}>
                                Ваши пациенты
                            </Typography>
                        </div>
                        <div className="PatientsBlock">
                            <PatinentsList/>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
