
import Msal from 'msal@preview'; 
var msalConfig = {
    auth: {
        clientId: "35352fbe-0290-4b86-9d5e-064c42a4ca66",
        authority: "https://login.microsoftonline.com/common"
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
    }
};

var myMSALObj = new Msal.UserAgentApplication(msalConfig);
var request = {
    scopes: ["user.read"]
};

myMSALObj.acquireTokenSilent(request).then(function (tokenResponse) {
    // Callback code here
    console.log(tokenResponse.accessToken);
}).catch(function (error) {
    console.log(error);
});