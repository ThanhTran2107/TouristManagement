import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import { toast } from "react-toastify";
import closeIcon from "../../images/close-icon.png";
import directPaymentImage from "../../images/directpayment.png"; 
import bankCardImage from "../../images/bankcard.png";
import BookingService from "../../Services/BookingService";
const homeIcon = require("../../images/homeIcon.png");
const people = require("../../images/people.png");
const transport = require("../../images/transport.png");

const AddTourist = () => {
  const location = useLocation();
  const user = sessionStorage.getItem("userId");
  const navigate = useNavigate();
  const [isHoveredAdd, setIsHoveredAdd] = useState(false);
  const [isHoveredBook, setIsHoveredBook] = useState(false);
  const [showScroll, setShowScroll] = useState(true);
  const seats = location.state?.seat || 0;
  const tourId = location.state?.select;
  const tourAmount = location.state?.amt;
  const tourInfo = location.state?.tourInfo || {};
  const [isLineVisible, setIsLineVisible] = useState(false);
  const [count, setCount] = useState(1);
  const [seat, setSeat] = useState(seats);
  const [paymentMethod, setPaymentMethod] = useState("direct");
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardHolderName: "",
    cardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    cvv: "",
  });

  const currentDate = new Date();
  const today = currentDate.toISOString().split("T")[0];
  const [formValues, setFormValues] = useState([
    { age: "", touristName: "", idProof: "", idProofNo: "", phoneNumber: "" },
  ]);

  const handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;

    if (e.target.name === "age") {
      newFormValues[i][e.target.name] = parseInt(e.target.value) || 0;
    } else {
      newFormValues[i][e.target.name] = e.target.value;
    }

    setFormValues(newFormValues);
  };

  const addFormFields = () => {
    const allFormsValid = formValues.every((form) => {
      return (
        form.touristName &&
        form.age &&
        form.phoneNumber &&
        form.idProof &&
        form.idProofNo
      );
    });

    if (!allFormsValid) {
      toast.error(
        "Please fill out all fields in all forms before adding another."
      );
      return;
    }

    if (seat > 0) {
      setFormValues([
        ...formValues,
        {
          touristName: "",
          age: "",
          idProof: "",
          idProofNo: "",
          phoneNumber: "",
        },
      ]);
      setCount(count + 1);
      setSeat(seat - 1);
      setShowScroll(true);
      setIsLineVisible(true);
    } else {
      toast.error("No more seats available to add.");
    }
  };

  const removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
    setCount(count - 1);
    setSeat(seat + 1);

    if (newFormValues.length === 0) {
      setIsLineVisible(false);
      setFormValues([
        {
          age: "",
          touristName: "",
          idProof: "",
          idProofNo: "",
          phoneNumber: "",
        },
      ]);
      setCount(1);
    } else {
      setIsLineVisible(newFormValues.length > 1);
    }

    const firstForm = document.getElementById("firstForm");
    if (firstForm) {
      firstForm.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);

    if (e.target.value === "direct") {
      setCardDetails({
        cardHolderName: "",
        cardNumber: "",
        expirationMonth: "",
        expirationYear: "",
        cvv: "",
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const allFormsValid = formValues.every((form) => {
      return (
        form.touristName &&
        form.age &&
        form.phoneNumber &&
        form.idProof &&
        form.idProofNo
      );
    });

    if (!allFormsValid) {
      toast.error("Please fill out all fields in all forms before booking.");
      return;
    }

    if (paymentMethod === "card") {
      if (!isValidCardNumber() || !isValidExpiration() || !isValidCVV()) {
        return;
      }
    }

    const paymentMethodFormatted =
      paymentMethod === "direct" ? "DIRECT_PAYMENT" : "CARD_PAYMENT";

    const idProofMapping = {
      "Identity Card": "IDENTITY_CARD",
      "Driver's License": "DRIVER_LICENSE",
    };

    const touristDtoList = formValues.map((form) => ({
      ...form,
      idProof: idProofMapping[form.idProof] || form.idProof,
    }));

    const requestObject = {
      bookingDto: {
        bookingDate: today,
        paymentStatus: "PAYMENT_IN_PROGRESS",
        seatCount: count,
        totalAmount: tourAmount * count,
        paymentMethod: paymentMethodFormatted,
      },
      touristDtoList: touristDtoList,
    };

    BookingService.createBooking(tourId, user, requestObject)
      .then((response) => {
        const result = response.data;
        if (result["status"] === "error") {
          toast.error("Something went wrong. Please check");
        } else {
          const newSeatCount = seats - count;
          BookingService.updateTourSeats(tourId, newSeatCount).then(() => {
            swal(
              "Success",
              `Tour Booked Successfully\n Booking ID : ${result.bookingId}`,
              "success"
            ).then(() => {
              navigate("/getBookedTours");
            });
          });
        }
      })
      .catch((error) => {
        console.log(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;

    if (name === "expirationMonth") {
      const numericValue = value.replace(/\D/g, "");

      let limitedValue = "";

      if (numericValue === "") {
        limitedValue = "";
      } else if (numericValue.length === 1) {
        limitedValue = numericValue === "0" ? "0" : numericValue;
        limitedValue = numericValue === "1" ? "1" : limitedValue;
      } else if (numericValue.length === 2) {
        const monthValue = parseInt(numericValue, 10);
        limitedValue =
          monthValue >= 1 && monthValue <= 12
            ? monthValue < 10
              ? "0" + monthValue
              : monthValue.toString()
            : "12";
      }

      setCardDetails((prevDetails) => ({
        ...prevDetails,
        [name]: limitedValue,
      }));
    } else if (name === "cardNumber") {
      const formattedValue = formatCardNumber(value);
      setCardDetails((prevDetails) => ({
        ...prevDetails,
        [name]: formattedValue,
      }));
    } else if (name === "cardHolderName") {
      const formattedValue = value.replace(/[^a-zA-Z\s]/g, "").toUpperCase();

      setCardDetails((prevDetails) => ({
        ...prevDetails,
        [name]: formattedValue,
      }));
    } else {
      setCardDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const handleCardImageClick = () => {
    setShowCardForm(true);
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === 'card-modal-overlay') {
      setShowCardForm(false);
    }
  };

  const isValidExpiration = () => {
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;

  const month = parseInt(cardDetails.expirationMonth);
  const year = parseInt(cardDetails.expirationYear);

  if (isNaN(month) || month < 1 || month > 12) {
    toast.error("Invalid expiration month");
    return false;
  }

  if (isNaN(year) || year < currentYear) {
    toast.error("Invalid expiration year");
    return false;
  }

  if (year === currentYear && month < currentMonth) {
    toast.error("Card has expired");
    return false;
  }

  return true;
};

const isValidCardNumber = () => {
  const cleanCardNumber = cardDetails.cardNumber.replace(/\s/g, "");

  if (cleanCardNumber.length !== 16) {
    toast.error("Card number must be 16 digits");
    return false;
  }

  return true;
};

const isValidCVV = () => {
  const cvvPattern = /^\d{3}$/;
  
  if (!cvvPattern.test(cardDetails.cvv)) {
    toast.error("CVV must be 3 digits");
    return false;
  }
  return true;
};

const formatCardNumber = (value) => {
  return value
    .replace(/\s/g, '')
    .replace(/(\d{4})/g, '$1 ')
    .trim();
};

  return (
    <>
      <div
        style={{
          background: "linear-gradient(to right, #B4AEE8 , #EFEFEF, #93329E )",
          height: "100vh",
          overflow: "hidden",
          position: "relative",
        }}
        onClick={showCardForm ? handleOutsideClick : undefined}
      >
        <div
          className="text-center"
          style={{ padding: "20px", fontFamily: "Georgia, serif" }}
        ></div>
        <br />
        <div style={styles.container}>
          <div style={styles.formContainer}>
            <h2
              style={{
                fontSize: "1.5em",
                textAlign: "center",
                marginBottom: "10px",
                fontWeight: "bold",
                background: "#d5d0cd",
                borderRadius: "10px",
                padding: "15px",
                position: "relative",
                width: "709px",
              }}
            >
              <b>Customer Information</b>
            </h2>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "10px",
                position: "relative",
              }}
            >
              <label style={{ marginRight: "10px" }}>
                <input
                  type="radio"
                  value="direct"
                  checked={paymentMethod === "direct"}
                  onChange={handlePaymentMethodChange}
                />{" "}
                <b>Direct Payment</b>
              </label>
              <label style={{ marginLeft: "20px", marginRight: "70px" }}>
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={handlePaymentMethodChange}
                />{" "}
                <b>Card Payment</b>
              </label>
              {paymentMethod === "direct" && (
                <>
                  <img
                    src={directPaymentImage}
                    alt="Direct Payment"
                    style={{
                      width: "250px",
                      position: "absolute",
                      top: "30px",
                      left: "53%",
                      transform: "translateX(-50%)",
                      transform: "translateY(0%)",
                    }}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "80px",
                      left: "57.5%",
                      transform: "translate X(-50%)",
                      transform: "translateY(400%)",
                      fontSize: "1.6em",
                      color: "#2C3E50",
                      fontWeight: "bold",
                    }}
                  >
                    Direct Payment
                  </p>
                </>
              )}
              {paymentMethod === "card" && (
                <>
                  <img
                    src={bankCardImage}
                    alt="Card Payment"
                    style={{
                      width: "270px",
                      position: "absolute",
                      top: "20px",
                      left: "70%",
                      transform: "translateX(-50%)",
                      cursor: "pointer",
                    }}
                    onClick={handleCardImageClick}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "70px",
                      left: "58%",
                      transform: "translateX(-50%)",
                      transform: "translateY(400%)",
                      fontSize: "1.6em",
                      color: "#2C3E50",
                      fontWeight: "bold",
                    }}
                  >
                    Card Payment
                  </p>
                  {showCardForm && (
                    <div
                      id="card-modal-overlay"
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "white",
                          padding: "30px",
                          borderRadius: "10px",
                          width: "400px",
                          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        }}
                      >
                        <h2
                          style={{
                            textAlign: "center",
                            marginBottom: "20px",
                            fontWeight: "bold",
                          }}
                        >
                          Card Details
                        </h2>

                        <div style={{ marginBottom: "15px" }}>
                          <label
                            style={{ display: "block", marginBottom: "5px" }}
                          >
                            <b>Card Name</b>
                          </label>
                          <input
                            type="text"
                            name="cardHolderName"
                            value={cardDetails.cardHolderName}
                            onChange={handleCardDetailsChange}
                            placeholder="Enter card name"
                            style={{
                              width: "100%",
                              padding: "10px",
                              borderRadius: "5px",
                              border: "1px solid #ccc",
                            }}
                            autoComplete="cc-name"
                          />
                        </div>

                        <div style={{ marginBottom: "15px" }}>
                          <label
                            style={{ display: "block", marginBottom: "5px" }}
                          >
                            <b>Card Number</b>
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={cardDetails.cardNumber}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "");
                              if (value.length <= 16) {
                                const formattedValue = formatCardNumber(value);
                                setCardDetails((prevDetails) => ({
                                  ...prevDetails,
                                  cardNumber: formattedValue,
                                }));
                              }
                            }}
                            placeholder="1234 5678 9012 3456"
                            style={{
                              width: "100%",
                              padding: "10px",
                              borderRadius: "5px",
                              border: "1px solid #ccc",
                            }}
                            autoComplete="cc-number"
                            maxLength="19"
                          />
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div style={{ width: "45%" }}>
                            <label
                              style={{ display: "block", marginBottom: "5px" }}
                            >
                              <b>Expiration Month</b>
                            </label>
                            <input
                              type="text"
                              name="expirationMonth"
                              value={cardDetails.expirationMonth}
                              onChange={handleCardDetailsChange}
                              placeholder="MM"
                              maxLength="2"
                              style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                              }}
                              autoComplete="cc-exp-month"
                            />
                          </div>

                          <div style={{ width: "45%" }}>
                            <label
                              style={{ display: "block", marginBottom: "5px" }}
                            >
                              <b>Expiration Year</b>
                            </label>
                            <input
                              type="text"
                              name="expirationYear"
                              value={cardDetails.expirationYear}
                              onChange={handleCardDetailsChange}
                              placeholder="YY"
                              maxLength="2"
                              style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                              }}
                              autoComplete="cc-exp-year"
                            />
                          </div>
                        </div>

                        <div
                          style={{ marginBottom: "15px", marginTop: "15px" }}
                        >
                          <label
                            style={{ display: "block", marginBottom: "5px" }}
                          >
                            <b>CVV</b>
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={cardDetails.cvv}
                            onChange={handleCardDetailsChange}
                            placeholder="123"
                            maxLength="3"
                            style={{
                              width: "100%",
                              padding: "10px",
                              borderRadius: "5px",
                              border: "1px solid #ccc",
                            }}
                            autoComplete="cc-csc"
                            onKeyPress={(e) => {
                              if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            <div
              style={{
                maxHeight: showScroll ? "388px" : "400px",
                maxWidth: showScroll ? "270px" : "400px",
                overflowY: showScroll ? "scroll" : "hidden",
                marginTop: "-40px",
              }}
            >
              <form onSubmit={handleSubmit}>
                {formValues.map((element, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "15px",
                      position: "relative",
                    }}
                  >
                    {index > 0 && (
                      <button
                        style={styles.deleteButton}
                        onClick={() => removeFormFields(index)}
                        className="delete-button"
                      >
                        <img
                          src={closeIcon}
                          alt="Delete"
                          style={{
                            width: "15px",
                            height: "15px",
                            position: "absolute",
                            top: "0",
                            right: "0",
                            marginRight: "-3px",
                          }}
                        />
                      </button>
                    )}
                    <div className="form-inline" style={divStyle.div}>
                      <div style={divStyle.inputContainer}>
                        <label>
                          <b>Full Name</b>
                        </label>
                        <input
                          type="text"
                          name="touristName"
                          value={element.touristName || ""}
                          required
                          onChange={(e) => handleChange(index, e)}
                          style={divStyle.input}
                        />
                      </div>
                      <div style={divStyle.inputContainer}>
                        <label>
                          <b>Age</b>
                        </label>
                        <input
                          type="number"
                          name="age"
                          value={element.age || ""}
                          onChange={(e) => handleChange(index, e)}
                          style={divStyle.input}
                        />
                      </div>
                      <div style={divStyle.inputContainer}>
                        <label>
                          <b>Phone Number</b>
                        </label>
                        <input
                          type="text"
                          name="phoneNumber"
                          value={element.phoneNumber || ""}
                          onChange={(e) => handleChange(index, e)}
                          style={divStyle.input}
                          required
                        />
                      </div>
                      <div style={divStyle.inputContainer}>
                        <label>
                          <b>ID Proof</b>
                        </label>
                        <select
                          name="idProof"
                          value={element.idProof}
                          onChange={(e) => handleChange(index, e)}
                          style={divStyle.select}
                        >
                          <option>Choose ID</option>
                          <option>Identity Card</option>
                          <option>Driver's License</option>
                        </select>
                      </div>
                      <div style={divStyle.inputContainer}>
                        <label>
                          <b>ID Number</b>
                        </label>
                        <input
                          type="text"
                          name="idProofNo"
                          value={element.idProofNo || ""}
                          onChange={(e) => handleChange(index, e)}
                          style={divStyle.input}
                        />
                      </div>
                      <div
                        style={{
                          borderTop: isLineVisible ? "2px solid black" : "none",
                          width: "212px",
                          marginBottom: "-20px",
                          marginTop: "30px",
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </form>
            </div>
          </div>
          <div style={styles.tourInfoContainer}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>{tourInfo.tourName || "N/A"}</h3>
              <img
                src={tourInfo.tourImage || "default-image-url"}
                alt="Tour"
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  width: "200px",
                  height: "105px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              />
              <p style={styles.cardSubtitle}>
                {tourInfo.source || "N/A"} to {tourInfo.destination || "N/A"}
              </p>
              <p>
                <img src={homeIcon} alt="home icon" style={styles.icon} />
                {Math.ceil(
                  (new Date(tourInfo.tourEndDate) -
                    new Date(tourInfo.tourStartDate) +
                    1) /
                    (1000 * 60 * 60 * 24)
                )}
                days
                {" - "}
                <img src={people} alt="people icon" style={styles.icon} />
                {seats} seats
                {" - "}
                <img src={transport} alt="transport icon" style={styles.icon} />
                {tourInfo.tourTransportation || "N/A"}
              </p>
              <h5 style={styles.cardActivities}>
                Activities: <b>{tourInfo.tourActivities || "N/A"}</b>
              </h5>
              <h5 style={styles.cardDetails}>
                Tour Type: <b>{tourInfo.tourType || "N/A"}</b>
              </h5>
              <h5 style={styles.cardDetails}>
                Tour Details: <b>{tourInfo.tourDetailInfo || "N/A"}</b>
              </h5>
              <p>
                Start Date: <b>{tourInfo.tourStartDate || "N/A"}</b> | End Date:{" "}
                <b>{tourInfo.tourEndDate || "N/A"}</b>
              </p>
              <div
                style={{ borderTop: "2px solid black", margin: "10px 0" }}
              ></div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <p
                  style={{
                    fontFamily: "Uchen, serif",
                    fontSize: "1.5em",
                    margin: "0",
                    marginRight: "10px",
                  }}
                >
                  <b>Total Amounts: </b>
                </p>
                <h2 style={styles.price}>
                  {new Intl.NumberFormat("vi-VN").format(tourAmount * count)}{" "}
                  VND
                </h2>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <p
                  style={{
                    fontFamily: "Uchen, serif",
                    fontSize: "1.5em",
                    margin: "0",
                    marginRight: "10px",
                  }}
                >
                  <b>Number of Tourists:</b>
                </p>
                <h4
                  style={{ margin: "0", color: "#C0392B", fontWeight: "bold" }}
                >
                  {count}
                </h4>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <p
                  style={{
                    fontFamily: "Uchen, serif",
                    fontSize: "1.5em",
                    margin: "0",
                    marginRight: "10px",
                  }}
                >
                  <b>Number of Seats Available:</b>
                </p>
                <h4
                  style={{ margin: "0", color: "#C0392B", fontWeight: "bold" }}
                >
                  {seat}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            marginRight: "45px",
          }}
        >
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => addFormFields()}
            style={{
              ...buttonStyle.button,
              ...(isHoveredAdd ? buttonStyle.buttonHover : {}),
            }}
            onMouseEnter={() => setIsHoveredAdd(true)}
            onMouseLeave={() => setIsHoveredAdd(false)}
          >
            <h5>
              <b>Add</b>
            </h5>
          </button>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
            style={{
              ...buttonStyle.button,
              ...(isHoveredBook ? buttonStyle.buttonHover : {}),
            }}
            onMouseEnter={() => setIsHoveredBook(true)}
            onMouseLeave={() => setIsHoveredBook(false)}
          >
            <h5>
              <b>Book</b>
            </h5>
          </button>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "20px",
  },
  formContainer: {
    flexDirection: "column",
    flex: 1,
    marginRight: "20px",
    marginTop: "10px",
    height: "455px",
    position: "relative",
    backgroundColor: "#FCF6F5FF",
    borderRadius: "12px",
  },
  deleteButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
  },
  tourInfoContainer: {
    marginTop: "10px",
    flex: 1,
    marginLeft: "20px",
  },
  card: {
    backgroundColor: "#F7ECDE",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.2s",
    minHeight: "400px",
    width: "750px",
    position: "relative",
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
    fontWeight: "bold",
  },
  perperson: {
    color: "#7E7474",
  },
};

const divStyle = {
  div: {
    flexDirection: "column",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: "380px",
    width: "270px",
    borderRadius: "10px",
    padding: "20px",
    backgroundColor: "#FCF6F5FF",
    marginTop: "10px",
  },
  inputContainer: {
    flex: 1,
    margin: "0 10px",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "100%",
    padding: "5px",
    height: "35px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    transition: "border-color 0.3s",
  },
  select: {
    width: "193px",
    padding: "5px",
    height: "35px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    transition: "border-color 0.3s",
  },
};

const buttonStyle = {
  button: {
    marginTop: "20px",
    marginRight: "25px",
    marginLeft: "30px",
    width: "100px",
    padding: "7px",
    borderRadius: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "green",
  },
};

export default AddTourist;