import React, { useState, useEffect } from 'react';
import FeedBackService from "../../Services/FeedBackService";
const star = require("../../images/star.png");
const closeIcon = require("../../images/close-icon.png");

const GetFeedback = () => {
  const [Feedback, setFeedback] = useState([]);

  const init = () => {
    FeedBackService.getAllFeedBacks()
      .then((response) => {
        console.log("Printing feedbacks: ", response.data);
        setFeedback(response.data);
      });
  };

  const deleteFeedback = (feedbackId) => {
    console.log("Deleting feedback with ID:", feedbackId);
    FeedBackService.deleteFeedBack(feedbackId)
      .then((response) => {
        console.log("Feedback deleted: ", response.data);
        setFeedback(prevFeedback => prevFeedback.filter(feedback => feedback.feedbackId !== feedbackId));      
      })
      .catch((error) => {
        console.error("There was an error deleting the feedback!", error);
      });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div style={Styles.containerStyle}>
      <h2 style={Styles.titleStyle}>Customer Feedback</h2>
      <div style={Styles.feedbackContainer}>
        {Feedback.map((feedback) => (
          <div className="card" style={Styles.cardStyle} key={feedback.feedbackId}>
            <img 
              src={closeIcon} 
              alt="Delete" 
              style={Styles.closeIcon} 
              onClick={() => deleteFeedback(feedback.feedbackId)} 
            />
            <div className="card-body" style={Styles.cardBody}>
              <h5 className="card-title" style={Styles.ratingStyle}>
                <img src={star} alt="star" style={Styles.starStyle} />
                {feedback.rating}
              </h5>
              <h6 className="card-subtitle mb-2 text-muted">Name: {feedback.firstName}</h6>
              <h6 className="card-subtitle mb-2 text-muted">Email: {feedback.email}</h6>
              <p className="card-text">{feedback.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Styles = {
  containerStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    background: `linear-gradient(to right, #D2DAFF, #EFEFEF, #B1B2FF)`,
    minHeight: "100vh",
    padding: "20px",
  },
  titleStyle: {
    marginBottom: "20px",
    color: "#C00000",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  feedbackContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: "1200px",
  },
  cardStyle: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F7ECDE",
    border: "1px solid #C00000",
    borderRadius: "10px",
    margin: "10px",
    padding: "15px",
    width: "300px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.2s",
  },
  closeIcon: {
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "20px", 
    cursor: "pointer",
  },
  cardBody: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  ratingStyle: {
    display: "flex",
    alignItems: "center",
  },
  starStyle: {
    width: "20px",
    marginRight: "5px",
  },
};

export default GetFeedback;