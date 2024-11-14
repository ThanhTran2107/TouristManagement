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

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const exists = checkEmailExists(email);
      if (exists) {
        setIsResetting(true);
      } else {
        toast.error("Email does not exist");
      }
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
    try {
      const result = resetPassword(email, password);
      toast.success(result);
      // Reset form after successful password reset
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setIsResetting(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const checkEmailExists = (email) => {
    const storedEmails = JSON.parse(localStorage.getItem('email')) || [];
    return storedEmails.map(e => e.toLowerCase()).includes(email.toLowerCase());
};
  const resetPassword = (email, newPassword) => {
    // Simulate password reset in the session storage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = storedUsers.findIndex(user => user.email === email);
    if (userIndex !== -1) {
      storedUsers[userIndex].password = newPassword; // Update password
      localStorage.setItem('users', JSON.stringify(storedUsers));
      return "Password has been reset successfully";
    } else {
      throw new Error("User  not found");
    }
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
                    style={styles.button} 
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
                      <label htmlFor="confirmPassword" style={styles.labelConfirmPassword}>Confirm Password</label>
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
                      style={styles.button} 
                      disabled={loading}
                    >
                      <b>{loading ? 'Resetting...' : 'Reset'}</b>
                    </button>
                  </form>
                )}

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
  labelNewPassword: {
    marginBottom: '5px',
  },
  labelConfirmPassword: {
    marginBottom: '5px',
    marginTop: '15px',
  },
  link: {
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    color: 'blue',
  },
};

export default ForgotPassword;