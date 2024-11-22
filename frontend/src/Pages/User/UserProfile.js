import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserProfileService from "../../Services/UserProfileService";

const UserProfile = () => {
  
  const navigate = useNavigate();
  
  function nav() {
    navigate('/editProfile');
  }

  const [Profile, setProfile] = useState({
    firstName: sessionStorage.getItem("firstName") || "",
    lastName: sessionStorage.getItem("lastName") || "",
    email: sessionStorage.getItem("email") || "",
    dob: sessionStorage.getItem("dob") || "",
    phoneNo: sessionStorage.getItem("phoneNo") || "",
    address: sessionStorage.getItem("address") || ""
  });
  
  const userId = sessionStorage.getItem("userId");
  console.log(userId);

  function init() {
    UserProfileService.getPersonalDetailsByUser (userId)
      .then((response) => {
        console.log("User  Profile: ", response.data);
        setProfile(response.data);
      })
      .catch((error) => {
        console.log("Something Went Wrong", error);
      });
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="form-group" style={{ paddingTop: 100, height: "850px", position: "relative", background: `linear-gradient(to right, #B4AEE8 ,#EFEFEF, #93329E)` }}>
      <div style={Styles.container}>
        <div style={Styles.profileContainer}>
          <div className="row" style={Styles.header}>
            <div className="col-6">
              <h2 style={Styles.title}>{Profile.firstName} {Profile.lastName}'s Profile</h2>
            </div>
            <div className="col-6" style={{ textAlign: "right" }}>
              <button className="btn btn-outline-primary" style={Styles.buttonStyle} onClick={nav}><b>Edit</b></button>
            </div>
          </div>
          
          <hr />
          
          <div className="row">
            <div className="col-12">
              <ProfileDetail label="First Name" value={Profile.firstName} />
              <ProfileDetail label="Last Name" value={Profile.lastName} />
              <ProfileDetail label="Email" value={Profile.email} />
              <ProfileDetail label="Date Of Birth" value={Profile.dob} />
              <ProfileDetail label="Phone Number" value={Profile.phoneNo} />
              <ProfileDetail label="Address" value={Profile.address} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileDetail = ({ label, value }) => {
  return (
    <div style={Styles.profileRow}>
      <span style={Styles.profileLabel}>{label}:</span>
      <span style={Styles.profileValue}>{value}</span>
    </div>
  );
};

const Styles = {
  container: {
    borderColor: "crimson",
    width: "850px",
    height: "435px",  
    margin: "auto",
    marginTop: "1vw",
    borderRadius: 20,
    padding: "30px",
    boxShadow: "2px 2px 25px 1px #B3B3B3",
  },
  profileContainer: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "800px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "20px",
  },
  title: {
    fontSize: "25px",
    fontWeight: "600",
    fontFamily: "Georgia, serif", 
    color: "#143F6B",
  },
  buttonStyle: {
    fontSize: "16px",
    padding: "8px 16px",
    borderRadius: "5px",
    border: "1px solid #007bff",
    color: "#007bff",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  profileRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    fontSize: "18px",
  },
  profileLabel: {
    fontWeight: "bold",
    fontSize: "18px",
    color: "#333",
  },
  profileValue: {
    fontSize: "18px",
    color: "#555",
  }
};

export default UserProfile;