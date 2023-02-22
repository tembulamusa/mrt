import {setLocalStorage, getFromLocalStorage} from './local-storage';

const ENC_KEY = 'm1XR6ajgepqyh^7&21012G$%%_q90)hte====';
const BASE_URL = 'https://bikoapi.bikosports.co.tz'; // 35.234.140.2:8008

const makeRequest = async ({url, method, data = null, use_jwt = false}) => {

    url = BASE_URL + url;
    let headers = {
        "accept": "*/*"
    };

    let user = getFromLocalStorage('user');

    const updateUserSession = () => {
        if (user) {
            setLocalStorage('user', user);
        }
    }
    let jwt = null;
    console.log("Fetch request function", use_jwt)

    if (use_jwt) {
        console.log("Using jwt")
        const sign = require('jwt-encode');
        const payload = {
            ...data,
            iat: Math.floor(Date.now() / 1000) + (1 * 60)
        };
        jwt = sign(payload, ENC_KEY);

        url += (url.match(/\?/g) ? '&' : '?') + 'token=' + jwt;
        console.log("Using jwt final utl", url)
        data = null;
    } else {
        headers = {...headers, ...{"content-type": "application/json"}}
    }

    const token = user?.token;

    if (token) {
        headers = {...headers, ...{Authorization: "Bearer " + token}}
    }
    console.log("Sending headers ", headers);

    try {
        let request = {
            method: method,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: headers,
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        }
        if (data) {
            request['body'] = JSON.stringify(data)
        }

        const response = await fetch(url, request);
        let result= await (response.json() ||  response.text());
        let status = response?.status;
        return [status, result];
    } catch (err) {
        
        let status = err.response?.status,
            result = err.response?.data;
        return [status, result]
    } finally {
        updateUserSession();
    }
};

export default makeRequest;

