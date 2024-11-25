import { Link } from "react-router-dom";
import React, { Component } from "react";
import '../CSS/Header.css';
import { toast } from "react-toastify";

const logo2 = require("../images/logo.png");
const user = sessionStorage.getItem("userId");
const uID = user ?? ' ';

const role = sessionStorage.getItem("role");
const firstName = sessionStorage.getItem("firstName");
const lastName = sessionStorage.getItem('lastName');

export default class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            show: true,
        }
    }

    logout() {
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("firstName");
        sessionStorage.removeItem("lastName");

        window.location.href = "http://localhost:3000";
        toast.success("Logged out Successfully!! Visit Again!!");
    }

    render() {
        return (
          <nav
            className="navbar navbar-expand-lg fixed-top"
            style={{ backgroundColor: "light blue" }}
          >
            <div className="container">
              <div>
                <Link to={"/"}>
                  <img src={logo2} alt="logo" width={270} height={80} />
                </Link>
              </div>

              <button
                className="navbar-toggler border border-info text-info"
                onClick={() => {
                  this.setState({ show: !this.state.show });
                }}
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className={
                  this.state.show
                    ? "collapse navbar-collapse"
                    : "collapse navbar-collapse active"
                }
              >
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link
                      className="nav-link text-white"
                      to={"/"}
                      style={{
                        color: "#ffffff",
                        fontWeight: "bold",
                        fontFamily: "Uchen, serif",
                      }}
                    >
                      <h5>Home</h5>
                    </Link>
                  </li>

                  <li className="nav-item">
                    {uID === " " ? (
                      <Link
                        className="nav-link text-white"
                        to={"/signIn"}
                        style={{
                          color: "#ffffff",
                          fontWeight: "bold",
                          fontFamily: "Uchen, serif",
                        }}
                      >
                        <h5>Login</h5>
                      </Link>
                    ) : (
                      " "
                    )}
                  </li>
                  <li className="nav-item">
                    {role === "USER" ? (
                      <Link
                        className="nav-link text-white"
                        to={"/userProfile"}
                        style={{
                          color: "#ffffff",
                          fontWeight: "bold",
                          fontFamily: "Uchen, serif",
                        }}
                      >
                        <h5>Profile</h5>
                      </Link>
                    ) : (
                      " "
                    )}
                  </li>
                  <li className="nav-item">
                    {role === "ADMIN" ? (
                      <Link
                        className="nav-link text-white"
                        to={"/userProfile"}
                        style={{
                          color: "#ffffff",
                          fontWeight: "bold",
                          fontFamily: "Uchen, serif",
                        }}
                      >
                        <h5>Profile</h5>
                      </Link>
                    ) : (
                      " "
                    )}
                  </li>
                  <li className="nav-item">
                    {uID === " " ? (
                      <Link
                        className="nav-link text-white"
                        to={"/signUp"}
                        style={{
                          color: "#ffffff",
                          fontWeight: "bold",
                          fontFamily: "Uchen, serif",
                        }}
                      >
                        <h5>Sign up</h5>
                      </Link>
                    ) : (
                      " "
                    )}
                  </li>

                  <li className="nav-item">
                    {role === "USER" || uID === " " ? (
                      <Link
                        className="nav-link text-white"
                        to={"/userTourTable"}
                        style={{
                          color: "#ffffff",
                          fontWeight: "bold",
                          fontFamily: "Uchen, serif",
                        }}
                      >
                        <h5>Tours</h5>
                      </Link>
                    ) : (
                      " "
                    )}
                  </li>

                  <li className="nav-item">
                    {role === "ADMIN" ? (
                      <Link
                        className="nav-link text-white"
                        to={"/admin"}
                        style={{
                          color: "#ffffff",
                          fontWeight: "bold",
                          fontFamily: "Uchen, serif",
                        }}
                      >
                        <h5>Admin</h5>
                      </Link>
                    ) : (
                      ""
                    )}
                  </li>

                  <li className="nav-item">
                    {role === "USER" ? (
                      <Link
                        className="nav-link text-white"
                        to={"/getBookedTours"}
                        style={{
                          color: "#ffffff",
                          fontWeight: "bold",
                          fontFamily: "Uchen, serif",
                        }}
                      >
                        <h5>Invoice</h5>
                      </Link>
                    ) : role === "ADMIN" ? (
                      <Link
                        className="nav-link text-white"
                        to={"/getallbookings"}
                        style={{
                          color: "#ffffff",
                          fontWeight: "bold",
                          fontFamily: "Uchen, serif",
                        }}
                      >
                        <h5>Confirmation</h5>
                      </Link>
                    ) : (
                      ""
                    )}
                  </li>

                  <li className="nav-item">
                    {role === "USER" ? (
                      <Link
                        className="nav-link text-white"
                        to={"/feedback"}
                        style={{
                          color: "#ffffff",
                          fontWeight: "bold",
                          fontFamily: "Uchen, serif",
                        }}
                      >
                        <h5>Feedback</h5>
                      </Link>
                    ) : (
                      ""
                    )}
                  </li>

                  <li className="nav-item">
                    {role === "ADMIN" ? (
                      <Link
                        className="nav-link text-white"
                        to={"/getFeedback"}
                        style={{
                          color: "#ffffff",
                          fontWeight: "bold",
                          fontFamily: "Uchen, serif",
                        }}
                      >
                        <h5>Feedback</h5>
                      </Link>
                    ) : (
                      ""
                    )}
                  </li>

                  {/* <li className="nav-item">
                                {role === 'ADMIN' ? <Link className="nav-link text-white" to={'/search'} style={{ color: "#ffffff", fontWeight: "bold", fontFamily: "Uchen, serif" }}><h5>Search</h5></Link>
                                    : <Link className="nav-link text-white" to={'/gettours'} style={{ color: "#ffffff", fontWeight: "bold", fontFamily: "Uchen, serif" }}><h5>Search</h5></Link>}
                            </li> */}

                  {uID === " " ? (
                    ""
                  ) : (
                    <h5
                      style={{
                        marginTop: "8px",
                        marginLeft: "2vw",
                        fontFamily: "Georgia, serif",
                        color: "#143F6B",
                      }}
                    >
                      {" "}
                      <b>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome, {firstName}{" "}
                        {lastName}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </b>{" "}
                    </h5>
                  )}

                  {uID === " " ? (
                    ""
                  ) : (
                    <button className="logout-btn" onClick={this.logout}>
                      <b>Logout</b>
                    </button>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        );
    }
}
