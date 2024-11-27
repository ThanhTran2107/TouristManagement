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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tourToDelete, setTourToDelete] = useState(null);

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
  }, [searchTerm, bookedTours]);

  const handleSearch = () => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = bookedTours.filter((tour) => {
      return (
        tour.tourDetails.tourName.toLowerCase().includes(lowercasedFilter) || 
        tour.user.firstName.toLowerCase().includes(lowercasedFilter) || 
        tour.user.lastName.toLowerCase().includes(lowercasedFilter) 
      );
    });
    setFilteredTours(filteredData);
  };

  const handleRefresh = () => {
    fetchBookedTours();
    setSearchTerm("");
  };


  const [hasDeletedBooking, setHasDeletedBooking] = useState(false);

  const handleDeleteTour = (bookingId, tourId, seatCount) => {
    if (!tourId) {
      console.error("Invalid tourId:", tourId);
      toast.error("Invalid tour ID.");
      return;
    }

    BookingService.deleteBooking(bookingId)
      .then((response) => {
        console.log("Booking deleted successfully ", response.data);
        if (!hasDeletedBooking) {
          toast.success("Booking Deleted Successfully");
          setHasDeletedBooking(true);
        }

        return TourServices.getTourById(tourId);
      })
      .then((tourResponse) => {
        console.log(seatCount);
        console.log(tourResponse.data.maxSeats);
        const currentSeatCount = tourResponse.data.maxSeats;
        const updatedSeatCount = currentSeatCount + seatCount;

        return BookingService.updateTourSeats(tourId, updatedSeatCount);
      })
      .then(() => {
        console.log("Seat count updated successfully");
        fetchBookedTours();
        setShowDeleteModal(false);
        setTourToDelete(null);
        setHasDeletedBooking(false); 
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        toast.error(
          "Failed to delete booking: " +
            (error.response ? error.response.data.message : error.message)
        );
        setHasDeletedBooking(false); 
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
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
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
              <tr key={tour.bookingId} style={styles.row}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{tour.bookingDate}</td>
                <td style={styles.td}>{tour.seatCount}</td>
                <td style={styles.tdStatus}>{tour.paymentStatus}</td>
                <td style={styles.td}>{tour.paymentMethod}</td>
                <td style={styles.tdTotalAmount}>
                  {new Intl.NumberFormat("vi-VN").format(tour.totalAmount)} VND
                </td>
                <td style={styles.td}>
                  <button
                    style={styles.deleteButton}
                    onClick={() => {
                      setShowDeleteModal(true);
                      setTourToDelete(tour);
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
                No booked tours found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showDeleteModal && tourToDelete && (
        <>
          <div style={styles.overlay} />
          <div style={styles.modal}>
            <h3>
              <b>Delete This Booking?</b>
            </h3>
            <button
              onClick={() =>
                handleDeleteTour(
                  tourToDelete.bookingId, 
                  tourToDelete.tourDetails.tourId,
                  tourToDelete.seatCount
                )
              }
              style={styles.submitButton}
            >
              Confirm
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setTourToDelete(null);
              }}
              style={styles.cancelButton}
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
  },
  tdTotalAmount: {
    padding: "10px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    fontWeight: "bold",
    color: "red",
  },
  row: {
    transition: "background-color 0.3s",
    cursor: "pointer",
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
    marginRight: 20
  },
  cancelButton: {
    marginTop: "10px",
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
};

export default GetAllBookedTours;