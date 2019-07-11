import {HttpClient} from "./httpClient";
import ConfigurationPreset from "../../../constants/Configuration";
const initConfig = new ConfigurationPreset.Configuration().environment;

let  AccessTokenManager = function (clientId, clientSecret) {
    let self = this;
    let httpClient = new HttpClient();
    let _authEntity = {
        clientId: clientId,
        key: clientSecret,
        access_token: null,
        expires_date: null,
        token_type: "Bearer"
    };

    let endpoint = `https://${initConfig.storyclmType}auth.storyclm.com/connect/token`;

    let authExpired = function () {
        return (_authEntity.access_token == null || (_authEntity.expires_date != null) && _authEntity.expires_date <= new Date());
    };

    this.getCheckedAuth = function (forceRefresh) {
        if (forceRefresh || authExpired())
            return login()
                .then(function (authEntity) {
                    _authEntity.access_token = authEntity.access_token;
                    let currentDate = new Date();
                    _authEntity.expires_date = currentDate.setSeconds(currentDate.getSeconds() + authEntity.expires_in);
                    if (_onAuthUpdated) _onAuthUpdated(_authEntity);
                    return _authEntity;
                });
        else
            return Promise.resolve(_authEntity);
    }

    let login = function () {
        let entity = {
            grant_type: "client_credentials",
            client_id: _authEntity.clientId,
            client_secret: _authEntity.key
        };
        return httpClient.PostForm(endpoint, entity);
    };

    let _onAuthUpdated = null;
    this.onAuthUpdated = function (callback) {
        _onAuthUpdated = callback;
        return this;
    };

    this.setAuth = function (authEntity) {
        _authEntity.access_token = authEntity.access_token;
        _authEntity.expires_date = authEntity.expires_date;
        return this;
    }


}
export {AccessTokenManager}
