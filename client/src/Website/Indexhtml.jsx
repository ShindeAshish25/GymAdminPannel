import React from "react";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
// import "swiper/css/navigation";
import {
  MDBCarousel,
  // MDBCarouselInner,
  MDBCarouselItem,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
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

// import logo from "./myImg/logo.png";
import bg4 from "./myImg/bg4.jpg";
import bg3 from "./myImg/bg3.jpg";
import bg5 from "./myImg/bg5.jpg";
import gym from "./myImg/gym pic.jpg";
import yogesh from "./myImg/WhatsApp Image 2025-01-12 at 10.50.24 PM.jpeg";
import service_icon_1 from "./img/services/service-icon-1.png";
import service_icon_3 from "./img/services/service-icon-3.png";
import service_icon_2 from "./img/services/service-icon-2.png";
import service_icon_4 from "./img/services/service-icon-4.png";
import trainer_1 from "./myImg/sir.jpeg";
import trainer_2 from "./myImg/sir.jpeg";
// import getintouctch from "./myImg/getintouctch.jpg";
import getintouctch from "./myImg/Screenshot_10.png";
import banner_person from "./myImg/banner.png";

import testimonial_1 from "./img/testimonial/testimonial-1.jpg";
import quote_left from "./img/testimonial/quote-left.png";
import logo from "./myImg/logo.PNG";

const Indexhtml = () => {
  const navigate = useNavigate();

  const testimonials = [
    {
      name: "John Doe",
      text: "This is the best service I have ever used! Highly recommended.",
      image: "https://source.unsplash.com/100x100/?man",
    },
    {
      name: "Jane Smith",
      text: "Amazing experience, fantastic support, and great value.",
      image: "https://source.unsplash.com/100x100/?woman",
    },
    {
      name: "Alice Brown",
      text: "Super professional and efficient. Will use again!",
      image: "https://source.unsplash.com/100x100/?girl",
    },
    {
      name: "Michael Johnson",
      text: "Top-notch service with incredible results!",
      image: "https://source.unsplash.com/100x100/?boy",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);

  const nextTestimonial = () => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
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
            <img src={logo} alt="" />{" "}
          </div>
          <div className="nav-menu">
            <nav className="mainmenu mobile-menu">
              <ul>
                <li className="active">
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
                  <a href="#aboutus">About</a>
                </li>
                <li>
                  <a
                    href="./gallery"
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
                    href="./contact"
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

      {/* <!-- Hero Section Begin --> */}
      {/* <!-- <section className="hero-section set-bg" data-setbg="./myImg/bg2.jpg">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10">
                        <div className="hero-text">
                            <span>Elevate Your Strength, Empower Your Life!</span>
                            <h1>Challenge Yourself !! </h1>
                            <p>Join Us Today. Now Open near you in Manganwlar Peth, Kolhapur. </p>
                        </div>
                    </div>
                </div>
            </div>
        </section > --> */}

      <section className="carousel p-0" id="carousel">
        <div className="container-fluid hero-section p-0">
          <div
            id="carouselExampleCaptions"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={bg4} className="d-block w-100" alt="..." />
                <div className="caption hero-text slide1-text">
                  <span>Elevate Your Strength, Empower Your Life!</span>
                  <h1>Challenge Yourself !! </h1>
                  <p>
                    It’s always the perfect time to crush your goals! Built with
                    determination and fueled by passion, our gym is everything
                    you need to make every day stronger. Begin your journey
                    today!
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <img src={bg3} className="d-block w-100" alt="..." />
                <div className="caption hero-text slide2-text">
                  <span>EStronger Every Rep, Every Day!</span>
                  <h1>Push Your Limits</h1>
                  <p>
                    Your journey to strength begins here! Empowered by
                    dedication and driven by results, our gym is everything you
                    need to make every workout count. Let’s get started!
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <img src={bg5} className="d-block w-100" alt="..." />
                <div className="caption hero-text slide3-text">
                  <span>Fuel Your Fire, Forge Your Future!</span>
                  <h1>Lift to Win</h1>
                  <p>
                    Transform your today for a better tomorrow! At our gym, we
                    combine passion with purpose to create workouts that truly
                    matter. Start your story now!
                  </p>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>
      {/* <!-- Hero Section End --> */}

      {/* <!-- About Section Begin --> */}
      <section className="about-section spad" id="aboutus">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="about-pic">
                <img src={gym} alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-text">
                <h2>Story About Us</h2>
                <p className="first-para">
                  Welcome to <b> One on One Fitness </b>, where we focus on
                  helping you reach your fitness goals. We create personalized
                  workout plans to suit your needs and ensure you see results.
                  Our gym has modern equipment for all kinds of workouts.
                </p>
                <p className="second-para">
                  Our friendly and experienced trainers are here to guide and
                  support you. Whether you want to build strength, get fit, or
                  feel healthier, we’re here to help.{" "}
                  <b>
                    {" "}
                    Join " One on One Fitness" today and start your fitness
                    journey..!
                  </b>
                </p>
                <a href="#" className="primary-btn">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- About Section End --> */}

      {/* <!-- Services Section Begin --> */}
      <section className="services-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-5">
              <div className="services-pic">
                <img src={yogesh} alt="" />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="service-items">
                <div className="row">
                  <div className="col-md-6">
                    <div className="services-item bg-gray">
                      <img src={service_icon_1} alt="" />
                      <h4>Strategies</h4>
                      <p>
                        We create workout plans that match your personal goals
                        and needs.
                      </p>
                    </div>
                    <div className="services-item bg-gray pd-b">
                      <img src={service_icon_3} alt="" />
                      <h4>Workout</h4>
                      <p>
                        Our sessions include strength, cardio, and functional
                        exercises for balance. We provide diet plan suggestions.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="services-item">
                      <img src={service_icon_2} alt="" />
                      <h4>Yoga</h4>
                      <p>
                        Our sessions include a mix of cardio, strength training,
                        and functional exercises to keep your routine exciting
                        and effective.
                      </p>
                    </div>
                    <div className="services-item pd-b">
                      <img src={service_icon_4} alt="" />
                      <h4>Weight Loss</h4>
                      <p>
                        {" "}
                        Our trainers guide you through effective exercises and
                        offer tips to stay consistent and motivated.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Services Section End --> */}

      {/* <!-- Classes Section Begin --> */}
      <section className="classes-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>UNLIMITED CLASSES</h2>
              </div>
            </div>
          </div>
          <div className="row  ">
            <div className="col-lg-4">
              <div
                className="single-class-item  classes-1"
                //style={{ background }}
                // data-setbg="img/classes/classes-1.jpg"
              >
                <div className="si-text">
                  <h4>Strength Training</h4>
                  <span>
                    {/* <i className="fa fa-user"></i> Ryan Knight */}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className="single-class-item  classes-4"
                // data-setbg="img/classes/classes-4.jpg"
              >
                <div className="si-text">
                  <h4>Weight Gain</h4>
                  <span>
                    {/* <i className="fa fa-user"></i> Kevin McCormick */}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className="single-class-item  classes-2"
                // data-setbg="img/classes/classes-2.jpg"
              >
                <div className="si-text">
                  <h4>Dance</h4>
                  <span>
                    {/* <i className="fa fa-user"></i> Randy Rivera */}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className="single-class-item  classes-3"
                // data-setbg="img/classes/classes-3.jpg"
              >
                <div className="si-text">
                  <h4>Personal Training</h4>
                  <span>
                    {/* <i className="fa fa-user"></i> Cole Robertson */}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className="single-class-item  classes-6"
                // data-setbg="img/classes/classes-6.jpg"
              >
                <div className="si-text">
                  <h4>Weight Loss</h4>
                  <span>{/* <i className="fa fa-user"></i> Ryan Scott */}</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className="single-class-item  classes-7"
                // data-setbg="img/classes/classes-7.jpg"
              >
                <div className="si-text">
                  <h4>Cardio</h4>
                  <span>
                    {/* <i className="fa fa-user"></i> Cole Robertson */}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Classes Section End --> */}

      {/* <!-- Trainer Section Begin --> */}
      <section className="trainer-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>EXPERT TRAINERS</h2>
              </div>
            </div>
          </div>

          <div className="row text-center">
            <div className="col-lg-4 col-md-0"></div>
            {/* <div className="col-lg-4 col-md-6">
              <div className="single-trainer-item">
                <img src={trainer_1} alt="" />
                <div className="trainer-text">
                  <h5>Ashish Shinde</h5>
                  <span>Trainer</span>
                  <p>
                    non numquam eius modi tempora incidunt ut labore et dolore
                    magnam aliquam quaerat voluptatem.
                  </p>
                </div>
              </div>
            </div> */}
            <div className="col-lg-4 col-md-6">
              <div className="single-trainer-item">
                <img src={trainer_2} alt="" />
                <div className="trainer-text">
                  <h5>Sohel Sayyad</h5>
                  <span>Gym coach</span>
                  <p>
                    non numquam eius modi tempora incidunt ut labore et dolore
                    magnam aliquam quaerat voluptatem.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-0"></div>
          </div>
        </div>
      </section>
      {/* <!-- Trainer Section End --> */}

      {/* <!-- Testimonial Section Begin --> */}
      <section className="testimonial-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>success stories</h2>
              </div>
              <div id="demo" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="carousel-caption">
                      <p>
                        If Shai Reznik's TDD videos don't convince you to add
                        automated testing your code, I don't know what will.This
                        was the very best explanation of frameworks for
                        brginners that I've ever seen.{" "}
                      </p>{" "}
                      <img src="https://i.imgur.com/lE89Aey.jpg" />
                      <div id="image-caption">Sunny Shinde</div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="carousel-caption">
                      <p>
                        If Shai Reznik's TDD videos don't convince you to add
                        automated testing your code, I don't know what will.This
                        was the very best explanation of frameworks for
                        brginners that I've ever seen.
                      </p>{" "}
                      <img
                        src="https://i.imgur.com/QptVdsp.jpg"
                        className="img-fluid"
                      />
                      <div id="image-caption">Omkar Patil</div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="carousel-caption">
                      <p>
                        If Shai Reznik's TDD videos don't convince you to add
                        automated testing your code, I don't know what will.This
                        was the very best explanation of frameworks for
                        brginners that I've ever seen.
                      </p>{" "}
                      <img
                        src="https://i.imgur.com/jQWThIn.jpg"
                        className="img-fluid"
                      />
                      <div id="image-caption">Chaitanay Kovle</div>
                    </div>
                  </div>
                </div>{" "}
                <a
                  className="carousel-control-prev"
                  href="#demo"
                  data-slide="prev"
                >
                  {" "}
                  <i className="fa fa-arrow-left"></i>{" "}
                </a>{" "}
                <a
                  className="carousel-control-next"
                  href="#demo"
                  data-slide="next"
                >
                  {" "}
                  <i className="fa fa-arrow-right"></i>{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Testimonial Section End --> */}

      {/* <!-- Banner Section Begin --> */}
      <section
        className="banner-section set-bg bannerGym"
        data-setbg="img/banner-bg.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="banner-text">
                <h2>Get training today</h2>
                <p>
                  Gimply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry’s standard.
                </p>
                <a href="#" className="primary-btn banner-btn">
                  Contact Now
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              {/* <img src={banner_person} alt="" /> */}
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Banner Section End --> */}

      {/* <!-- Membership Section Begin --> */}
      <section className="membership-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>MEMBERSHIP PLANS</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="membership-item">
                <div className="mi-title">
                  <h4>Basic</h4>
                  <div className="triangle"></div>
                </div>
                <h2 className="mi-price">₹ 700</h2>
                <ul>
                  <li>
                    <p>Duration</p>
                    <span>1 months</span>
                  </li>
                  <li>
                    <p>Personal trainer</p>
                    <span>00 person</span>
                  </li>
                  <li>
                    <p>Number of visits</p>
                    <span>Unlimited</span>
                  </li>
                </ul>
                <a href="#" className="primary-btn membership-btn">
                  Start Now
                </a>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="membership-item">
                <div className="mi-title">
                  <h4>Standard</h4>
                  <div className="triangle"></div>
                </div>
                <h2 className="mi-price">
                  ₹ 1800<span></span>
                </h2>
                <ul>
                  <li>
                    <p>Duration</p>
                    <span>3 months</span>
                  </li>
                  <li>
                    <p>Personal trainer</p>
                    <span>01 person</span>
                  </li>
                  <li>
                    <p>Number of visits</p>
                    <span>Unlimited</span>
                  </li>
                </ul>
                <a href="#" className="primary-btn membership-btn">
                  Start Now
                </a>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="membership-item">
                <div className="mi-title">
                  <h4>Premium</h4>
                  <div className="triangle"></div>
                </div>
                <h2 className="mi-price">₹ 3500</h2>
                <ul>
                  <li>
                    <p>Duration</p>
                    <span>6 months</span>
                  </li>
                  <li>
                    <p>Personal trainer</p>
                    <span>01 person</span>
                  </li>

                  <li>
                    <p>Number of visits</p>
                    <span>Unlimited</span>
                  </li>
                </ul>
                <a href="#" className="primary-btn membership-btn">
                  Start Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Membership Section End --> */}

      {/* <!-- Register Section Begin --> */}
      <section className="register-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="register-text">
                <div className="section-title">
                  <h2>Register Now</h2>
                  <p>
                    The First 7 Day Trial Is Completely Free With The Teacher
                  </p>
                </div>
                <form action="#" className="register-form">
                  <div className="row">
                    <div className="col-lg-6">
                      <label for="name">First Name</label>
                      <input type="text" id="name" />
                    </div>
                    <div className="col-lg-6">
                      <label for="email">Your email address</label>
                      <input type="text" id="email" />
                    </div>
                    <div className="col-lg-6">
                      <label for="last-name">Last Name</label>
                      <input type="text" id="last-name" />
                    </div>
                    <div className="col-lg-6">
                      <label for="mobile">Mobile No*</label>
                      <input type="text" id="mobile" />
                    </div>
                  </div>
                  <button type="submit" className="register-btn">
                    Get Started
                  </button>
                </form>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="register-pic">
                <img src={getintouctch} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Register Section End --> */}

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
      {/* <!--Footer Section End-- > */}
    </>
  );
};

export default Indexhtml;
