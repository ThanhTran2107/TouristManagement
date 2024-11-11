import React from 'react'
import { useEffect, useState } from 'react'
//import { Link } from "react-router-dom"
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import UserServices from '../../Services/UserServices';

export const SignUp = () => {

  const [value, setValue] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "", password: "", role: "", firstName: "", lastName: "", dob: "", address: "", phoneNo: ""
  });
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => { document.title = "SignUp"; }, [])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function checkPasswordComplexity(pwd) {

    var regularExpression = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
    var valid = regularExpression.test(pwd);
    return valid;
  }

  function valid(data, confirmPassword) {
    if (data.email.length === 0) {
      toast.error("Please Enter Email");
    }
    else if (data.password.length === 0) {
      toast.error("Please Enter Password");
    }
    else if (data.password.length < 6 || data.password.length > 15) {
      toast.error("Password Length Should Be Between 6 to 15");
    }
    else if (!checkPasswordComplexity(data.password)) {
      toast.error("Password Must Contain At Least A Lowercase Letter, Uppercase Letter, number and Special Character");
    }
    else if (data.password !== confirmPassword) {
      toast.error("Password And Confirm Password Must Match");
    }
    else if (data.role.length === 0) {
      toast.error("Choose Role Between Admin And User");
    }
    else if (data.firstName.length === 0) {
      toast.error("Please Enter First Name");
    }
    else if (data.lastName.length === 0) {
      toast.error("Please Enter Last Name");
    }
    else if (data.dob.length === 0) {
      toast.error("Please Enter Date Of Birth");
    }
    else if (data.address.length === 0) {
      toast.error("Please Enter Address");
    }
    else if (data.phoneNo.length === 0) {
      toast.error("Please Enter Phone Number");
    }
    else {
      return true;
    }
  }

  async function handleSignUp(event) {
    event.preventDefault();

    if (valid(state, confirmPassword)) {
      UserServices.createUser(state)
        .then(response => {
          console.log("User Added Successfully", response.data);
          toast.success("User Added successfully!")
          window.alert("User Added successfully!")

          setState({ email: "", password: "", role: "", firstName: "", lastName: "", dob: "", address: "", phoneNo: "" });
          setConfirmPassword("");

          navigate('/signIn')
        })
        .catch(error => {
          toast.error("ENTER DATA PROPERLY !!!!")
          console.log('Something Went Wrong', error);
        })
    }
  }




  return (
    <div style={{ background: `linear-gradient(to right, #D2DAFF ,#EFEFEF, #B1B2FF)`, height: "100vh" }} ><br />

      <form onSubmit={handleSignUp}>
        <div style={styles.container}>

          <div>
            <h2 style={styles.SignupText}><b>Sign Up</b></h2>
          </div>

          <div className="mb-3 ">
            <label>Email</label>
            <input onChange={handleInputChange} className='form-control'
              type='email' placeholder="Email" required name="email" value={state.email}
            />
          </div>

          <div className='mb-3'>
            <label>Password</label>
            <input
              onChange={handleInputChange}
              className='form-control'
              type='password' placeholder="Password" name="password" value={state.password}
            />
          </div>

          <div className='mb-3'>
            <label>Confirm Password</label>
            <input
              onChange={(event) => {
                setConfirmPassword(event.target.value)
              }}
              className='form-control'
              type='password' placeholder="Confirm Password" name="confirmPassword" value={confirmPassword}
            />
          </div>

          <div className="mb-3">
            <label>Role</label>
            <select 
              onChange={handleInputChange} 
              className='form-control' 
              name="role" 
              value={state.role}
            >
              <option value="">Role</option>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          <div className="mb-3">
            <label>First Name</label>
            <input onChange={handleInputChange} className='form-control'
              type='text' placeholder="First Name" name="firstName" value={state.firstName}
            />
          </div>

          <div className="mb-3">
            <label>Last Name</label>
            <input onChange={handleInputChange} className='form-control'
              type='text' placeholder="Last Name" name="lastName" value={state.lastName}
            />
          </div>

          <div className="mb-3">
            <label>Date Of Birth</label>
            <input onChange={handleInputChange} className='form-control'
              type='date' placeholder="Date Of Birth" name="dob" value={state.dob}
            />
          </div>

          <div className="mb-3">
            <label>Address</label>
            <input onChange={handleInputChange} className='form-control'
              type='text' placeholder="Address" name="address" value={state.address}
            />
          </div>

          <div className="mb-3">
            <label>Phone Number</label>
            <input onChange={handleInputChange} className='form-control'
              type='number' placeholder="Phone Number" name="phoneNo" value={state.phoneNo}
            />
          </div>

          <div style={{ marginTop: 20, marginLeft: 10 }}>
            <i>Already have an account? </i><Link to='/signIn'>Login</Link>
          </div >

          <div className='mb-3' style={{ marginTop: 15 }}>
            <button style={styles.signupButton} >Sign up</button>
          </div>
        </div>
      </form>
    </div>
  )

}


const styles = {
  container: {
    borderColor: "crimson",

    width: 500,
    margin: "auto",
    marginTop: "8vw",
    borderRadius: 20,
    padding: "30px",

    borderRadius: 10,
    broderWidth: 1,
    backgroundColor: "white",

    boxShadow: "3px 3px 10px 2px #576F72",
  },
  signupButton: {
    position: 'relative',
    width: '100%',
    height: 40,
    backgroundColor: '#BC012E',
    color: 'white',
    borderRadius: 15,
    border: 'none',

    // marginTop:20,

  },

  SignupText: {
    textAlign: "center",
    color: "#022831",
    fontFamily: 'Signika Negative',
    fontStyle: " sans-serif;",
    marginTop: 10,
    //border: '1px solid red'
  }
}
