import axios from 'axios';
const API_URL = 'http://localhost:3000';
export class APIService{
    getData() {
        const url = `${API_URL}/Data/1`;
        return axios.get(url).then(response => response.data);
    }   
}