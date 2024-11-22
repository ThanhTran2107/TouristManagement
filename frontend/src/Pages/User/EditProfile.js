import React, { useState, useEffect } from "react";
import UserProfileService from "../../Services/UserProfileService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
  const [isHovered, setIsHovered] = useState(false);

  let userId = sessionStorage.getItem("userId");

  const checkPasswordComplexity = (pwd) => {
    const regularExpression =
      /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
    return regularExpression.test(pwd);
  };

  const updateProfile = (e) => {
    e.preventDefault();
    if (phoneNo.length !== 10) {
      toast.error("Mobile no. should be of length 10");
    } else if (address.length < 5 || address.length > 50) {
      toast.error(
        "Address must be of min 5 characters and of max 50 characters"
      );
    } else if (!checkPasswordComplexity(password)) {
      toast.error(
        "Password Must Contain At Least A Number And Special Character"
      );
    } else {
      const profile = {
        firstName,
        lastName,
        password,
        email,
        dob,
        phoneNo,
        address,
      };

      if (userId) {
        UserProfileService.editProfile(profile, userId)
          .then(() => {
            toast.success("Profile updated successfully");
            sessionStorage.setItem("firstName", firstName);
            sessionStorage.setItem("lastName", lastName);
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("dob", dob);
            sessionStorage.setItem("phoneNo", phoneNo);
            sessionStorage.setItem("address", address);

            navigate("/userProfile");
            window.location.reload();
          })
          .catch((error) => {
            toast.error("Something went wrong");
          });
      }
    }
  };

  const init = () => {
    if (userId) {
      UserProfileService.getPersonalDetailsByUser(userId)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setPassword(response.data.password);
          setDob(response.data.dob);
          setPhoneNo(response.data.phoneNo);
          setAddress(response.data.address);
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="form-group" style={styles.formGroup}>
      <form onSubmit={updateProfile}>
        <div style={styles.container}>
          <h2 style={styles.SignupText}>
            <b>Update Profile</b>
          </h2>

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
            <button
              type="submit"
              style={{
                ...styles.Button,
                ...(isHovered ? styles.ButtonHover : {}),
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const styles = {
  formGroup: {
    paddingTop: 90,
    height: "850px",
    position: "relative",
    background: `linear-gradient(to right, #B4AEE8 ,#EFEFEF, #93329E)`,
  },
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
    backgroundColor: "#e02c18",
    color: "white",
    borderRadius: 10,
    border: "none",
    marginTop: 20,
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.3s",
    fontWeight: "bold",
  },
  ButtonHover: {
    backgroundColor: "#892318",
  },
  SignupText: {
    textAlign: "center",
    color: "#022831",
    fontFamily: "Signika Negative",
    fontStyle: "sans-serif",
    marginTop: 10,
  },
};

export default EditProfile;
