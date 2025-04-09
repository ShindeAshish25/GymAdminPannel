import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/bootstrap.min.css";
import "./css/font-awesome.min.css";
import "./css/owl.carousel.min.css";
import "./css/magnific-popup.css";
import "./css/slicknav.min.css";
import "./css/style.css";

import "./js/jquery-3.3.1.min.js";
import "./js/bootstrap.min.js";
import "./js/jquery.magnific-popup.min.js";
import "./js/mixitup.min.js";
import "./js/jquery.slicknav.js";
import "./js/owl.carousel.min.js";
import "./js/main.js";

// import gallery1 from "./img/gallery/gallery-1.jpg";
// import gallery2 from "./img/gallery/gallery-2.jpg";
// import gallery3 from "./img/gallery/gallery-3.jpg";
// import gallery4 from "./img/gallery/gallery-4.jpg";
// import gallery5 from "./img/gallery/gallery-5.jpg";
// import gallery6 from "./img/gallery/gallery-6.jpg";
// import gallery7 from "./img/gallery/gallery-7.jpg";

import gallery1 from "./myImg/Screenshot_1.png";
import gallery2 from "./myImg/Screenshot_2.png";
import gallery3 from "./myImg/Screenshot_3.png";
import gallery4 from "./myImg/Screenshot_4.png";
import gallery5 from "./myImg/Screenshot_5.png";
import gallery6 from "./myImg/Screenshot_6.png";
import gallery7 from "./myImg/Screenshot_7.png";
import gallery8 from "./myImg/Screenshot_8.png";
import gallery9 from "./myImg/Screenshot_9.png";
import gallery10 from "./myImg/Screenshot_10.png";
import gallery11 from "./myImg/Screenshot_11.png";
// import gallery12 from "./myImg/Screenshot_12.png";

import logo from "./myImg/logo.PNG";

const images = [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
  gallery7,
  gallery8,
  gallery9,
  gallery10,
  gallery11,
  // gallery12,
];
const Galleryhtml = () => {
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const openImage = (index) => {
    setSelectedImage(images[index]);
    setCurrentIndex(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
    setCurrentIndex(null);
  };

  const showNext = (e) => {
    e.stopPropagation();
    if (currentIndex !== null) {
      const nextIndex = (currentIndex + 1) % images.length;
      setSelectedImage(images[nextIndex]);
      setCurrentIndex(nextIndex);
    }
  };

  const showPrev = (e) => {
    e.stopPropagation();
    if (currentIndex !== null) {
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      setSelectedImage(images[prevIndex]);
      setCurrentIndex(prevIndex);
    }
  };

  return (
    <>
      {/* <!-- Page Preloder --> */}
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
                <li className="active">
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
                <li>
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
      <section className="breadcrumb-section set-bg galleryImg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <h2>Gallery</h2>
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
                  <span>Gallery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Breadcrumb Section End --> */}

      {/* <!-- Gallery Section Begin --> */}
      <div className="gallery-section spad">
        <div className="container">
          <div className="gallery-container">
            <div className="gallery-grid">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Gallery"
                  className="gallery-item"
                  onClick={() => openImage(index)}
                />
              ))}
            </div>

            {selectedImage && (
              <div className="overlay" onClick={closeImage}>
                <div className="lightbox" onClick={(e) => e.stopPropagation()}>
                  <button className="close-btn" onClick={closeImage}>
                    &times;
                  </button>
                  <button className="prev-btn" onClick={showPrev}>
                    &#10094;
                  </button>
                  <img
                    src={selectedImage}
                    alt="Full Size"
                    className="full-img"
                  />
                  <button className="next-btn" onClick={showNext}>
                    &#10095;
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <!-- Gallery Section End --> */}

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

export default Galleryhtml;
