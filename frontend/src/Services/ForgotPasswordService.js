import axios from 'axios';
const URL = "http://localhost:9090/user";

const ForgotPasswordService = {
  
  checkEmailExist(email) {
    return axios.get(URL + '/getemail', { params: { email } });
  },

  getPasswordByEmail(email) {
    return axios.get(URL + '/getuser', { params: { email } });
  }

};

export default ForgotPasswordService;