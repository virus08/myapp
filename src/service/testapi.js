import axios from 'axios';
const API_URL = 'http://localhost:8000';
// const API_URL = 'https://es-timesheet-api.azurewebsites.net';
export class APIService{
    getData() {
        const url = `${API_URL}/Data/1`;
        return axios.get(url).then(response => response.data);
    }   
}