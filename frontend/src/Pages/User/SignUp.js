import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserServices from '../../Services/UserServices';

export const SignUp = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "", 
    password: "", 
    role: "USER", 
    firstName: "", 
    lastName: "", 
    dob: "", 
    address: "", 
    phoneNo: ""
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => { document.title = "SignUp"; }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function checkPasswordComplexity(pwd) {
    var regularExpression = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
    return regularExpression.test(pwd);
  }

  function valid(data, confirmPassword) {
    if (data.email.length === 0) {
      toast.error("Please Enter Email");
    } else if (data.password.length === 0) {
      toast.error("Please Enter Password");
    } else if (data.password.length < 6 || data.password.length > 20) {
      toast.error("Password Length Should Be Between 6 to 20");
    } else if (!checkPasswordComplexity(data.password)) {
      toast.error("Password Must Contain At Least A Number And Special Character");
    } else if (data.password !== confirmPassword) {
      toast.error("Password And Confirm Password Must Match");
    } else if (data.role.length === 0) {
      toast.error("Choose Role Between Admin And User");
    } else if (data.firstName.length === 0) {
      toast.error("Please Enter First Name");
    } else if (data.lastName.length === 0) {
      toast.error("Please Enter Last Name");
    } else if (data.dob.length === 0) {
      toast.error("Please Enter Date Of Birth");
    } else if (data.address.length === 0) {
      toast.error("Please Enter Address");
    } else if (data.phoneNo.length === 0) {
      toast.error("Please Enter Phone Number");
    } else {
      return true;
    }
  }

  async function handleSignUp(event) {
    event.preventDefault();

    if (valid(state, confirmPassword)) {
        try {
            const response = await UserServices.createUser (state);
            console.log("User  Added Successfully", response.data);
            toast.success("User  Added successfully!");
            setState({ email: "", password: "", role: "USER", firstName: "", lastName: "", dob: "", address: "", phoneNo: "" });
            setConfirmPassword("");

            navigate('/signIn');
        } catch (error) {
            toast.error("ENTER DATA PROPERLY !!!!");
            console.log('Something Went Wrong', error);
        }
    }
}

  return (
    <div style={{ background: `linear-gradient(to right, #D2DAFF ,#EFEFEF, #B1B2FF)`, height: "155vh" }}><br />
      <form onSubmit={handleSignUp}>
        <div style={styles.container}>
          <div>
            <h2 style={styles.SignupText}><b>Sign Up</b></h2>
          </div>

          <div className="mb-3 ">
            <label>Email</label>
            <input 
              onChange={handleInputChange} 
              className='form-control'
              type='email' 
              placeholder="Email" 
              required 
              name="email" 
              value={state.email}
            />
          </div>

          <div className='mb-3'>
            <label>Password</label>
            <input
              onChange={handleInputChange}
              className='form-control'
              type='password' 
              placeholder="Password" 
              name="password" 
              value={state.password}
            />
          </div>

          <div className='mb-3'>
            <label>Confirm Password</label>
            <input
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
              className='form-control'
              type='password' 
              placeholder="Confirm Password" 
              name="confirmPassword" 
              value={confirmPassword}
            />
          </div>

          <div className="mb-3">
            <label>Role</label>
            <input 
              className='form-control' 
              type='text' 
              placeholder="Role" 
              name="role" 
              value={state.role} 
              readOnly 
            />
          </div>

          <div className="mb-3">
            <label>First Name</label>
            <input 
              onChange={handleInputChange} 
              className='form-control'
              type='text' 
              placeholder="First Name" 
              name="firstName" 
              value={state.firstName}
            />
          </div>

          <div className="mb-3">
            <label>Last Name</label>
            <input 
              onChange={handleInputChange} 
              className='form-control'
              type='text' 
              placeholder="Last Name" 
              name="lastName" 
              value={state.lastName}
            />
          </div>

          <div className="mb-3">
            <label>Date Of Birth</label>
            <input 
              onChange={handleInputChange} 
              className='form-control'
              type='date' 
              placeholder="Date Of Birth" 
              name="dob" 
              value={state.dob}
            />
          </div>

          <div className="mb-3">
            <label>Address</label>
            <input 
              onChange={handleInputChange} 
              className='form-control'
              type='text' 
              placeholder="Address" 
              name="address" 
              value={state.address}
            />
          </div>

          <div className="mb-3">
            <label>Phone Number</label>
            <input 
              onChange={handleInputChange} 
              className='form-control'
              type='number' 
              placeholder="Phone Number" 
              name="phoneNo" 
              value={state.phoneNo}
            />
          </div>

          <div style={{ marginTop: 20, marginLeft: 10 }}>
              Already have an account ?
            <LinkWithHover to='/signIn'><i> Login</i></LinkWithHover>
          </div>

          <div className='mb-3' style={{ marginTop: 15 }}>
            <button 
              style={{ 
                ...styles.signupButton, 
                ...(isHovered ? styles.signupButtonHover : {})
              }} 
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleSignUp}
            >
              <b>Sign Up</b>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    borderColor: "crimson",
    width: 500,
    margin: "auto",
    marginTop: "8vw",
    borderRadius: 20,
    padding: "30px",
    backgroundColor: "white",
    boxShadow: "3px 3px 10px 2px #576F72",
  },
  signupButton: {
    position: 'relative',
    width: '100%',
    height: 40,
    backgroundColor: '#e02c18',
    color: 'white',
    borderRadius: 15,
    border: 'none',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  signupButtonHover: {
    backgroundColor: '#892318',
  },
  SignupText: {
    textAlign: "center",
    color: "#022831",
    fontFamily: 'Signika Negative',
    marginTop: 10,
  }
}

const LinkWithHover = ({ to, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={to}
      style={{
        textDecoration: 'none',
        color: isHovered ? 'green' : 'blue',
        transition: 'color 0.3s ease',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  );
};

export default SignUp;