import axios from 'axios';

const ForgotPasswordService = {
  sendResetLink: async (email) => {
    const response = await axios.post('/api/forgotpassword', { email });
    return response.data.message; // Giả sử API trả về một thông điệp
  }
};

export default ForgotPasswordService;