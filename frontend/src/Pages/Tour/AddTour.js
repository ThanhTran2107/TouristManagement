import { useState } from "react";
import TourServices from "../../Services/TourServices";
import { toast } from "react-toastify";

const AddTour = () => {
  const [tourName, setTourName] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [activities, setActivities] = useState("");
  const [bookingAmount, setBookingAmount] = useState("");
  const [tourDetailInfo, setTourDetailInfo] = useState("");
  const [tourStartDate, setTourStartDate] = useState("");
  const [tourEndDate, setTourEndDate] = useState("");
  const [maxSeats, setMaxSeats] = useState("");
  const [transportationMode, setTransportationMode] = useState("");
  const [tourType, setTourType] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const saveTour = (e) => {
    e.preventDefault();

    // Kiểm tra ngày bắt đầu và ngày kết thúc
    if (new Date(tourEndDate) < new Date(tourStartDate)) {
      toast.error("Ngày kết thúc không thể sớm hơn ngày bắt đầu!");
      return; // Dừng lại nếu có lỗi
    }

    // Kiểm tra độ dài của activities
    if (activities.length > 500) {
      // Giả sử giới hạn là 500 ký tự
      toast.error("Activities không được vượt quá 500 ký tự!");
      return;
    }

    const tour = {
      tourName,
      source,
      destination,
      tourStartDate,
      tourEndDate,
      maxSeats,
      transportationMode,
      activities,
      tourDetailInfo,
      bookingAmount,
      tourType,
    };

    // Create
    TourServices.saveTourDetails(tour)
      .then((response) => {
        console.log("Tour added successfully", response.data);
        toast.success("Tour Added successfully!");
        // Clear input fields
        setTourName("");
        setSource("");
        setDestination("");
        setActivities("");
        setBookingAmount("");
        setTourDetailInfo("");
        setTourStartDate("");
        setTourEndDate("");
        setMaxSeats("");
        setTransportationMode("");
        setTourType("");
      })
      .catch((error) => {
        toast.error("Something went wrong: " + error.message);
        console.log("Something went wrong", error);
      });
  };

  return (
    <div>
      <div
        className="container"
        style={{
          position: "relative",
          background: `linear-gradient(to right, #D2DAFF ,#EFEFEF, #B1B2FF)`,
          minHeight: "170vh",
          maxWidth: "100%",
        }}
      >
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <form onSubmit={saveTour}>
              <div style={Styles.divStyle}>
                <h2 style={Styles.tourText}>
                  <b>Add Tours</b>
                </h2>

                <div className="mb-3">
                  <label className="form-label">Tour name:</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    name="tourName"
                    value={tourName}
                    onChange={(e) => setTourName(e.target.value)}
                  />
                </div>

                <div className="mb-3 d-flex justify-content-between">
                  <div style={{ flex: 1, padding: "5px" }}>
                    <label className="form-label">Source:</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      name="source"
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                    />
                  </div>

                  <div style={{ flex: 1, padding: "5px" }}>
                    <label className="form-label">Destination:</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      name="destination"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3 d-flex justify-content-between">
                  <div style={{ flex: 1, padding: "5px" }}>
                    <label className="form-label">Start Date:</label>
                    <input
                      type="date"
                      required
                      className="form-control"
                      name="tourStartDate"
                      value={tourStartDate}
                      onChange={(e) => setTourStartDate(e.target.value)}
                    />
                  </div>

                  <div style={{ flex: 1, padding: "5px" }}>
                    <label className="form-label">End Date:</label>
                    <input
                      type="date"
                      required
                      className="form-control"
                      name="tourEndDate"
                      value={tourEndDate}
                      onChange={(e) => setTourEndDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Seats Available:</label>
                  <input
                    type="number"
                    required
                    className="form-control"
                    name="maxSeats"
                    value={maxSeats}
                    onChange={(e) => setMaxSeats(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label>Transportations</label> &nbsp;&nbsp;&nbsp;
                  <select
                    name="mode"
                    value={transportationMode}
                    onChange={(e) => setTransportationMode(e.target.value)}
                    className="form-select"
                    style={{ maxWidth: "250px" }}
                  >
                    <option>--Choose Transportation--</option>
                    <option>BUS</option>
                    <option>TRAIN</option>
                    <option>PLANE</option>
                    <option>BOAT</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label>Types</label> &nbsp;&nbsp;&nbsp;
                  <select
                    name="tourType"
                    value={tourType}
                    onChange={(e) => setTourType(e.target.value)}
                    className="form-select"
                    style={{ maxWidth: "200px" }}
                  >
                    <option>--Choose tour type--</option>
                    <option>INTERNATIONAL</option>
                    <option>DOMESTIC</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Activities:</label>
                  <textarea
                    required
                    className="form-control"
                    name="activities"
                    value={activities}
                    onChange={(e) => setActivities(e.target.value)}
                    rows="2" // Tăng số dòng ở đây
                    style={{ resize: "vertical" }} // Cho phép người dùng thay đổi kích thước
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Tour Details:</label>
                  <textarea
                    required
                    className="form-control"
                    name="tourDetailInfo"
                    value={tourDetailInfo}
                    onChange={(e) => setTourDetailInfo(e.target.value)}
                    rows="5" // Tăng số dòng ở đây
                    style={{ resize: "vertical" }} // Cho phép người dùng thay đổi kích thước
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Booking Amount:</label>
                  <input
                    type="number"
                    required
                    className="form-control"
                    name="bookingAmount"
                    value={bookingAmount}
                    onChange={(e) => setBookingAmount(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <button
                    style={{
                      ...Styles.buttonStyle,
                      ...(isHovered ? Styles.buttonHover : {}),
                    }}
                    type="submit"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <b>Add</b>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
};

const Styles = {
  divStyle: {
    borderColor: "crimson",
    borderStyle: "thin",
    width: "30vw",
    margin: "auto",
    marginTop: 100,
    borderRadius: 18,
    padding: "20px",
    boxShadow: "3px 3px 10px 2px #576F72",
  },
  buttonStyle: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 40,
    backgroundColor: "#e02c18",
    color: "white",
    borderRadius: 10,
    border: "none",
    transition: "background-color 0.3s, transform 0.3s",
  },
  buttonHover: {
    backgroundColor: "#892318",
  },
  tourText: {
    textAlign: "center",
    color: "#022831",
    fontFamily: "Signika Negative",
    marginTop: 10,
  },
};

export default AddTour;
