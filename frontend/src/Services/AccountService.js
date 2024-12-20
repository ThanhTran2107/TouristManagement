import axios from 'axios';

const URL = "http://localhost:9090/user";

class AccountService {
   getAllUsers() {
      return axios.get(URL + '/getall');
   }
   updateUserRole(email, newRole) {
      return axios.put(URL + '/updaterole', { email, role: newRole });
   }
   deleteUserByEmai(email){
      return axios.delete(URL + '/deleteUserByEmail', { params: { email }});
   }
}

export default new AccountService();