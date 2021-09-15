import { HttpHeaders } from "@angular/common/http";

const REQ_ID_KEY:string = "CHAT_APPS_REQ_ID_KEY";
const LOGIN_KEY:string = "CHAT_APPS_LOGIN_KEY";
export const getHost  = () => {
    return "http://127.0.0.1:5000/";
    // return "http://127.0.0.1:8080/medicalinventory/";
}



export const commonHeaders = (authenticated:boolean = false) => {
    const loginKey = getCookie(LOGIN_KEY);
    if (authenticated && loginKey && loginKey.toString().trim() != "")
    {
        return {
            headers: {
                'requestid':getCookie(REQ_ID_KEY),
                'Authorization': 'Bearer '+ loginKey,
                
            }
        };
    } 
    return unauthorizedHeader();
     
}

const unauthorizedHeader = () => {
    return {
        headers: {
            'requestid': getCookie(REQ_ID_KEY),
            // 'Authorization': 'Bearer  xx'
        }
    }
};
export const setLoginKeyCookie = (cookieValue:any) => {
    // console.debug("cookieValue: ", cookieValue);
    setCookie(LOGIN_KEY, cookieValue);
}
const setCookie = (cname:string, cvalue?:string, exdays=1) => {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
const getCookie = function (cname:string) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export const setRequestId = (val:string | undefined) =>  {
    setCookie(REQ_ID_KEY, val);
}

export const getRequestId = () => {
    return getCookie(REQ_ID_KEY);
}