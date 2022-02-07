import axios from "axios";

const API_URL = 'http://localhost:8085/api/v1/form';

class FormService {

    createForm(username, agreement, sectorsId) {
        return axios.post(API_URL, {
            username,
            agreement,
            sectorsId
        })
    }

    updateForm(id, username, agreement, sectorsId) {
        return axios.put(API_URL + '/' + id, {
            username,
            agreement,
            sectorsId
        })
    }
}

export default new FormService;

