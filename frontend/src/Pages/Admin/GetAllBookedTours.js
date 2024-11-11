import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BookingService from "../../Services/BookingService";
import { toast } from "react-toastify";
import homeIcon from "../../images/homeIcon.png";
import people from "../../images/people.png";
import transport from "../../images/transport.png";

const GetAllBookedTours = () => {
  const [Tours, setTours] = useState([]);
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  const init = async () => {
    if (!userId) {
      toast.error("Please log in to view your bookings");
      navigate("/login");
      return;
    }

    try {
      const response = await BookingService.getAllBookingByUserId(userId);
      console.log("API Response Data:", response.data); // Kiểm tra dữ liệu trả về từ API
      if (response.data && response.data.length > 0) {
        const bookingsData = await Promise.all(
          response.data.map(async (booking) => {
            console.log("Booking Data:", booking); // Kiểm tra từng phần tử trong dữ liệu booking
            const tourists = await BookingService.getAllTouristByBookingId(booking.bookingId);
            return { ...booking, tourists: tourists.data };
          })
        );
        setTours(bookingsData);
      } else {
        toast.info("You have no bookings yet");
      }
    } catch (error) {
      console.log("Error fetching bookings:", error);
      toast.error("Failed to retrieve bookings.");
    }
  };

  const handleDelete = async (bookingId) => {
    try {
      await BookingService.deleteBooking(bookingId);
      toast.success("Booking cancelled successfully");
      window.location.reload();
    } catch (error) {
      console.log("Failed to delete booking", error);
      toast.error("Failed to cancel booking");
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div style={{ marginTop: "10vh", background: `linear-gradient(to right, #B4AEE8 ,#EFEFEF, #93329E)`, minHeight: "100vh" }}>
      <br /><br />
      {Tours.map((tour) => (
        <div className="container-fluid" style={Styles.divStyle} key={tour.bookingId}>
          <div style={{ padding: "5px", width: "70%" }}>
            <h2 style={{ fontFamily: "Uchen, serif" }}>{"Tour Name: " + "'" + tour.tourDetails.tourName + "'"}</h2>
            <hr />
            <h4 style={{ fontFamily: "Uchen, serif" }}>
              {tour.tourDetails.source} to {tour.tourDetails.destination}
            </h4>
            <p><img src={transport} alt="transport icon" /> {tour.tourDetails.transportationMode}</p>
            <p>Start Date: <b>{tour.tourDetails.tourStartDate}</b> &nbsp;&nbsp; End Date: <b>{tour.tourDetails.tourEndDate}</b></p>
            <p>Booking Date: <b>{tour.bookingDate}</b> &nbsp;&nbsp; Total Amount: <b>{tour.totalAmount}</b></p>
          </div>
          <span style={{ maxWidth: "30%" }}>
            <span style={{ fontSize: "18px" }}><b>{"Booking Id: " + tour.bookingId}</b></span>
            <h3 style={{ marginTop: "1vw" }}>{tour.tourDetails.bookingAmount}/-</h3>
            <h6 style={{ color: "#7E7474" }}>per person</h6>
            <span style={{ fontSize: "15px" }}><b>{"No of Seats: " + tour.seatCount}</b></span>
            <button
              type="button"
              style={Styles.buttonStyle}
              onClick={() => handleDelete(tour.bookingId)}
            >
              Cancel Booking
            </button>
          </span>
        </div>
      ))}
    </div>
  );
};

const Styles = {
  divStyle: {
    backgroundColor: "#F7ECDE",
    borderStyle: "thin",
    maxWidth: "50vw",
    minWidth: "46vw",
    display: "flex",
    marginTop: "5vh",
    borderRadius: "5px",
    padding: "20px",
  },
  buttonStyle: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '70%',
    maxHeight: 40,
    backgroundColor: '#D83A56',
    color: 'white',
    borderRadius: 5,
    border: 'none',
  },
};

export default GetAllBookedTours;
