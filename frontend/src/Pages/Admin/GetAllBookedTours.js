import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BookingService from "../../Services/BookingService";
import TourServices from "../../Services/TourServices";
import searchIcon from "../../images/search-icon.png";
import refreshIcon from "../../images/refresh.png";
import deleteIcon from "../../images/delete.jpg";

const GetAllBookedTours = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookedTours, setBookedTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("ALL"); 
  const [priceFilter, setPriceFilter] = useState("ALL"); 
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tourToDelete, setTourToDelete] = useState(null);
  const [isHoveringConfirm, setIsHoveringConfirm] = useState(false);
  const [isHoveringCancel, setIsHoveringCancel] = useState(false);

  const fetchBookedTours = async () => {
    try {
      const response = await BookingService.getAllBookings();
      setBookedTours(response.data);
      setFilteredTours(response.data);
    } catch (error) {
      toast.error("Failed to fetch booked tours: " + error.message);
    }
  };

  useEffect(() => {
    fetchBookedTours();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, bookedTours, paymentMethodFilter, priceFilter]); 

  const handleSearch = () => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = bookedTours.filter((tour) => {
      const matchesPaymentMethod = paymentMethodFilter === "ALL" || tour.paymentMethod === paymentMethodFilter; 
      const matchesPrice =
        priceFilter === "ALL" ||
        (priceFilter === "Less than 1.000.000" && tour.totalAmount < 1000000) ||
        (priceFilter === "1.000.000 - 2.000.000" &&
          tour.totalAmount >= 1000000 &&
          tour.totalAmount < 2000000) ||
        (priceFilter === "2.000.000 - 3.000.000" &&
          tour.totalAmount >= 2000000 &&
          tour.totalAmount < 3000000) ||
        (priceFilter === "3.000.000 - 4.000.000" &&
          tour.totalAmount >= 3000000 &&
          tour.totalAmount < 4000000) ||
        (priceFilter === "4.000.000 - 5.000.000" &&
          tour.totalAmount >= 4000000 &&
          tour.totalAmount < 5000000) ||
        (priceFilter === "Greater than 5.000.000" &&
          tour.totalAmount > 5000000); 

      const matchesSearchTerm =
        tour.bookingId.toString().includes(lowercasedFilter) ||
        tour.bookingDate.toLowerCase().includes(lowercasedFilter) ||
        tour.seatCount.toString().includes(lowercasedFilter) ||
        tour.paymentStatus.toLowerCase().includes(lowercasedFilter) ||
        tour.totalAmount.toString().includes(lowercasedFilter); 

      return matchesPaymentMethod && matchesPrice && matchesSearchTerm; 
    });
    setFilteredTours(filteredData);
  };

  const handleRefresh = () => {
    fetchBookedTours();
    setSearchTerm("");
    setPaymentMethodFilter("ALL"); 
    setPriceFilter("ALL"); 
  };

  const handleDeleteTour = (bookingId, tourId, seatCount) => {
    if (!tourId) {
      console.error("Invalid tourId:", tourId);
      toast.error("Invalid tour ID.");
      return;
    }

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
        fetchBookedTours();
        setShowDeleteModal(false);
        setTourToDelete(null);
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        toast.error(
          "Failed to delete booking: " +
            (error.response ? error.response.data.message : error.message)
        );
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Manage Booked Tours</h2>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <button style={styles.searchButton} onClick={handleSearch}>
          <img src={searchIcon} alt="Search" style={styles.icon} />
        </button>
        <button style={styles.refreshButton} onClick={handleRefresh}>
          <img src={refreshIcon} alt="Refresh" style={styles.icon} />
        </button>
        <select
          value={paymentMethodFilter}
          onChange={(e) => {
            setPaymentMethodFilter(e.target.value);
            handleSearch();
          }}
          style={styles.cbxMethod}
        >
          <option value="ALL">All Payment Methods</option>
          <option value="CARD_PAYMENT">Card Payment</option>
          <option value="DIRECT_PAYMENT">Direct Payment</option>
        </select>
        <select
          value={priceFilter}
          onChange={(e) => {
            setPriceFilter(e.target.value);
            handleSearch();
          }}
          style={styles.cbxPrice}
        >
          <option value="ALL">All Prices</option>
          <option value="Less than 1.000.000">Less than 1.000.000</option>
          <option value="1.000.000 - 2.000.000">1.000.000 - 2.000.000</option>
          <option value="2.000.000 - 3.000.000">2.000.000 - 3.000.000</option>
          <option value="3.000.000 - 4.000.000">3.000.000 - 4.000.000</option>
          <option value="4.000.000 - 5.000.000">4.000.000 - 5.000.000</option>
          <option value="Greater than 5.000.000">Greater than 5.000.000</option>
        </select>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Booking ID</th>
            <th style={styles.th}>Booking Date</th>
            <th style={styles.th}>Seat Count</th>
            <th style={styles.th}>Payment Status</th>
            <th style={styles.th}>Payment Method</th>
            <th style={styles.th}>Total Amount</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTours.length > 0 ? (
            filteredTours.map((tour, index) => (
              <tr key={tour.bookingId}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{tour.bookingDate}</td>
                <td style={styles.td}>{tour.seatCount}</td>
                <td style={styles.tdStatus}>{tour.paymentStatus}</td>
                <td style={styles.td}>{tour.paymentMethod}</td>
                <td style={styles.tdTotal}>
                  {new Intl.NumberFormat("vi-VN").format(tour.totalAmount)}
                </td>
                <td style={styles.td}>
                  <button
                    style={styles.deleteButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      setTourToDelete(tour);
                      setShowDeleteModal(true);
                    }}
                  >
                    <img
                      src={deleteIcon}
                      alt="Delete"
                      style={styles.deleteIcon}
                    />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={styles.td}>
                No tours found
                              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showDeleteModal && (
        <>
          <div style={styles.overlay} />
          <div style={styles.modal}>
            <h3>
              <b>Delete This Booking?</b>
            </h3>
            <button
              onMouseEnter={() => setIsHoveringConfirm(true)}
              onMouseLeave={() => setIsHoveringConfirm(false)}
              onClick={() =>
                handleDeleteTour(
                  tourToDelete.bookingId,
                  tourToDelete.tourDetails.tourId,
                  tourToDelete.seatCount
                )
              }
              style={{
                ...styles.submitButton,
                ...(isHoveringConfirm ? styles.submitButtonHover : {}),
              }}
            >
              Confirm
            </button>
            <button
              onMouseEnter={() => setIsHoveringCancel(true)}
              onMouseLeave={() => setIsHoveringCancel(false)}
              onClick={() => {
                setShowDeleteModal(false);
                setTourToDelete(null);
                setIsHoveringCancel(false);
              }}
              style={{
                ...styles.cancelButton,
                ...(isHoveringCancel ? styles.cancelButtonHover : {}),
              }}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    background: `linear-gradient(to right, #D2DAFF, #EFEFEF, #B1B2FF)`,
    minHeight: "100vh",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  searchContainer: {
    display: "flex",
    marginBottom: "10px",
  },
  searchInput: {
    marginTop: "10px",
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: "10px",
    marginRight: "2px",
    width: "250px",
    outline: "none",
  },
  cbxMethod: {
    marginTop: "10px",
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: "10px",
    marginLeft: "725px",
    width: "200px",
    outline: "none",
  },
  cbxPrice: {
    marginTop: "10px",
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: "10px",
    marginLeft: "5px",
    width: "220px",
    outline: "none",
  },
  searchButton: {
    marginTop: "10px",
    padding: "10px",
    fontSize: "1rem",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.3s",
  },
  refreshButton: {
    marginTop: "10px",
    padding: "10px",
    fontSize: "1rem",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    marginLeft: "5px",
    transition: "background-color 0.3s, transform 0.3s",
  },
  icon: {
    width: "25px",
    height: "25px",
  },
  deleteIcon: {
    width: "35px",
    height: "35px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #ddd",
  },
  th: {
    backgroundColor: "#f2f2f2",
    padding: "10px",
    border: "1px solid #ddd",
    paddingBottom: "15px",
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
  },
  tdStatus: {
    padding: "10px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    fontWeight: "bold",
    color: "#e02c18",
  },
  tdTotal: {
    padding: "10px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    color: "#e02c18",
    fontWeight: "bold",
  },
  modal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
    borderRadius: "20px",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
  deleteButton: {
    border: "none",
  },
  submitButton: {
    marginTop: "10px",
    padding: "10px",
    fontSize: "1rem",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s, transform 0.3s",
  },
  submitButtonHover: {
    backgroundColor: "green",
  },
  cancelButton: {
    marginTop: "10px",
    marginLeft: "10px",
    padding: "10px",
    fontSize: "1rem",
    border: "none",
    backgroundColor: "#e02c18",
    color: "white",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s, transform 0.3s",
  },
  cancelButtonHover: {
    backgroundColor: "#892318",
  },
};

export default GetAllBookedTours;