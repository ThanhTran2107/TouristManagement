import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [token, setToken] = useState('');
  const [isHoveredConfirm, setIsHoveredConfirm] = useState(false);
  const [isHoveredReset, setIsHoveredReset] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await sendResetNotify(email);
      toast.success(result);
      setIsResetting(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    if (!password || !confirmPassword) {
      toast.error("Please enter your password and confirm it");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    console.log("Loading before password reset:", loading); // Kiểm tra giá trị loading

    try {
      const result = await resetPassword(token, password);
      toast.success(result);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      console.log("Loading after password reset:", loading); // Kiểm tra giá trị loading
    }
  };

  const sendResetNotify = async (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Email Available To Reset");
      }, 1000);
    });
  };

  const resetPassword = async (token, newPassword) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Password has been reset successfully");
      }, 1000);
    });
  };

  return (
    <div style={styles.background}>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg" style={styles.card}>
              <div className="card-body">
                <h2 className="text-center mb-4" style={styles.title}><b>Reset Password</b></h2>
                <p className="text-center text-muted" style={styles.description}>
                  Enter your email address below and we'll reset your password
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
                    style={{ 
                      ...styles.button, 
                      backgroundColor: isHoveredConfirm ? '#892318' : '#e02c18', 
                      color: 'white' 
                    }} 
                    onMouseEnter={() => setIsHoveredConfirm(true)} 
                    onMouseLeave={() => setIsHoveredConfirm(false)} 
                    disabled={loading}
                  >
                    <b>{loading ? 'Sending...' : 'Confirm'}</b>
                  </button>
                </form>

                {isResetting && (
                  <form onSubmit={handlePasswordSubmit} className="mt-4">
                    <div className="form-group">
                      <label htmlFor="password" style={styles.labelNewPassword}>New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirmPassword" style={styles.labelConfirmPassworđ}>Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="btn btn-block mt-3" 
                      style={{ 
                        ...styles.button, 
                        backgroundColor: isHoveredReset ? '#892318' : '#e02c18', 
                        color: 'white' 
                      }} 
                      onMouseEnter={() => setIsHoveredReset(true)} 
                      onMouseLeave={() => setIsHoveredReset(false)} 
                      disabled={loading}
                    >
                      <b>{loading ? 'Resetting...' : 'Reset'}</b>
                    </button>
                  </form>
                )}

                <div className="text-center mt-3">
                  <Link 
                    to="/signIn" 
                    style={{ 
                      ...styles.link, 
                      color: isHovered ? styles.linkHover.color : styles.link.color 
                    }}
                    onMouseEnter={() => setIsHovered(true)} 
                    onMouseLeave={() => setIsHovered(false)} 
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
  },
  label: {
    marginBottom: '5px',
  },
  labelNewPassword: {
    marginBottom: '5px',
  },
  labelConfirmPassworđ: {
    marginBottom: '5px',
    marginTop: '15px',
  },
  link: {
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    color: 'blue', // Màu mặc định
  },
  linkHover: {
    color: 'green', // Màu khi hover
  },
};

export default ForgotPassword;