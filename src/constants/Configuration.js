const mode = "prod";
// const mode = "staging";
// const log = function (message) {
//     if (message instanceof Error) {
//         message = message.message +"\r\n"+message.stack;
//     }
//     if (typeof message == "object") message = "Object:" + JSON.stringify(message, undefined, 2);
//     // $("#clients").text($("#clients").text() + message + "\r\n\r\n");
//     alert(message);
// };
// console.error = log;
// console.log = log;
class Configuration {
    constructor() {
        this.mode = mode;
        this.STORYCLM_TYPE = (mode === "prod") ? "" : "staging-";
        this.CLIENT_ID = (mode === "prod") ? "client_53_12" : "client_3_6";
        this.CLIENT_SECRET_KEY = (mode === "prod") ? "28bc500921fa41f198942b4e469042cc0b4dcf86e21946b59011816340fb483e" : "d1d52ddbb4e04d5cbfd3bdf1b5cf9ec1175f3e6a653d4f44b54a02daaf36531b";
        this.PATIENTS_QUIZ_DATA_TABLE_ID = (mode === "prod") ? 170 : 80;
    }

    get environment() {
        return {
            "clientId": this.CLIENT_ID,
            "clientSecretKey": this.CLIENT_SECRET_KEY,
            "storyclmType": this.STORYCLM_TYPE,
            "PatientsQuizDataTableId": this.PATIENTS_QUIZ_DATA_TABLE_ID
        };
    }
}


export default {Configuration};