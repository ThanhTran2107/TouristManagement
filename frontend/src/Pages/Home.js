import React from "react";
import { Link } from "react-router-dom";
import facebook from '../images/facebook.png';
import instagram from '../images/instagram.png';
import twitter from '../images/twitter.png';
import linkedIn from '../images/linkedIn.png';
import mailicon from '../images/mailicon.png';
import callicon from '../images/callicon.png';
import footer from '../images/footer-bg.jpg';
import main from '../images/main1.jpg';
import '../CSS/Home.css'
import Card from "../components/Card";
import about from '../images/aboutUs.jpg';
export const Home = () => {
  return (
    <div>
      {/* wallpaper */}
      <div style={{}}>
        <figure class="txtover" style={{ position: "relative" }}>
          <img
            className="responsive"
            src="https://minhducpc.vn/uploads/images/hinh-nen-viet-nam-4k35.jpg"
            style={{ width: "100%", maxHeight: "100vh", Color: "#000000" }}
          ></img>

          <figcaption
            className="centered"
            style={{ position: "absolute", bottom: "50vh", left: "40vw" }}
          >
            <div style={{ color: "crimson" }}>
              <p
                style={{
                  fontFamily: "Lucida Handwriting, Cursive ",
                  color: "#2C3639",
                }}
              >
                <h3>
                  <b>Welcome To</b>
                  <h2>
                    <b>SGU Travel !</b>
                  </h2>
                </h3>
                <p>
                  <h4>
                    <b>Your journey begins here at SGU</b>
                  </h4>
                </p>
              </p>
            </div>
          </figcaption>
        </figure>
      </div>

      {/* Activities */}
      <div
        style={{ maxWidth: "100%", height: "auto", backgroundColor: "white" }}
      >
        <div style={{ marginTop: "5vh" }}>
          <p style={{ fontFamily: "Cookie, Cursive ", textAlign: "center" }}>
            <h1>ACTIVITIES</h1>
          </p>
        </div>
        <br />
        <div style={{}}>
          <div>
            <Card />
          </div>
        </div>
      </div>
      <br />

      {/* image corousel */}
      <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
        <ol class="carousel-indicators">
          <li
            data-bs-target="#myCarousel"
            data-bs-slide-to="0"
            class="active"
          ></li>
          <li data-bs-target="#myCarousel" data-bs-slide-to="1"></li>
          <li data-bs-target="#myCarousel" data-bs-slide-to="2"></li>
          <li data-bs-target="#myCarousel" data-bs-slide-to="3"></li>
          <li data-bs-target="#myCarousel" data-bs-slide-to="4"></li>
        </ol>

        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="4000">
            <img
              src="https://ik.imagekit.io/tvlk/xpe-asset/AyJ40ZAo1DOyPyKLZ9c3RGQHTP2oT4ZXW+QmPVVkFQiXFSv42UaHGzSmaSzQ8DO5QIbWPZuF+VkYVRk6gh-Vg4ECbfuQRQ4pHjWJ5Rmbtkk=/5255025890550/Phong-Nha-Ke-Bang-National-Park-Tour-from-Hue-158e7222-35b7-4296-95bb-690972765d35.jpeg?tr=c-at_max,dpr-2.625,h-569,q-40,w-675"
              class="d-block w-100 h-40"
              className="d-block w-100"
              alt="Slide 1"
              style={{ maxHeight: "80vh", minHeight: "50vh" }}
            />
            <div class="carousel-caption d-none d-md-block">
              <br />
              <div class="d-flex h-100 text-center align-items-center">
                <div class="w-100 text-white">
                  <h1 class="mb-4" className="head1" color="cyan">
                    <b className="outline">Adventure Awaits You</b>
                  </h1>
                  <br />
                  <h3 class="mb-10" className="head2">
                    <h3>
                      <b className="outline">
                        <br />
                        <br />
                      </b>
                      <br />
                    </h3>
                  </h3>
                  <br />
                </div>
              </div>
            </div>
          </div>
          <div class="carousel-item" data-bs-interval="5000">
            <img
              src="https://cdnmedia.baotintuc.vn/Upload/XjfgEPYM30O8z6jY3MHxSw/files/2023/08/2408/cau-vang.jpg"
              class="d-block w-100"
              alt="Slide 2"
              style={{ maxHeight: "80vh", minHeight: "50vh" }}
            />
            <div class="carousel-caption d-none d-md-block">
              <br />
              <div class="d-flex h-100 text-center align-items-center">
                <div class="w-100 text-white">
                  <h1 class="mb-4" className="head1" color="cyan">
                    <b className="outline">Discover Amazing Places</b>
                  </h1>
                  <br />
                  <h3 class="mb-10" className="head2">
                    <h2>
                      <b className="outline">
                        <br />
                        <br />
                      </b>
                      <br />
                    </h2>
                  </h3>
                  <br />
                </div>
              </div>
            </div>
          </div>
          <div class="carousel-item" data-bs-interval="5000">
            <img
              src="https://minhducpc.vn/uploads/images/hinh-nen-viet-nam-4k05.jpg"
              class="d-block w-100 h-40"
              alt="Slide 3"
              style={{ maxHeight: "80vh", minHeight: "50vh" }}
            />
            <div class="carousel-caption d-none d-md-block">
              <br />
              <div class="d-flex h-100 text-center align-items-center">
                <div class="w-100 text-white">
                  <h1 class="mb-4" className="head1" color="cyan">
                    <b className="outline">Travel, Explore, Enjoy</b>
                  </h1>
                  <br />
                  <h3 class="mb-10" className="head2">
                    <h3>
                      <b className="outline">
                        <br />
                        <br />
                      </b>
                      <br />
                    </h3>
                  </h3>
                  <br />
                </div>
              </div>
            </div>
          </div>
          <div class="carousel-item" data-bs-interval="5000">
            <img
              src="https://minhducpc.vn/uploads/images/hinh-nen-viet-nam-4k10.jpg"
              class="d-block w-100 h-40"
              alt="Slide 4"
              style={{ maxHeight: "80vh", minHeight: "50vh" }}
            />
            <div class="carousel-caption d-none d-md-block">
              <br />
              <div class="d-flex h-100 text-center align-items-center">
                <div class="w-100 text-white">
                  <h1 class="mb-4" className="head1" color="cyan">
                    <b className="outline">Memories Start Here</b>
                  </h1>
                  <br />
                  <h3 class="mb-10" className="head2">
                    <h3>
                      <b className="outline">
                        <br />
                        <br />
                      </b>
                      <br />
                    </h3>
                  </h3>
                  <br />
                </div>
              </div>
            </div>
          </div>
          <div class="carousel-item" data-bs-interval="5000">
            <img
              src="https://minhducpc.vn/uploads/images/hinh-nen-viet-nam-4k38.jpg"
              alt="Slide 5"
              width="100%"
              style={{ maxHeight: "80vh", minHeight: "50vh" }}
            />
            <div class="carousel-caption d-none d-md-block">
              <br />
              <div class="d-flex h-100 text-center align-items-center">
                <div class="w-100 text-white">
                  <h1 class="mb-4" className="head1" color="cyan">
                    <b className="outline">Wander Without Limits</b>
                  </h1>
                  <br />
                  <h3 class="mb-10" className="head2">
                    <h3>
                      <b className="outline">
                        <br />
                        <br />
                      </b>
                      <br />
                    </h3>
                  </h3>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#myCarousel"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon"></span>
        </a>
        <a
          class="carousel-control-next"
          href="#myCarousel"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon"></span>
        </a>
      </div>
      <br />
      <br />

      {/* ********About Us******* */}

      <div
        s
        style={{
          backgroundColor: "rgba(0, 0.5, 0.5, 0.1)",
          maxWidth: "100%",
          height: "auto",
          display: "flex",
        }}
      >
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
          }}
        >
          <img
            src={about}
            alt="..."
            style={{
              maxHeight: "58vh",
              maxWidth: "80%",
              boxShadow: "25px 25px 4px 10px rgba(0, 0.5, 0.5, 0.3)",
            }}
          />
        </span>

        <span
          style={{
            maxWidth: "50%",
            padding: "0 50px 0 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ fontFamily: "Signika Negative", fontSize: 18.5 }}>
            {" "}
            <p style={{ fontFamily: "Cookie, Cursive ", textAlign: "center" }}>
              <h1>ABOUT US</h1>
            </p>
            At <b>SGU Travel</b>, we believe that every journey is a memorable
            adventure, and our mission is to turn your travel dreams into
            reality. With the ever-increasing number of internet users, we have
            developed the web application to provide customers with a seamless
            and convenient online tour booking experience. Instead of spending
            precious time searching for the best deals in the market, you can
            now explore a wide array of exciting tour options from the comfort
            of your home with just a few clicks. We are committed to building
            strong relationships with our customers, ensuring that you enjoy the
            most wonderful holidays you truly deserve. Let SGU Travel be your
            trusted partner in every step of your journey around VietNam !
          </p>
        </span>
      </div>
      <br></br>
      <br />

      {/* ******** FOOTER ********** */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={footer}
          style={{
            width: "100%",
            minHeight: "41vh",
            maxHeight: "50vh",
            position: "absolute",
          }}
        ></img>
        <span
          style={{
            width: "20vw",
            position: "relative",
            marginTop: "6vh",
            textAlign: "center",
          }}
        >
          <h4 style={{ fontFamily: "Cookie, Cursive ", color: "white" }}>
            Quick Links
          </h4>
          <br />
          <Link
            to="/"
            style={{
              fontFamily: "Nunito",
              color: "white",
              textDecoration: "none",
            }}
          >
            Home{" "}
          </Link>
          <br />
          <Link
            to="/userTourTable"
            style={{
              fontFamily: "Nunito",
              color: "white",
              textDecoration: "none",
            }}
          >
            Tours{" "}
          </Link>
          <br />
          <Link
            to="/feedback"
            style={{
              fontFamily: "Nunito",
              color: "white",
              textDecoration: "none",
            }}
          >
            Feedback
          </Link>
          <br />
          {/* <p
            to="/faq"
            style={{
              fontFamily: "Nunito",
              color: "white",
              textDecoration: "none",
            }}
          >
            FAQs
          </p> */}
          <br />
          {/* <p
            to="/contactus"
            style={{
              fontFamily: "Nunito",
              color: "white",
              textDecoration: "none",
              marginBottom: "-50px"
            }}
          >
            Contact Us
          </p> */}
        </span>

        <span
          style={{
            width: "20vw",
            position: "relative",
            marginTop: "6vh",
            textAlign: "center",
          }}
        >
          <h4 style={{ fontFamily: "Cookie, Cursive ", color: "white" }}>
            Contact Us
          </h4>
          <br />
          <h6
            style={{
              fontFamily: "Nunito",
              textAlign: "center",
              color: "white",
            }}
          >
            <img src={mailicon} style={{ height: "5vh" }}></img>{" "}
            sgutravel2107@gmail.com
          </h6>
          <h6
            style={{
              fontFamily: "Nunito",
              textAlign: "center ",
              color: "white",
            }}
          >
            <img src={callicon} style={{ height: "5vh" }}></img> 0917.339.863
          </h6>
        </span>

        <span
          style={{
            width: "20vw",
            position: "relative",
            marginTop: "6vh",
            textAlign: "center",
          }}
        >
          <h4 style={{ fontFamily: "Cookie, Cursive ", color: "white" }}>
            Follow Us
          </h4>
          <br />
          <h6
            style={{
              fontFamily: "Nunito",
              textAlign: "center",
              color: "white",
            }}
          >
            <img src={facebook} style={{ height: "5vh" }}></img> facebook
          </h6>
          <h6
            style={{
              fontFamily: "Nunito",
              textAlign: "center ",
              color: "white",
            }}
          >
            <img src={instagram} style={{ height: "5vh" }}></img> instagram
          </h6>
          <h6
            style={{
              fontFamily: "Nunito",
              textAlign: "center",
              color: "white",
            }}
          >
            <img src={linkedIn} style={{ height: "5vh" }}></img> linkedIn
          </h6>
          <h6
            style={{
              fontFamily: "Nunito",
              textAlign: "center ",
              color: "white",
            }}
          >
            <img src={twitter} style={{ height: "5vh" }}></img> twitter
          </h6>
        </span>
      </div>
    </div>
  );
};
