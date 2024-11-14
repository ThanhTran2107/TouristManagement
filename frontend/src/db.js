const mysql = require('mysql2/promise');

// Tạo kết nối đến cơ sở dữ liệu
const createConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost:3306', // Địa chỉ máy chủ MySQL
      user: 'root', // Tên người dùng MySQL
      password: 'Thanh12345#', // Mật khẩu MySQL
      database: 'tourist_management' // Tên cơ sở dữ liệu
    });
    console.log('Kết nối đến cơ sở dữ liệu thành công!');
    return connection;
  } catch (error) {
    console.error('Lỗi kết nối đến cơ sở dữ liệu:', error);
    throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
  }
};

module.exports = createConnection; // Xuất hàm để sử dụng ở nơi khác