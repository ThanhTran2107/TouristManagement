import axios from 'axios';

const URL = "http://localhost:9090/user";

class AccountService {
   getAllUsers() {
      return axios.get(URL + '/getall');
   }
}

export default new AccountService();