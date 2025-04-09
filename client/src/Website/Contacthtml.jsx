import React from "react";
import { useNavigate } from "react-router-dom";
import icon1 from "./img/icon/icon-1.png";
import icon2 from "./img/icon/icon-2.png";
import icon3 from "./img/icon/icon-3.png";
import logo from "./myImg/logo.PNG";

const Contacthtml = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* <div id="preloder">
        <div className="loader"></div>
    </div> */}

      {/* <!-- Header Section Begin --> */}
      <div className="header-section">
        <div className="container">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="nav-menu">
            <nav className="mainmenu mobile-menu">
              <ul>
                <li>
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default anchor behavior
                      navigate("/"); // Navigate programmatically
                    }}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default anchor behavior
                      navigate("/"); // Navigate programmatically
                    }}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/gallery"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default anchor behavior
                      navigate("/gallery"); // Navigate programmatically
                    }}
                  >
                    Gallery
                  </a>
                </li>
                <li className="active">
                  <a
                    href="/contact"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default anchor behavior
                      navigate("/contact"); // Navigate programmatically
                    }}
                  >
                    Contacts
                  </a>
                </li>
              </ul>
            </nav>
            <a
              href="./login"
              onClick={(e) => {
                e.preventDefault(); // Prevent default anchor behavior
                navigate("/login"); // Navigate programmatically
              }}
              className="primary-btn signup-btn"
            >
              LogIn
            </a>
          </div>
          <div id="mobile-menu-wrap"></div>
        </div>
      </div>
      {/* <!-- Header End --> */}

      {/* <!-- Breadcrumb Section Begin --> */}
      <section
        className="breadcrumb-section set-bg contactUSImg"
        // data-setbg="./myImg/contact.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <h2>Contact US</h2>
                <div className="breadcrumb-option">
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default anchor behavior
                      navigate("/"); // Navigate programmatically
                    }}
                  >
                    <i className="fa fa-home"></i> Home
                  </a>
                  <span>Contact</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Breadcrumb Section End --> */}

      {/* <!-- Map Section Begin --> */}
      <div className="map">
        <div style={{ width: "100%", height: "612px" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.650297681005!2d74.2267920746125!3d16.694374022400442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1000df6c718cf%3A0x69b6b0a7d4c59832!2sSai%20Temple(Dilbhar%20Talim)!5e0!3m2!1sen!2sin!4v1737210469977!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>
      </div>
      {/* <!-- Map Section End --> */}

      {/* <!-- Contact Section Begin --> */}
      <section className="contact-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="contact-info">
                <h4>Contacts Us</h4>
                <div className="contact-address">
                  <div className="ca-widget">
                    <div className="cw-icon">
                      <img src={icon1} alt="" />
                    </div>
                    <div className="cw-text">
                      <h5>Our Location</h5>
                      <p>Dilbahar Talim, Manganwlar Peth, Kolhapur 416012</p>
                    </div>
                  </div>
                  <div className="ca-widget">
                    <div className="cw-icon">
                      <img src={icon2} alt="" />
                    </div>
                    <div className="cw-text">
                      <h5>Phone:</h5>
                      <p>+91 95959 27282</p>
                    </div>
                  </div>
                  <div className="ca-widget">
                    <div className="cw-icon">
                      <img src={icon3} alt="" />
                    </div>
                    <div className="cw-text">
                      <h5>Mail</h5>
                      <p>O3fitness@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="contact-form">
                <h4>Leave A Comment</h4>
                <form action="#">
                  <div className="row">
                    <div className="col-lg-6">
                      <input type="text" placeholder="Your name" />
                    </div>
                    <div className="col-lg-6">
                      <input type="text" placeholder="Your email" />
                    </div>
                    <div className="col-lg-12">
                      <textarea placeholder="Your messages"></textarea>
                      <button type="submit">Send Message</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Contact Section End --> */}

      {/* <!-- Footer Section Begin --> */}
      <footer className="footer-section">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="contact-option">
                <span>Phone</span>
                <p>+91 95959 27282</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="contact-option">
                <span>Address</span>
                <p>Dilbahar Talim, Manganwlar Peth, Kolhapur 416012</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="contact-option">
                <span>Email</span>
                <p>O3fitness@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="copyright-text">
            <div className="footer-social">
              <a href="#">
                <i className="fa fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fa fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fa fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fa fa-dribbble"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contacthtml;
