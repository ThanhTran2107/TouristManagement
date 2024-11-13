import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ForgotPasswordService from '../../Services/ForgotPasswordService';
import 'bootstrap/dist/css/bootstrap.min.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isHoveredReset, setIsHoveredReset] = useState(false);
  const [isHoveredLink, setIsHoveredLink] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form
    if (!email) {
      toast.error("Please enter your email"); // Thông báo lỗi nếu email không được nhập
      return;
    }

    setLoading(true); // Bắt đầu trạng thái loading

    try {
      // Gọi dịch vụ để gửi liên kết đặt lại mật khẩu
      const result = await ForgotPasswordService.sendResetLink(email);
      toast.success(result); // Hiển thị thông báo thành công
    } catch (error) {
      toast.error(error.message); // Hiển thị thông báo lỗi
    } finally {
      setLoading(false); // Kết thúc trạng thái loading
    }
  };

  return (
    <div style={styles.background}>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg" style={styles.card}>
              <div className="card-body">
                <h2 className="text-center mb-4" style={styles.title}><b>Forgot Password</b></h2>
                <p className="text-center text-muted" style={styles.description}>
                  Enter your email address below and we'll reset your password
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email" style={styles.label}>Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-block mt-3" 
                    style={{ 
                      ...styles.button, 
                      backgroundColor: isHoveredReset ? '#892318' : '#e02c18'
                    }}
                    onMouseEnter={() => setIsHoveredReset(true)} 
                    onMouseLeave={() => setIsHoveredReset(false)}
                    disabled={loading} // Vô hiệu hóa nút khi đang loading
                  >
                    <b>{loading ? 'Sending...' : 'Reset'}</b>
                  </button>
                  <div className="text-center mt-3">
                    <Link 
                      to="/signIn" 
                      style={{ 
                        ...styles.link, 
                        color: isHoveredLink ? 'green' : 'blue'
                      }}
                      onMouseEnter={() => setIsHoveredLink(true)}
                      onMouseLeave={() => setIsHoveredLink(false)}
                    >
                      <i>Back to login ?</i>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  background: {
    background: `linear-gradient(to right, #D2DAFF ,#EFEFEF, #B1B2FF)`,
    height: "100vh",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: '15px',
    marginBottom: '150px',
  },
  title: {
    fontFamily: 'Signika Negative',
    color: '#343a40',
  },
  description: {
    fontSize: '0.9rem',
  },
  button: {
    border: 'none',
  },
  label: {
    marginBottom: '5px',
    marginLeft: '10px',
  },
  link: {
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
};
// Xuất component ForgotPassword để sử dụng ở nơi khác trong ứng dụng
export default ForgotPassword;