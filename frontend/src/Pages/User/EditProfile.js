import React, { useState, useEffect } from "react";
import UserProfileService from "../../Services/UserProfileService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const EditProfile = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false); 

  let userId = sessionStorage.getItem("userId");
  console.log(userId);

  function checkPasswordComplexity(pwd) {
    var regularExpression = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
    return regularExpression.test(pwd);
  }

  const checkEmailExists = (email) => {
    const storedEmails = JSON.parse(localStorage.getItem('email')) || [];
    return storedEmails.map(e => e.toLowerCase()).includes(email.toLowerCase());
  };

  const updateProfile = (e) => {
    e.preventDefault();
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      toast.error("Mobile no. should be of length 10");
    } else if (address.length < 5 || address.length > 50) {
      toast.error('Address must be of min 5 characters and of max 50 characters');
    } else if (!checkPasswordComplexity(password)) { 
      toast.error("Password Must Contain At Least A Number And Special Character");
    } else {
      const profile = { firstName, lastName, password, email, dob, phoneNo, address };
  
      if (userId) {
        UserProfileService.editProfile(profile, userId)
          .then((response) => {
            console.log("User  Profile updated successfully: ", response.data);
            toast.success("Profile updated successfully");
  
            sessionStorage.setItem("firstName", firstName);
            sessionStorage.setItem("lastName", lastName);
            sessionStorage.setItem("email", email);
            const exists = checkEmailExists(email);
            sessionStorage.setItem("dob", dob);
            sessionStorage.setItem("phoneNo", phoneNo);
            sessionStorage.setItem("address", address);
            
  
            if (exists) {
              const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
              const userIndex = storedUsers.findIndex(user => user.email === email);
              if(userIndex){
                storedUsers[userIndex].password = password;
              }
              localStorage.setItem('users', JSON.stringify(storedUsers));
            }
            navigate('/userProfile');
            window.location.reload(); 

          })
          .catch((error) => {
            console.log("Something went wrong", error);
            toast.error("Something went wrong");
          });
      }
    }
  };

  function init() {
    if (userId) {
      UserProfileService.getPersonalDetailsByUser (userId)
        .then((response) => {
          console.log(response.data);
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setPassword(response.data.password);
          setDob(response.data.dob);
          setPhoneNo(response.data.phoneNo);
          setAddress(response.data.address);
        })
        .catch((error) => {
          console.log('Something went wrong', error);
        });
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="form-group" style={{ paddingTop: 90, height: "850px", position: "relative", 
                                            background: `linear-gradient(to right, #B4AEE8 ,#EFEFEF, #93329E)` }}>
      <form onSubmit={updateProfile}>
        <div style={styles.container}>
          <div>
            <h2 style={styles.SignupText}>
              <b>Update Profile</b>
            </h2>
          </div>

          <div className="mb-3">
            <label>First Name</label>
            <input
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              className="form-control"
              type="text"
              placeholder="Enter your First Name"
            />
          </div>

          <div className="mb-3">
            <label>Last Name</label>
            <input
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              className="form-control"
              type="text"
              placeholder="Enter your Last Name"
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="form-control"
              type="email"
              placeholder="Enter your email"
              readOnly
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <div className="input-group">
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="form-control"
                type={showPassword ? "text" : "password"} 
                placeholder="Enter your password"
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)} 
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />} 
                </button>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label>Date Of Birth</label>
            <input
              value={dob}
              onChange={(event) => setDob(event.target.value)}
              className="form-control"
              type="date"
              placeholder="Enter dob"
            />
          </div>

          <div className="mb-3">
            <label>Phone Number</label>
            <input
              value={phoneNo}
              onChange={(event) => setPhoneNo(event.target.value)}
              className="form-control"
              type="number"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="mb-3">
            <label>Address</label>
            <input
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className="form-control"
              type="text"
              placeholder="Enter your address"
            />
          </div>

          <div className="mb-3" style={{ marginTop: 15 }}>
            <button type="submit" style={styles.Button}>
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    borderColor: "crimson",
    width: 400,
    height: 720,  
    margin: "auto",
    marginTop: "1vw",
    borderRadius: 20,
    padding: "30px",
    boxShadow: "2px 2px 25px 1px #B3B3B3",
  },
  Button: {
    position: "relative",
    width: "100%",
    height: 40,
    backgroundColor: "#BC012E",
    color: "white",
    borderRadius: 15,
    border: "none",
    marginTop: 20, 
  },
  SignupText: {
    textAlign: "center",
    color: "#022831",
    fontFamily: "Signika Negative",
    fontStyle: " sans-serif;",
    marginTop: 10,
  },
};

export default EditProfile;