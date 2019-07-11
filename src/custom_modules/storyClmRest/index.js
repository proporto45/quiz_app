import {AccessTokenManager} from "./Http/accessTokenManager.js";
import {authorizationHttpClient} from "./Http/authorizationHttpClient";
import {TableClient} from "./Tables/tableClient"
import {QueryManager} from "./Tables/queryManager"
import {$} from "jquery"
import ConfigurationPreset from "../../constants/Configuration";

const initConfig = new ConfigurationPreset.Configuration().environment;

class myoStoryClmRest {
    constructor() {
        this.tokenManager = new AccessTokenManager(initConfig.clientId, initConfig.clientSecretKey);
        this.httpclient = authorizationHttpClient(this.tokenManager);
        this.tableClient = new TableClient(initConfig.PatientsQuizDataTableId, this.httpclient);

        // this.objectRecord = {
        //     doctorId: "234234kk124jj",
        //     patientId: "21072922615899152169244244319214220200829148392329815414501852392412514341201175",
        //     vizitId: "1",
        //     stageId: "1",
        //     stageName: "Шкала комплаентности Мориски-Грина (MMAS-8)",
        //     stageProgress: "13",
        //     questionId: "0",
        //     questionTitle: "Вы когда-нибудь забывали принять препараты?",
        //     questionType: "InputRadio",
        //     patientAnswer: ["мужской"][0],
        //     vizitProgress: "5",
        //     date: new Date().toDateString()
        // };
        // this.arrayToTable.push(this.objectRecord);

        // let sendData = this.tableClient.insertMany(this.arrayToTable)
        //     .then(result => console.log(result))

    }

    sendData(quizData) {
        return this.tableClient.insertMany(quizData)
            .then((result) => {
                return true;
            })
            .catch((err) => {
                return err;
            });
    }
}


export default myoStoryClmRest;