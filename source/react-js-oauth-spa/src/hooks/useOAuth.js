import React, { useEffect, useState } from "react";

export const useOAuth = (oauth_endpoint, client_id, response_type, scope, response_mode, nonce, redirect_url, resource, access_token_name = 'access_token', id_token_name = 'id_token') => {

    const [accessToken, setAccessToken] = useState("");
    const [idToken, setIdToken] = useState("");

    useEffect(() => {
        if (oauth_endpoint && oauth_endpoint !== "")
        {
            const tryGetAccessToken = getToken(access_token_name);
            const tryGetIdToken = getToken(id_token_name);
            if (tryGetAccessToken && tryGetIdToken) {
                setAccessToken(tryGetAccessToken);
                setIdToken(tryGetIdToken);
                return;
            } else {
                if (window.location.hash && window.location.hash.length > 1) {
                    var hash = window.location.hash.substring(1);
                    var params = {}
                    hash.split('&').forEach(hk => {
                        let temp = hk.split('=');
                        params[temp[0]] = temp[1]
                    });
    
                    if (params["access_token"] && params["id_token"]) {
                        sessionStorage.setItem(access_token_name, params["access_token"]);
                        sessionStorage.setItem(id_token_name, params["id_token"]);
                        setAccessToken(params["access_token"]);
                        setIdToken(params["id_token"]);
                        window.location.hash = "";
                        return;
                    }
                }
                //redirect for authentication
                window.location.href = `${oauth_endpoint}?client_id=${client_id}&response_type=${response_type}&scope=${scope}&response_mode=${response_mode}&nonce=${nonce}&redirect_uri=${redirect_url}&resource=${resource}`;
            }
        }
        
    }, [oauth_endpoint, client_id, response_type, scope, response_mode, nonce, redirect_url, resource, access_token_name, id_token_name]);

    const getToken = (name) => {
        const accesstoken = sessionStorage.getItem(name);
        if (accesstoken && !isTokenExpired(accesstoken)) return accesstoken;
        return null;
    }

    const isTokenExpired = (token) => {
        if (Date.now() >= token.exp * 1000) {
            return true;
        }
        return false;
    }

    return [accessToken, idToken];
};

export const TokenContext = React.createContext();
export const SettingsContext = React.createContext();