let UI = (function () {

    function _openMediaLibrary() {
        StoryCLMBridge.Invoke("openMediaLibrary ", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _hideCloseBtn() {
        StoryCLMBridge.Invoke("hideCloseBtn", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _hideMediaLibraryBtn() {
        StoryCLMBridge.Invoke("hideMediaLibraryBtn", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _hideMapBtn() {
        StoryCLMBridge.Invoke("hideMapBtn", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _hideSystemBtns() {
        StoryCLMBridge.Invoke("hideSystemBtns", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    return {
        OpenMediaLibrary: _openMediaLibrary,
        HideCloseBtn: _hideCloseBtn,
        HideMediaLibraryBtn: _hideMediaLibraryBtn,
        HideMapBtn: _hideMapBtn,
        HideSystemBtns: _hideSystemBtns
    };
})();
let MyoUser = (function () {

    if (window.StoryCLMBridge) return;

    var messagingIframe;
    var sendMessageQueue = [];

    var responseCallbacks = {};
    var uniqueId = 1;

    var CUSTOM_PROTOCOL_SCHEME = 'storyclm';
    var QUEUE_HAS_MESSAGE = 'SCLM_QUEUE';

    var slideData;

    function _createQueueReadyIframe(doc) {
        messagingIframe = doc.createElement('iframe');
        messagingIframe.style.display = 'none';
        doc.documentElement.appendChild(messagingIframe);
    }

    function _GUID() {
        return UUIDcreatePart(4) +
            UUIDcreatePart(2) +
            UUIDcreatePart(2) +
            UUIDcreatePart(2) +
            UUIDcreatePart(6);
    }

    function UUIDcreatePart(length) {
        var uuidpart = "";
        for (var i = 0; i < length; i++) {
            var uuidchar = parseInt((Math.random() * 256), 10).toString(16);
            if (uuidchar.length == 1) {
                uuidchar = "0" + uuidchar;
            }
            uuidpart += uuidchar;
        }
        return uuidpart;
    }


    function _invoke(command, data, responseCallback) {
        var message = {Command: command, Data: data};
        //setJson("request", message);
        if (responseCallback) {
            var GUID = 'GUID_' + (uniqueId++) + _GUID();
            responseCallbacks[GUID] = responseCallback;
            message.GUID = GUID;
        }
        sendMessageQueue.push(message);
        messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + ':' + QUEUE_HAS_MESSAGE;
    }

    function _getQueue() {
        var messageQueueString = JSON.stringify(sendMessageQueue);
        sendMessageQueue = [];
        return messageQueueString;
    }

    function _storyCLMHandler(messageJSON) {
        setTimeout(function () {
            if (!messageJSON) return;
            var message = JSON.parse(messageJSON);
            if (!message.GUID) return;
            var responseCallback = responseCallbacks[message.GUID];
            if (typeof responseCallback !== "function") return;
            responseCallback(message);
            delete responseCallbacks[message.GUID];
        }, 1);
    }

    function _getNavigationData() {
        return slideData;
    }

    _createQueueReadyIframe(window.document);
    window.StoryCLMBridge = {
        Invoke: _invoke,
        GetQueue: _getQueue,
        StoryCLMHandler: _storyCLMHandler,
        GetNavigationData: _getNavigationData
    };

    StoryCLMBridge.Invoke("getNavigationData", {}, function (data) {
        try {
            var dr = new StoryCLMApiMessage(data);
            slideData = dr.data;
        }
        catch (ex) {
        }
    });

    function StoryCLMApiMessage(data) {
        if (this instanceof StoryCLMApiMessage) {
            if (data) {
                this.status = data.Status;
                this.errorCode = data.ErrorCode;
                this.errorMessage = data.ErrorMessage;
                this.data = data.Data;
            }
            else {
                this.status = "error";
                this.errorCode = -2;
                this.errorMessage = "Data is empty";
                this.data = {};
            }
        }
        else return new StoryCLMApiMessage(data);
    }

    function StoryCLMparametersErrorMessge(callback) {
        if (typeof callback === "function")
            callback(new StoryCLMApiMessage({
                status: "error",
                errorCode: -3,
                errorMessage: "Error Parameters",
                data: {}
            }));
    }

    function _get(callback) {
        StoryCLMBridge.Invoke("myoGetUserInfo", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _getLocalContacts(callback) {
        StoryCLMBridge.Invoke("myoGetLocalContacts", {}, function (data) {

            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _getLocalContactsMock(callback) {
        var sample_data = {
            "ErrorMessage": "",
            "GUID": "GUID_3bffd15f3a6a2700d06374759058a4b6f",
            "Status": "no error",
            "ErrorCode": 200,
            "Data": [
                {
                    "userId": "6666666",
                    "phoneNumber": "70000000099",
                    "xmppLogin": "userchat-13",
                    "isDoctor": true,
                    "isValid": true,
                    "firstName": "Иван",
                    "lastName": "Иванов",
                    "patronymic": "",
                    "city": "Stavropol2",
                    "medicalInstitution": "breffi",
                    "specialization": "it",
                    "avatarUrl": null,
                    "birthDate": "2018-01-15",
                    "email": "rsk-k161@ya.ru",
                    "gender": true
                },
                {
                    "userId": "f60a95ee-b7a1-4313-9be3-24603794fe73",
                    "phoneNumber": "79037616318",
                    "xmppLogin": "userchat-1283",
                    "isDoctor": false,
                    "isValid": true,
                    "firstName": "S",
                    "lastName": "Самсунг",
                    "city": "",
                    "medicalInstitution": "",
                    "specialization": "",
                    "avatarUrl": null,
                    "birthDate": "1900-01-01",
                    "email": "",
                    "gender": true
                }, {
                    "userId": "1",
                    "phoneNumber": "71112228899",
                    "xmppLogin": "user",
                    "isDoctor": true,
                    "isValid": false,
                    "firstName": "Чиба",
                    "lastName": "Фалзовый",
                    "patronymic": "Сан",
                    "city": "Stavropol2",
                    "medicalInstitution": "breffi",
                    "specialization": "it",
                    "avatarUrl": null,
                    "birthDate": "2018-01-15",
                    "email": "rsk-k161@ya.ru",
                    "gender": true
                },
                {
                    "userId": "12341244",
                    "phoneNumber": "12341244",
                    "firstName": "Именыш",
                    "lastName": "Батькович",
                    "patronymic": "",
                    "isValid": true
                },
                {
                    "userId": "123412442344",
                    "phoneNumber": "12340001244",
                    "firstName": "Вася",
                    "lastName": "Ивановко",
                    "patronymic": "Пэтрович",
                    "isValid": true
                },
                {
                    "userId": "12341114",
                    "phoneNumber": "12341114",
                    "firstName": "Алексей",
                    "lastName": "Алексеев",
                    "patronymic": "Егорович",
                    "isValid": true
                },
                {
                    "userId": "1203333244",
                    "phoneNumber": "1203333244",
                    "firstName": "Чиба1",
                    "lastName": "Петров",
                    "patronymic": "Сан",
                    "isValid": true
                },
                {
                    "userId": "1233613344",
                    "phoneNumber": "1233613344",
                    "firstName": "Чиба2",
                    "lastName": "Петров",
                    "patronymic": "Сан",
                    "isValid": true
                },
                {
                    "userId": "1238313344",
                    "phoneNumber": "1238313344",
                    "firstName": "Чиба2",
                    "lastName": "Петров",
                    "patronymic": "Сан",
                    "isValid": true
                },
                {
                    "userId": "1233123344",
                    "phoneNumber": "1233123344",
                    "firstName": "Чиба2",
                    "lastName": "Петров",
                    "patronymic": "Сан",
                    "isValid": true
                },
                {
                    "userId": "1233113344",
                    "phoneNumber": "1233113344",
                    "firstName": "Чиба2",
                    "lastName": "Петров",
                    "patronymic": "Сан",
                    "isValid": true
                },
                {
                    "userId": "1233833344",
                    "phoneNumber": "1233833344",
                    "firstName": "Чиба3",
                    "lastName": "Петров",
                    "patronymic": "Сан",
                    "isValid": true
                }

            ]
        }
        if (typeof callback === "function")
            callback(new StoryCLMApiMessage(sample_data));
    }

    return {
        Get: _get,
        GetLocalContacts: _getLocalContacts,
        GetLocalContactsMock: _getLocalContactsMock
    };
})();
let Presentation = (function () {

    function _open(presId, slideName, data, callback) {
        var options = {};
        if (typeof presId !== "number") {
            StoryCLMparametersErrorMessge(callback);
            return;
        }
        if (arguments.length === 3) {

            if (typeof data === "function") {
                if (typeof slideName === "string") {
                    callback = data;
                    data = {};
                }
                else {
                    callback = data;
                    data = slideName;
                    slideName = ""
                }
            }
        }
        else if (arguments.length === 2) {
            if (typeof slideName === "function") {
                callback = slideName;
                slideName = "";
            }
            else {
                if (typeof slideName !== "string") {
                    StoryCLMparametersErrorMessge(callback);
                    return;
                }
            }
        }
        slideName = slideName || "";
        data = data || {};
        options = {presId: presId, slideName: slideName, data: data};
        StoryCLMBridge.Invoke("open", options, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _close(mode) {
        if (typeof mode === "undefined") mode = 0;
        if (typeof mode !== "number") mode = 0;
        if (mode < 0 || mode > 2) mode = 0;
        StoryCLMBridge.Invoke("closePresentation", {mode: mode});
    }

    function _setComplete(callback) {
        StoryCLMBridge.Invoke("setPresentationComplete", {});
    }

    function _getInfo(callback) {
        StoryCLMBridge.Invoke("getPresentationInfo", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _getPreviousSlide(callback) {
        StoryCLMBridge.Invoke("getPreviousSlide", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _getNextSlide(callback) {
        StoryCLMBridge.Invoke("getNextSlide", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _getBackForwardList(callback) {
        StoryCLMBridge.Invoke("getBackForwardList", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _getBackForwardPresList(callback) {
        StoryCLMBridge.Invoke("getBackForwardPresList", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _getMediaFiles(callback) {
        StoryCLMBridge.Invoke("getMediaFiles", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _getPresentations(callback) {
        StoryCLMBridge.Invoke("getPresentations", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _openMediaFile(name, id, callback) {
        var options = {};
        if (typeof name !== "string") {
            StoryCLMparametersErrorMessge(callback);
            return;
        }
        if (arguments.length >= 3) {
            if (typeof id !== "number") {
                StoryCLMparametersErrorMessge(callback);
                return;
            }
        }
        else if (arguments.length === 2) {
            if (typeof id === "function") {
                callback = id;
                id = -1;
            }
            else {
                if (typeof id !== "number") {
                    StoryCLMparametersErrorMessge(callback);
                    return;
                }
            }
        }
        id = id || -1;
        options = {id: id, name: name};
        StoryCLMBridge.Invoke("openMediaFile", options, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _getMap(callback) {
        StoryCLMBridge.Invoke("getMap", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    function _getCurrentSlideName(callback) {
        StoryCLMBridge.Invoke("getCurrentSlideName", {}, function (data) {
            if (typeof callback === "function")
                callback(new StoryCLMApiMessage(data));
        });
    }

    return {
        Open: _open,
        OpenMediaFile: _openMediaFile,
        Close: _close,
        GetInfo: _getInfo,
        GetPreviousSlide: _getPreviousSlide,
        GetNextSlide: _getNextSlide,
        GetBackForwardList: _getBackForwardList,
        GetMediaFiles: _getMediaFiles,
        GetPresentations: _getPresentations,
        GetMap: _getMap,
        GetCurrentSlideName: _getCurrentSlideName,
        GetBackForwardPresList: _getBackForwardPresList,
        SetComplete: _setComplete
    };
})();
export default {MyoUser, UI, Presentation}