const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Tạo kết nối đến cơ sở dữ liệu
const createConnection = async () => {
    return mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT, 
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
  };

// Kiểm tra email tồn tại
app.post('/api/check-email', async (req, res) => {
  const { email } = req.body;
  const connection = await createConnection();
  try {
    const [rows] = await connection.execute('SELECT COUNT(*) AS count FROM users WHERE email = ?', [email]);
    res.json({ exists: rows[0].count > 0 });
  } catch (error) {
    console.error('Error checking email:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.end();
  }
});

// Gửi email đặt lại mật khẩu
app.post('/api/send-reset-email', async (req, res) => {
  const { email } = req.body;
  const connection = await createConnection();
  try {
    // Tạo một liên kết đặt lại mật khẩu (có thể sử dụng token thực tế)
    const resetToken = Math.random().toString(36).substring(2); // Tạo token ngẫu nhiên
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}&email=${email}`;

    // Gửi email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset Your Password',
      text: `Click the link to reset your password: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Reset email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.end();
  }
});

// Đặt lại mật khẩu
app.post('/api/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;
  const connection = await createConnection();
  try {
    await connection.execute('UPDATE users SET password = ? WHERE email = ?', [newPassword, email]);
    res.json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await connection.end();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});