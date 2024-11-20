import React from "react";

const sports1 = require("../images/sports1.jpg");
const sports2 = require("../images/sports2.jpg");
const sports3 = require("../images/sports3.jpg");
const sports4 = require("../images/sports4.jpg");

const Card = () => {
  return (
    <div className="container">
      <div className="row" style={{ display: "flex" }}>
        <div className="col-md-3">
          <div
            className="card"
            style={{
              width: "16rem",
              height: "30rem",
              border: "none",
              marginLeft: 10,
            }}
          >
            <img
              src={sports1}
              alt="..."
              className="card-img-top"
              style={{ borderRadius: "50%" }}
            />

            <div
              className="card-body"
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <h5 className="card-title" style={{ fontFamily: "Nunito" }}>
                <strong>PARAGLIDING</strong>
              </h5>
              <p
                className="card-text"
                style={{ fontFamily: "Signika Negative" }}
              >
                Paragliding offers a breathtaking view of Vietnam's stunning
                landscapes. Popular spots include Doi Bu, Da Lat, and Mu Cang
                Chai.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div
            className="card"
            style={{
              width: "16rem",
              height: "30rem",
              border: "none",
              marginLeft: 10,
            }}
          >
            <img
              src="https://wetrek.vn/pic/service/1d2aef33-0460-4f2a-94f9-76b4508f7872.jpg.ashx?w=1200"
              alt="..."
              className="card-img-top"
              style={{ borderRadius: "50%", width: "260px", height: "260px" }}
            />

            <div
              className="card-body"
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <h5 className="card-title" style={{ fontFamily: "Nunito" }}>
                <strong>TREKKING</strong>
              </h5>
              <p
                className="card-text"
                style={{ fontFamily: "Signika Negative" }}
              >
                Discover Vietnam's diverse landscapes through trekking
                adventures, including routes like Fansipan, Ta Nang – Phan Dung,
                and Cat Ba Island.
              </p>
            </div>
          </div>{" "}
        </div>
        <div className="col-md-3">
          <div
            className="card"
            style={{
              width: "16rem",
              height: "30rem",
              border: "none",
              marginLeft: 10,
            }}
          >
            <img
              src={sports3}
              alt="..."
              className="card-img-top"
              style={{ borderRadius: "50%" }}
            />

            <div
              className="card-body"
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <h5 className="card-title" style={{ fontFamily: "Nunito" }}>
                <strong>ROWING</strong>
              </h5>
              <p
                className="card-text"
                style={{ fontFamily: "Signika Negative" }}
              >
                Rowing is a peaceful way to explore Vietnam's iconic waterways,
                from the serene rivers of Ninh Binh to the bustling floating
                markets of the Mekong Delta.
              </p>
            </div>
          </div>{" "}
        </div>
        <div className="col-md-3">
          <div
            className="card"
            style={{
              width: "16rem",
              height: "30rem",
              border: "none",
              marginLeft: 10,
            }}
          >
            <img
              src={sports4}
              alt="..."
              className="card-img-top"
              style={{ borderRadius: "50%" }}
            />

            <div
              className="card-body"
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <h5 className="card-title" style={{ fontFamily: "Nunito" }}>
                <strong>RIVER RAFTING</strong>
              </h5>
              <p
                className="card-text"
                style={{ fontFamily: "Signika Negative" }}
              >
                Challenge the rapids while rafting in Vietnam's adventurous
                rivers, such as the Da Nhim River in Da Lat or the Ma River in
                Thanh Hoa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
