import { useEffect, useState } from "react";
import TourServices from "../../Services/TourServices";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditTour = () => {
  const navigate = useNavigate();
  const { tourId } = useParams();

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
  const [tourImage, setTourImage] = useState(null);
  const [tourImageBLOB, setTourImageBLOB] = useState("");
  const [departureTime, setDepartureTime] = useState("");

  const updateTour = async (e) => {
    e.preventDefault();

    const updatedTour = {
      tourName,
      source,
      destination,
      activities,
      bookingAmount,
      tourDetailInfo,
      tourStartDate,
      tourEndDate,
      maxSeats,
      transportationMode,
      tourType,
      departureTime,
      tourImage: tourImageBLOB,
    };

    if (!tourImage) {
      toast.error("Please upload an image before updating");
    } else {
      if (tourId) {
        TourServices.updateTour(updatedTour, tourId)
          .then((response) => {
            console.log("Tour updated successfully: ", response.data);
            toast.success("Tour updated successfully");
            console.log(tourImageBLOB);
            navigate("/tourTable");
            window.location.reload();
          })
          .catch((error) => {
            console.log("Something went wrong", error);
            toast.error("Something went wrong");
          });
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTourImage(file);
      convertToBase64(file);
    }
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setTourImageBLOB(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const init = () => {
    if (tourId) {
      TourServices.getTourById(tourId)
        .then((response) => {
          console.log(response.data);
          setTourName(response.data.tourName);
          setSource(response.data.source);
          setDestination(response.data.destination);
          setActivities(response.data.activities);
          setBookingAmount(response.data.bookingAmount);
          setTourDetailInfo(response.data.tourDetailInfo);
          setTourStartDate(response.data.tourStartDate);
          setTourEndDate(response.data.tourEndDate);
          setMaxSeats(response.data.maxSeats);
          setTransportationMode(response.data.transportationMode);
          setTourType(response.data.tourType);
          setDepartureTime(response.data.departureTime);
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    }
  };

  useEffect(() => {
    init();
  }, [tourId]);

  return (
    <div className="container" style={Styles.containerStyle}>
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <form onSubmit={updateTour}>
            <div style={Styles.divStyle}>
              <h2 style={Styles.tourText}>
                <b>Update Tour</b>
              </h2>

              <div className="mb-3">
                <label className="form-label">Tour name:</label>
                <input
                  type="text"
                  required
                  className="form-control"
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
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                  />
                </div>

                <div style={{ flex: 1, padding: "5px" }}>
                  <label className="form-label" style={{ marginBottom: "8px" }}>
                    Destination:
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
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
                    value={tourEndDate}
                    onChange={(e) => setTourEndDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Departure Time:</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                  placeholder="HH:mm AM/PM"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Seats Available:</label>
                <input
                  type="number"
                  required
                  className="form-control"
                  value={maxSeats}
                  onChange={(e) => setMaxSeats(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label>Transportations</label> &nbsp;&nbsp;&nbsp;
                <select
                  value={transportationMode}
                  onChange={(e) => setTransportationMode(e.target.value)}
                  className="form-select"
                  style={{ maxWidth: "250px" }}
                >
                  <option>--Choose Transportation--</option>
                  <option value="BUS">BUS</option>
                  <option value="TRAIN">TRAIN</option>
                  <option value="PLANE">PLANE</option>
                  <option value="BOAT">BOAT</option>
                </select>
              </div>

              <div className="mb-3">
                <label>Types</label> &nbsp;&nbsp;&nbsp;
                <select
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
                  value={activities}
                  onChange={(e) => setActivities(e.target.value)}
                  rows="2"
                  style={{ resize: "vertical" }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Tour Details:</label>
                <textarea
                  required
                  className="form-control"
                  value={tourDetailInfo}
                  onChange={(e) => setTourDetailInfo(e.target.value)}
                  rows="5"
                  style={{ resize: "vertical" }}
                />
              </div>

              <div class Name="mb-3">
                <label className="form-label">Booking Amount:</label>
                <input
                  type="number"
                  required
                  className="form-control"
                  value={bookingAmount}
                  onChange={(e) => setBookingAmount(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Upload Tour Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={handleImageChange}
                />
              </div>

              {tourImage && (
                <div className="mb-3">
                  <img
                    src={URL.createObjectURL(tourImage)}
                    alt="Tour"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              )}

              <div className="mb-3">
                <button
                  style={Styles.buttonStyle}
                  type="submit"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      Styles.buttonHover.backgroundColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      Styles.buttonStyle.backgroundColor;
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

const Styles = {
  containerStyle: {
    position: "relative",
    background: `linear-gradient(to right, #D2DAFF ,#EFEFEF, #B1B2FF)`,
    minHeight: "170vh",
    maxWidth: "100%",
  },
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
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 40,
    backgroundColor: "#e02c18",
    color: "white",
    borderRadius: 10,
    border: "none",
    transition: "background-color 0.3s, transform 0.3s",
    fontWeight: "bold",
  },
  buttonHover: {
    backgroundColor: "#892318",
  },
  tourText: {
    textAlign: "center",
    color: "#022831",
    fontFamily: "Signika Negative",
    fontStyle: "sans-serif",
    marginTop: 10,
  },
};

export default EditTour;
