import axios from 'axios';
import authentication from '../authentication'; 
const API_URL = 'https://graph.microsoft.com';


// const API_URL = 'https://es-timesheet-api.azurewebsites.net';
export class GraphService{
    getToken (){
        var xtoken;
        authentication.authenticationContext.acquireToken(`${API_URL}`, (error, token) => {
            if (error || !token) {
              xtoken = error;
            } else {
              xtoken = token;
            }
          });
        return xtoken;
    }
    
    getMe() {
        const url = `${API_URL}/v1.0/me`;
        var xtoken = this.getToken();
        // console.log(xtoken);
        // var test;
        return axios({
            method: 'get',
            headers:{'authorization':'Bearer '+ xtoken},
            url: url,
            dataType:'json'
          }).then(response => response.data);
        // return test;

    }
    
    getImg() {
      const url = `${API_URL}/v1.0/me/photos/64x64/$value`;
      var xtoken = this.getToken();
      // console.log(xtoken);
      var test =  axios({
          method: 'get',
          headers:{'authorization':'Bearer '+ xtoken},
          url: url,
          responseType: 'arraybuffer'
        }).then(response => response.data);
      return test;
    }
}