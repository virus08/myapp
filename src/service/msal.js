<script src="https://secure.aadcdn.microsoftonline-p.com/lib/1.0.0/js/msal.js"></script>
var msalConfig = {
    auth: {
        clientId: "e760cab2-b9a1-4c0d-86fb-ff7084abd902", //This is your client ID
        authority: "https://login.microsoftonline.com/tfp/fabrikamb2c.onmicrosoft.com/b2c_1_susi" //This is your tenant info
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
    }
};
var clientApplication = new Msal.UserAgentApplication(msalConfig); 

export class msalService {

}