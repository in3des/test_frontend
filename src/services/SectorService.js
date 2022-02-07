import axios from "axios";

const API_URL = 'http://localhost:8085/api/v1/sectors';

class SectorService {

    getAllSectors() {
        return axios.get(API_URL)
    }
}

export default new SectorService;