import axios from 'axios';
const TOUR_API = "http://localhost:9090";

class APIService {
    getUsers() {
        return axios.get(TOUR_API + '/user/getall');
    }
}

export default new APIService;
