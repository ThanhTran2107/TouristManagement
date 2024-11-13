import axios from 'axios';

const API_URL = 'http://localhost:9090/user/';

const ForgotPasswordService = {
  sendResetLink: async (email) => {
    if (!email) {
      throw new Error('Email is required.');
    }

    try {
      const response = await axios.post(`${API_URL}forgotpassword`, { email });
      
      // Kiểm tra xem response.data có tồn tại và có thuộc tính success không
      if (response.data && response.data.success) {
        return response.data.message; // Trả về thông báo thành công
      } else {
        throw new Error(response.data.message || 'An error occurred while sending the reset link.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        throw new Error(error.response.data.message || 'An error occurred while sending the reset link.');
      } else if (error.request) {
        console.error('Error request:', error.request);
        throw new Error('No response received from the server.');
      } else {
        console.error('Error message:', error.message);
        throw new Error('An unexpected error occurred.');
      }
    }
  },
};

export default ForgotPasswordService;