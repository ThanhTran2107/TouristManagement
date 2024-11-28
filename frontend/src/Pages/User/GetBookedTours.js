import React, { useEffect, useState } from "react";
import BookingService from "../../Services/BookingService";
import { toast } from "react-toastify";
import transport from "../../images/transport.png";
import home from "../../images/homeIcon.png";
import TourServices from "../../Services/TourServices";

const GetBookedTours = () => {
  const [tours, setTours] = useState([]);
  const userId = sessionStorage.getItem("userId");
  const [hoveredBookingId, setHoveredBookingId] = useState(null);

  const init = () => {
    BookingService.getAllBookingByUserId(userId)
      .then((response) => {
        console.log("Printing Bookings", response.data);

        response.data.forEach((e, i) => {
          response.data[i]["tourists"] = [];
          BookingService.getAllTouristByBookingId(e.bookingId).then((res) => {
            response.data[i].tourists = [...res.data];
          });
        });

        setTours(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
        toast.error(
          "You have no bookings yet, " + sessionStorage.getItem("name")
        );
      });
  };

  const handleDeleteTour = (bookingId, tourId, seatCount) => {
    BookingService.deleteBooking(bookingId)
      .then((response) => {
        console.log("Booking deleted successfully ", response.data);
        toast.success("Booking Deleted Successfully");

        return TourServices.getTourById(tourId);
      })
      .then((tourResponse) => {
        const currentSeatCount = tourResponse.data.maxSeats;
        const updatedSeatCount = currentSeatCount + seatCount;

        return BookingService.updateTourSeats(tourId, updatedSeatCount);
      })
      .then(() => {
        console.log("Seat count updated successfully");
        init();
      })
      .catch((error) => {
        console.log("Error occurred:", error);
        if (error.response && error.response.status === 404) {
          toast.error("Failed to find the booking or tour.");
        } else {
          toast.error("An error occurred: " + error.message);
        }
      });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        <b>Your Booked Tours</b>
      </h1>
      <div style={styles.row(tours.length)}>
        {tours.map((tour) => {
          const startDate = new Date(tour.tourDetails.tourStartDate);
          const endDate = new Date(tour.tourDetails.tourEndDate);
          const duration = Math.ceil(
            (endDate - startDate + 1) / (1000 * 60 * 60 * 24)
          );

          const isPaymentSuccessful =
            tour.paymentStatus === "PAYMENT_SUCCESSFUL";

          return (
            <div key={tour.bookingId} style={styles.cardContainer}>
              <div style={styles.card}>
                <img
                  src={tour.tourDetails.tourImage}
                  alt="Tour"
                  style={styles.tourImage}
                />
                <h4 style={styles.cardTitle}>{tour.tourDetails.tourName}</h4>
                <p style={styles.cardSubtitle}>
                  {tour.tourDetails.source} to {tour.tourDetails.destination}
                </p>
                <div style={styles.transportContainer}>
                  <span style={styles.days}>
                    <img src={home} alt="day" style={styles.icon} />
                    {duration} days
                  </span>
                  <img src={transport} alt="Transport" style={styles.icon} />
                  <span>{tour.tourDetails.transportationMode}</span>
                </div>
                <p style={{ marginTop: 10, marginBottom: 10 }}>
                  Booking ID : <b>{tour.bookingId}</b>
                </p>
                <p style={{ marginBottom: 10 }}>
                  Number of Seats : <b>{tour.seatCount}</b>
                </p>
                <p
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    fontFamily: "Uchen, serif",
                    fontSize: "1.1em",
                    color: "#2980B9",
                  }}
                >
                  Activities:{" "}
                  <b>
                    {Array.isArray(tour.tourDetails.activities)
                      ? tour.tourDetails.activities.join(", ")
                      : tour.tourDetails.activities}
                  </b>
                </p>
                <p
                  style={{
                    marginBottom: 10,
                    fontFamily: "Uchen, serif",
                    color: "#7E7474",
                    fontSize: "1.1em",
                  }}
                >
                  Tour Type: <b>{tour.tourDetails.tourType}</b>
                </p>
                <p
                  style={{
                    marginBottom: 10,
                    fontFamily: "Uchen, serif",
                    color: "#7E7474",
                    fontSize: "1.1em",
                  }}
                >
                  Tour Details: <b>{tour.tourDetails.tourDetailInfo}</b>
                </p>
                <p style={{ marginBottom: 10 }}>
                  Start Date: <b>{tour.tourDetails.tourStartDate}</b> | End
                  Date: <b>{tour.tourDetails.tourEndDate}</b> | Booking Date:{" "}
                  <b>{tour.bookingDate}</b>
                </p>
                <p
                  style={{
                    fontSize: "1.5em",
                    color: "#C0392B",
                    margin: "10px 0",
                  }}
                >
                  <h>Total Amount : </h>
                  <b>
                    {new Intl.NumberFormat("vi-VN").format(tour.totalAmount)}{" "}
                    VND
                  </b>
                </p>
                <div style={styles.buttonContainer}>
                  <button
                    style={{
                      ...styles.buttonStyle,
                      backgroundColor: isPaymentSuccessful
                        ? "green"
                        : hoveredBookingId === tour.bookingId
                        ? "#892318"
                        : "#e02c18", 
                      opacity: isPaymentSuccessful ? 0.5 : 1,
                      cursor: isPaymentSuccessful ? "not-allowed" : "pointer",
                    }}
                    onMouseEnter={() => setHoveredBookingId(tour.bookingId)}
                    onMouseLeave={() => setHoveredBookingId(null)}
                    onClick={
                      !isPaymentSuccessful
                        ? () =>
                            handleDeleteTour(
                              tour.bookingId,
                              tour.tourDetails.tourId,
                              tour.seatCount
                            )
                        : null
                    }
                    disabled={isPaymentSuccessful} 
                  >
                    <b>
                      {isPaymentSuccessful
                        ? "Booking Confirmed"
                        : "Cancel Booking"}
                    </b>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: "10vh",
    background: `linear-gradient(to right, #B4AEE8 ,#EFEFEF, #93329E)`,
    minHeight: "100vh",
    padding: "20px",
  },
  title: {
    textAlign: "center",
    fontFamily: "Uchen, serif",
    marginBottom: "20px",
    color: "#333",
  },
  row: (length) => ({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: length === 1 ? "center" : "flex-start",
  }),
  cardContainer: {
    width: "710px",
    margin: "14px",
  },
  card: {
    backgroundColor: "#F7ECDE",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.2s",
    minHeight: "200px",
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
  transportContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
  },
  days: {
    marginRight: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px",
  },
  buttonStyle: {
    padding: "10px 20px",
    backgroundColor: "#e02c18",
    color: "white",
    borderRadius: "10px",
    border: "none",
 cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default GetBookedTours;