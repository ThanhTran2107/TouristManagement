import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';

export const SignIn = (props) => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sign In";
  }, []);

  function checkPasswordComplexity(pwd) {
    var regularExpression = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
    return regularExpression.test(pwd);
  }

  function valid(data) {
    if (data.email.length === 0) {
      toast.error("Please Enter Email");
    } else if (data.password.length === 0) {
      toast.error("Please Enter Password");
    } else if (data.password.length < 6 || data.password.length > 15) {
      toast.error("Password Length Should Be Between 6 to 15");
    } else if (!checkPasswordComplexity(data.password)) {
      toast.error("Password Must Contain At Least A Number And Special Character");
    } else {
      return true;
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    const data = { email, password };

    try {
      if (valid(data)) {
        const response = await axios.post('http://localhost:9090/user/signIn', data);
        if (response.data) {
          const result = response.data;
          console.log(result);

          sessionStorage["userId"] = result.userId;
          sessionStorage["role"] = result.role;
          sessionStorage["email"] = result.email;
          sessionStorage["firstName"] = result.firstName;
          sessionStorage["lastName"] = result.lastName;

          if (response.data.role === "USER") {
            swal("Success", "USER Logged In Successfully\n Customer Username : " + response.data.email, "success");
            navigate('/');
            window.location.reload();
          } else if (response.data.role === "ADMIN") {
            swal("Success", "ADMIN Logged In Successfully\n Admin Username : " + response.data.email, "success");
            navigate('/admin');
            window.location.reload();
          }
        } else {
          toast.error('Invalid Credentials');
        }
      }
    } catch (error) {
      console.log("invalid");
      toast.error("Invalid Credentials!!");
    }
  }

  return (
    <div style={styles.background}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}><b>Login</b></h2>

        <div className="mb-3">
          <label>Email</label>
          <input 
            onChange={(event) => setEmail(event.target.value)} 
            className='form-control' 
            type='email' 
            placeholder="Email" 
          />
        </div>

        <div className='mb-3'>
          <label>Password</label>
          <div className="input-group">
            <input
              onChange={(event) => setPassword(event.target.value)}
              className='form-control'
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i className="fas fa-eye-slash"></i>
              ) : (
                <i className="fas fa-eye"></i>
              )}
            </button>
          </div>
        </div>

        <div style={styles.linkContainer}>
          <LinkWithHover to='/signup'>Don't have an account?</LinkWithHover>
          <LinkWithHover to='/forgot-password'>Forgot password?</LinkWithHover>
        </div>

        <div className='mb-3' style={{ marginTop: 15 }}>
          <button 
            style={{ 
              ...styles.signinButton, 
              ...(isHovered ? styles.signinButtonHover : {})
            }} 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleLogin}
          >
            <b>Login</b>
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  background: {
    background: `linear-gradient(to right, #D2DAFF ,#EFEFEF, #B1B2FF)`,
    height: "100vh",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    borderColor: "crimson",
    width: 400,
    borderRadius: 20,
    padding: "30px",
    backgroundColor: "white",
    boxShadow: "3px 3px 10px 2px #576F72",
  },
  title: {
    textAlign: "center",
    color: "#022831",
    fontFamily: 'Signika Negative',
    marginBottom: 20,
  },
  signinButton: {
    position: 'relative',
    width: '100%',
    height: 40,
    backgroundColor: '#e02c18',
    color: 'white',
    borderRadius: 15,
    border: 'none',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  signinButtonHover: {
    backgroundColor: '#892318',
  },
  linkContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 20,
    color: 'blue',
  },
  link: {
    textDecoration: 'none',
    color: 'blue',
    transition: 'color 0.3s ease',
  },
  linkHover: {
    color: 'green',
  },
}

const LinkWithHover = ({ to, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={to}
      style={{ ...styles.link, ...(isHovered ? styles.linkHover : {}) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  );
};

export default SignIn;