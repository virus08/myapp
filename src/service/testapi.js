import axios from 'axios';
const API_URL = 'http://localhost:8000';
// const API_URL = 'https://es-timesheet-api.azurewebsites.net';
export class APIService{
    getData() {
        const url = `${API_URL}/Data`;
        return axios.get(url).then(response => response.data);
    }

    getTabMenu() {
        const url = `${API_URL}/tabmenu/1`;
        return axios.get(url).then(response => response.data);
    }   
}