import React from "react";
import { Link } from "react-router-dom";
const tourPic = require("../../images/tourList.png");
const addTourPic = require("../../images/addTour.png");
const bookPic = require("../../images/book.png");
const account_management = require("../../images/account_management.png");

const Admin = () => {
  return (
    <div
      style={{
        background: `linear-gradient(to right, #D2DAFF ,#EFEFEF, #B1B2FF)`,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={Styles.container}>
        <div style={Styles.cardContainer}>
          <Card image={account_management} title="Accounts" link="/accounts" />
          <Card image={tourPic} title="Tour List" link="/tourTable" />
          <Card image={addTourPic} title="Add Tour" link="/addTour" />
          <Card image={bookPic} title="Confirmation" link="/bookingDetails" />
        </div>
      </div>
    </div>
  );
};

const Card = ({ image, title, link }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div style={Styles.card}>
      <img src={image} style={Styles.imageStyle} alt={title} />
      <Link
        to={link}
        style={{
          ...Styles.buttonStyle,
          backgroundColor: isHovered ? "#892318" : Styles.buttonStyle.backgroundColor,
          transform: isHovered ? "scale(1.05)" : "scale(1)", 
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {title}
      </Link>
    </div>
  );
};

const Styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  title: {
    fontSize: "2.5rem",
    color: "#333",
    marginBottom: "20px",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  card: {
    width: "200px",
    margin: "50px",
    padding: "20px",
    textAlign: "center",
    transition: "transform 0.2s",
  },
  imageStyle: {
    width: '150px',
    height: '150px',
    marginBottom: '10px',
  },
  buttonStyle: {
    display: "inline-block",
    backgroundColor: "#e02c18",
    color: "white",
    borderRadius: "5px",
    border: "none",
    padding: "10px 20px",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "background-color 0.3s, transform 0.3s",
  },
};

export default Admin;