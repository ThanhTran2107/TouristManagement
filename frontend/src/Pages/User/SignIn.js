import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import swal from "sweetalert";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth, provider, facebookProvider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
const gmailImage = require("../../images/gmail.png");
const facebookImage = require("../../images/facebook.png");

export const SignIn = (props) => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sign In";
  }, []);

  function checkPasswordComplexity(pwd) {
    var regularExpression =
      /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
    return regularExpression.test(pwd);
  }

  function valid(data) {
    if (data.email.length === 0) {
      toast.error("Please Enter Email");
      return false;
    } else if (data.password.length === 0) {
      toast.error("Please Enter Password");
      return false;
    } else if (data.password.length < 6 || data.password.length > 20) {
      toast.error("Password Length Should Be Between 6 to 20");
      return false;
    } else if (!checkPasswordComplexity(data.password)) {
      toast.error(
        "Password Must Contain At Least A Number And Special Character"
      );
      return false;
    }
    return true;
  }

  async function handleLogin(event) {
    event.preventDefault();
    const data = { email, password };

    try {
      if (valid(data)) {
        const response = await axios.post(
          "http://localhost:9090/user/signIn",
          data
        );
        if (response.data) {
          const result = response.data;
          console.log(result);

          sessionStorage.setItem("token", result.token); 
          sessionStorage.setItem("userId", result.userId);
          sessionStorage.setItem("role", result.role);
          sessionStorage.setItem("email", result.email);
          sessionStorage.setItem("firstName", result.firstName);
          sessionStorage.setItem("lastName", result.lastName);
          sessionStorage.setItem("dob", response.data.dob);
          sessionStorage.setItem("address", response.data.address);
          sessionStorage.setItem("phoneNo", response.data.phoneNo);

          if (result.role === "USER") {
            swal(
              "Success",
              "USER Logged In Successfully\n Customer Username : " +
                result.email,
              "success"
            );
            navigate("/");
            window.location.reload();
          } else if (result.role === "ADMIN") {
            swal(
              "Success",
              "ADMIN Logged In Successfully\n Admin Username : " + result.email,
              "success"
            );
            navigate("/admin");
            window.location.reload();
          }
        } else {
          toast.error("Invalid Credentials");
        }
      }
    } catch (error) {
      console.log("invalid");
      toast.error("Invalid Credentials!!");
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const response = await axios.post("http://localhost:9090/user/social", {
        email: user.email,
        firstName: user.displayName.split(" ")[0],
        lastName: user.displayName.split(" ").slice(1).join(" ") || "N/A",
        dob: "2000-01-01",
        address: "there is no address",
        phoneNo: "0909090909",
        role: "USER",
        password: "secret@123",
      });

      if (response.data) {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("userId", response.data.userId);
        sessionStorage.setItem("email", user.email);
        sessionStorage.setItem("firstName", response.data.firstName);
        sessionStorage.setItem("lastName", response.data.lastName);
        sessionStorage.setItem("dob", response.data.dob);
        sessionStorage.setItem("address", response.data.address);
        sessionStorage.setItem("phoneNo", response.data.phoneNo);
        sessionStorage.setItem("role", response.data.role);

        swal(
          "Success",
          "Logged In Successfully\n User Email: " + user.email,
          "success"
        );
        navigate("/");
        window.location.reload();
      } else {
        toast.error("Failed to save user information!");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
      toast.error("Failed to login with Google!");
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;

      const response = await axios.post("http://localhost:9090/user/social", {
        email: user.email,
        firstName: user.displayName.split(" ")[0],
        lastName: user.displayName.split(" ").slice(1).join(" ") || "N/A",
        dob: "2000-01-01",
        address: "there is no address",
        phoneNo: "0909090909",
        role: "USER",
        password: "secret@123",
      });

      if (response.data) {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("userId", response.data.userId);
        sessionStorage.setItem("email", user.email);
        sessionStorage.setItem("firstName", response.data.firstName);
        sessionStorage.setItem("lastName", response.data.lastName);
        sessionStorage.setItem("dob", response.data.dob);
        sessionStorage.setItem("address", response.data.address);
        sessionStorage.setItem("phoneNo", response.data.phoneNo);
        sessionStorage.setItem("role", response.data.role);

        swal(
          "Success",
          "Logged In Successfully\n User Email: " + user.email,
          "success"
        );
        navigate("/");
        window.location.reload();
      } else {
        toast.error("Failed to save user information!");
      }
    } catch (error) {
      console.error("Error during Facebook login:", error);
      toast.error("Failed to login with Facebook! " + error.message);
    }
  };

  return (
    <div style={styles.background}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>
          <b>Login</b>
        </h2>

        <div className="mb-3">
          <label>Email</label>
          <input
            onChange={(event) => setEmail(event.target.value)}
            className="form-control"
            type="email"
            placeholder="Email"
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <div className="input-group">
            <input
              onChange={(event) => setPassword(event.target.value)}
              className="form-control"
              type={showPassword ? "text" : "password"}
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
          <LinkWithHover to="/signup">
            <i>Don't have an account ?</i>
          </LinkWithHover>
          <LinkWithHover to="/forgotpassword">
            <i>Forgot password ?</i>
          </LinkWithHover>
        </div>

        <div className="mb-3" style={{ marginTop: 15 }}>
          <button
            style={{
              ...styles.signinButton,
              ...(isHovered ? styles.signinButtonHover : {}),
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            type="submit"
          >
            <b>Login</b>
          </button>
        </div>

        <div className="mb-3" style={{ textAlign: "center" }}>
          <div style={{ display: "inline-block", marginRight: "65px" }}>
            <img
              src={gmailImage}
              alt="Login with Google"
              onClick={handleGoogleLogin}
              style={{
                cursor: "pointer",
                width: "50px",
                height: "50px",
              }}
            />
          </div>
          <div style={{ display: "inline-block", marginLeft: "70px" }}>
            <img
              src={facebookImage}
              alt="Login with Facebook"
              onClick={handleFacebookLogin}
              style={{
                cursor: "pointer",
                width: "40px",
                height: "40px",
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

const styles = {
  background: {
    background: `linear-gradient(to right, #D2DAFF ,#EFEFEF, #B1B2FF)`,
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    borderColor: "crimson",
    width: 400,
    borderRadius: 20,
    padding: "30px",
    backgroundColor: "white",
    boxShadow: "3px 3px 10px 2px #576F72",
    height: 410,
  },
  title: {
    textAlign: "center",
    color: "#022831",
    fontFamily: "Signika Negative",
    marginBottom: 20,
  },
  signinButton: {
    position: "relative",
    width: "100%",
    height: 40,
    backgroundColor: "#e02c18",
    color: "white",
    borderRadius: 10,
    border: "none",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
  signinButtonHover: {
    backgroundColor: "#892318",
  },
  linkContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 20,
    color: "blue",
  },
  link: {
    textDecoration: "none",
    color: "blue",
    transition: "color 0.3s ease",
  },
  linkHover: {
    color: "green",
  },
};

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
