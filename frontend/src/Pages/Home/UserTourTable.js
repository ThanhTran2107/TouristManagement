import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TourServices from "../../Services/TourServices";

const homeIcon = require("../../images/homeIcon.png");
const people = require("../../images/people.png");
const transport = require("../../images/transport.png");
const searchIcon = require("../../images/search-icon.png");
const refreshIcon = require("../../images/refresh.png");

const UserTourTable = () => {
  const [Tours, setTours] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookingAmountFilter, setBookingAmountFilter] = useState("");
  const [tourTypeFilter, setTourTypeFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [expandedImage, setExpandedImage] = useState(null);

  const user = sessionStorage.getItem("userId");
  const uID = user ?? " ";

  const init = () => {
    TourServices.getAllTours()
      .then((response) => {
        console.log("Printing tours", response.data);
        setTours(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  useEffect(() => {
    init();
  }, []);

  const handleImageClick = (imageUrl) => {
    setExpandedImage(imageUrl);
  };

  const handleCloseExpandedImage = () => {
    setExpandedImage(null);
  };

  useEffect(() => {
    if (expandedImage) {
      window.addEventListener("click", handleCloseExpandedImage);

      return () => {
        window.removeEventListener("click", handleCloseExpandedImage);
      };
    }
  }, [expandedImage]);

  const handleRefresh = () => {
    init();
    setSearchTerm("");
    setBookingAmountFilter("");
    setTourTypeFilter("");
    setStartDate("");
  };

  const filteredTours = Tours.filter((tour) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const bookingAmount = tour.bookingAmount;

    const bookingAmountCondition =
      bookingAmountFilter === "Less than 1.000.000"
        ? bookingAmount < 1000000
        : bookingAmountFilter === "1.000.000 - 2.000.000"
        ? bookingAmount >= 1000000 && bookingAmount <= 2000000
        : bookingAmountFilter === "2.000.000 - 3.000.000"
        ? bookingAmount >= 2000000 && bookingAmount <= 3000000
        : bookingAmountFilter === "3.000.000 - 4.000.000"
        ? bookingAmount >= 3000000 && bookingAmount <= 4000000
        : bookingAmountFilter === "4.000.000 - 5.000.000"
        ? bookingAmount >= 4000000 && bookingAmount <= 5000000
        : bookingAmountFilter === "Greater than 5.000.000"
        ? bookingAmount > 5000000
        : true;

    const tourTypeCondition =
      tourTypeFilter === "International"
        ? tour.tourType === "INTERNATIONAL"
        : tourTypeFilter === "Domestic"
        ? tour.tourType === "DOMESTIC"
        : true;

    const startDateCondition = startDate
      ? new Date(tour.tourStartDate) >= new Date(startDate)
      : true;

    return (
      (tour.source.toLowerCase().includes(lowerCaseSearchTerm) ||
        tour.maxSeats.toString().includes(lowerCaseSearchTerm) ||
        tour.transportationMode.toLowerCase().includes(lowerCaseSearchTerm) ||
        tour.tourType.toLowerCase().includes(lowerCaseSearchTerm) ||
        bookingAmount.toString().includes(lowerCaseSearchTerm) ||
        tour.destination.toLowerCase().includes(lowerCaseSearchTerm) ||
        tour.tourName.toLowerCase().includes(lowerCaseSearchTerm)) &&
      bookingAmountCondition &&
      tourTypeCondition &&
      startDateCondition
    );
  });

  const sortedTours = filteredTours.sort(
    (a, b) => a.bookingAmount - b.bookingAmount
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        <b>Available Tours</b>
      </h1>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
               />
        <img src={searchIcon} alt="search icon" style={styles.searchIcon} />
        <button style={styles.refreshButton} onClick={handleRefresh}>
          <img
            src={refreshIcon}
            alt="refresh icon"
            style={styles.refreshIcon}
          />
        </button>
        <select
          value={bookingAmountFilter}
          onChange={(e) => setBookingAmountFilter(e.target.value)}
          style={styles.bookingAmountSelect}
        >
          <option value="">All Booking Amounts</option>
          <option value="Less than 1.000.000">Less than 1.000.000</option>
          <option value="1.000.000 - 2.000.000">1.000.000 - 2.000.000</option>
          <option value="2.000.000 - 3.000.000">2.000.000 - 3.000.000</option>
          <option value="3.000.000 - 4.000.000">3.000.000 - 4.000.000</option>
          <option value="4.000.000 - 5.000.000">4.000.000 - 5.000.000</option>
          <option value="Greater than 5.000.000">Greater than 5.000.000</option>
        </select>
        <select
          value={tourTypeFilter}
          onChange={(e) => setTourTypeFilter(e.target.value)}
          style={styles.tourTypeSelect}
        >
          <option value="">All Tour Types</option>
          <option value="International">International</option>
          <option value="Domestic">Domestic</option>
        </select>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={styles.dateInput}
        />
      </div>
      <div style={styles.row}>
        {sortedTours.map((tour) => {
          const startDate = new Date(tour.tourStartDate);
          const endDate = new Date(tour.tourEndDate);
          const duration = Math.ceil(
            (endDate - startDate + 1) / (1000 * 60 * 60 * 24)
          );

          return (
            <div key={tour.tourId} style={styles.cardContainer}>
              <div style={styles.card}>
                <img
                  src={tour.tourImage}
                  alt="Tour"
                  style={styles.tourImage}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(tour.tourImage);
                  }}
                />
                <h4 style={styles.cardTitle}>{tour.tourName}</h4>
                <p style={styles.cardSubtitle}>
                  {tour.source} to {tour.destination}
                </p>
                <span style={{ marginRight: "10px" }}>
                  <img src={homeIcon} alt="home icon" style={styles.icon} />
                  {duration} days
                </span>
                <span style={{ marginRight: "10px" }}>
                  <img src={people} alt="people icon" style={styles.icon} />
                  {tour.maxSeats} seats
                </span>
                <span>
                  <img
                    src={transport}
                    alt="transport icon"
                    style={styles.icon}
                  />
                  {tour.transportationMode}
                </span>
                <h5 style={styles.cardActivities}>
                  Activities: <b>{tour.activities}</b>
                </h5>
                <h5 style={styles.cardDetails}>
                  Tour Type: <b>{tour.tourType}</b>
                </h5>
                <h5 style={styles.cardDetails}>
                  Tour Details: <b>{tour.tourDetailInfo}</b>
                </h5>
                <p>
                  <b>Start Date:</b> {tour.tourStartDate} | <b>End Date:</b>{" "}
                  {tour.tourEndDate}
                </p>
                <p style={{ marginTop: "-7px" }}>
                  <b>Departure Time:</b> {tour.departureTime}
                </p>
                <h2 style={styles.price}>
                  {new Intl.NumberFormat("vi-VN").format(tour.bookingAmount)}{" "}
                  VND /-
                </h2>
                <h6 style={styles.perPerson}>per person</h6>
                {uID !== " " && (
                  <Link
                    to={tour.maxSeats > 0 ? `/add-tourists` : "#"}
                    state={
                      tour.maxSeats > 0
                        ? {
                            select: tour.tourId,
                            amt: tour.bookingAmount,
                            seat: tour.maxSeats,
                            tourInfo: {
                              tourName: tour.tourName,
                              source: tour.source,
                              destination: tour.destination,
                              tourStartDate: tour.tourStartDate,
                              tourEndDate: tour.tourEndDate,
                              tourDetailInfo: tour.tourDetailInfo,
                              tourActivities: tour.activities,
                              tourType: tour.tourType,
                              tourTransportation: tour.transportationMode,
                              tourImage: tour.tourImage,
                              tourDepartureTime: tour.departureTime
                            },
                          }
                        : null
                    }
                    style={{
                      ...styles.buttonStyle,
                      backgroundColor: tour.maxSeats === 0 ? "#ccc" : "#e02c18",
                      cursor: tour.maxSeats === 0 ? "not-allowed" : "pointer",
                    }}
                    onMouseEnter={(e) => {
                      if (tour.maxSeats > 0) {
                        e.currentTarget.style.backgroundColor = "#892318";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (tour.maxSeats > 0) {
                        e.currentTarget.style.backgroundColor = "#e02c18";
                      }
                    }}
                  >
                    <b>{tour.maxSeats === 0 ? "Sold Out" : "Book"}</b>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {expandedImage && (
        <div
          style={styles.expandedImageOverlay}
          onClick={handleCloseExpandedImage}
        >
          <img
            src={expandedImage}
            alt="Expanded Tour"
            style={styles.expandedImage}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    marginTop: "11vh",
    background: `linear-gradient(to right, #D2DAFF ,#B1E693, #B1B2FF)`,
    minHeight: "100vh",
    padding: "20px",
  },
  title: {
    textAlign: "center",
    fontFamily: "Uchen, serif",
    marginBottom: "20px",
    color: "#333",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    width: "300px",
    marginRight: "10px",
    outline: "none",
  },
  searchIcon: {
    width: "25px",
    height: "25px",
    marginRight: "10px",
  },
  refreshButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0",
    marginRight: "10px",
  },
  refreshIcon: {
    width: "25px",
    height: "25px",
    marginRight: "550px",
  },
  bookingAmountSelect: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    marginLeft: "10px",
    outline: "none",
  },
  tourTypeSelect: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    marginLeft: "10px",
    outline: "none",
  },
  dateInput: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    marginLeft: "10px",
    outline: "none",
    marginRight: "10px",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardContainer: {
    width: "710px",
    margin: "10px",
  },
  card: {
    backgroundColor: "#F7ECDE",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.2s",
    minHeight: "400px",
    position: "relative",
  },
  tourImage: {
    position: "absolute",
    top: "20px",
    right: "20px",
    width: "200px",
    height: "105px",
    objectFit: "cover",
    borderRadius: "10px",
    cursor: "pointer",
  },
  cardTitle: {
    fontFamily: "Uchen, serif",
    fontSize: "1.5em",
    color: "#2C3E50",
  },
  cardSubtitle: {
    fontSize: "1.2em",
    color: "#34495E",
  },
  icon: {
    marginRight: "5px",
  },
  cardActivities: {
    marginTop: "7px",
    fontFamily: "Uchen, serif",
    fontSize: "1.1em",
    color: "#2980B9",
  },
  cardDetails: {
    fontFamily: "Uchen, serif",
    color: "#7E7474",
    fontSize: "1.1em",
  },
  price: {
    fontSize: "1.5em",
    color: "#C0392B",
    margin: "10px 0",
  },
  perPerson: {
    fontSize: "1em",
    color: "#7E7474",
  },
  buttonStyle: {
    backgroundColor: "#e02c18",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "10px 20px",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
    marginTop: "10px",
    transition: "background-color 0.3s",
  },
  expandedImageOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  expandedImage: {
    maxWidth: "90%",
    maxHeight: "90%",
  },
};

export default UserTourTable;