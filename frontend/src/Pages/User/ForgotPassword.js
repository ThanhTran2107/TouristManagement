import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import ForgotPasswordService from '../../Services/ForgotPasswordService';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
        const response = await ForgotPasswordService.checkEmailExist(email);
        if (response.status === 200) {
            const userResponse = await ForgotPasswordService.getPasswordByEmail(email);
            const password = userResponse.data.password; 
            toast.success("Your Password : " + password);
            console.log("Email exists");
        } else {
            // Email không tồn tại
            toast.error("Email does not exist!"); // Hiển thị thông báo lỗi
            console.error("Email does not exist");
        }
    } catch (error) {
        // Xử lý lỗi
        toast.error("An error occurred while checking the email."); // Hiển thị thông báo lỗi
        console.error("Error:", error.response ? error.response.data : error.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div style={styles.background}>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg" style={styles.card}>
              <div className="card-body">
                <h2 className="text-center mb-4" style={styles.title}><b>Restore Password</b></h2>
                <p className="text-center text-muted" style={styles.description}>
                  Enter your email address below and we'll show your password
                </p>
                <form onSubmit={handleEmailSubmit}>
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
                    className="btn btn-block mt-3" 
                    style={styles.button} 
                    disabled={loading}
                  >
                    <b>{loading ? 'Sending...' : 'Confirm'}</b>
                  </button>
                </form>

                <div className="text-center mt-3">
                  <Link 
                    to="/signIn" 
                    style={styles.link}
                  >
                    <i>Back to login?</i>
                  </Link>
                </div>
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
    backgroundColor: '#e02c18',
    color: 'white',
  },
  label: {
    marginBottom: '5px',
  },
  link: {
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    color: 'blue',
  },
};

export default ForgotPassword;