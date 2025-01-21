import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const scroll = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/*================ Start Footer Area =================*/}
      <footer className="footer-area section_gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 single-footer-widget">
              <div className="d-flex bg-white">
                <img src="/assets/img/LogoSeniorBuddy.png" width="200px" alt="logo" />
                </div>
              <p className="mt-4 text-white">
              Empowering juniors and seniors to connect, collaborate, and grow together through meaningful mentorship and knowledge sharing, fostering a culture of mutual support and success.
              </p>
            </div>

            <div className="col-lg-3 col-md-6 single-footer-widget text-center">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <Link to="/" onClick={scroll}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" onClick={scroll}>
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/upcommingEvents" onClick={scroll}>
                    Events
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 single-footer-widget text-white">
              <h4>Contact Us</h4>
              <p>
                <i className="fas fa-map-marker-alt me-2"></i> 123 Mentor Road, ConnectCity, CC 12345
              </p>
              <p>
                <i className="fas fa-phone-alt me-2"></i> +1 234 567 890
              </p>
              <p>
                <i className="fas fa-envelope me-2"></i> info@seniorbuddy.org
              </p>
            </div>

            <div className="col-lg-3 col-md-6 single-footer-widget">
              <h4>Connect With us</h4>
                 <div className="col-lg-4 col-sm-12 ms-5">
              <a href="#" className="me-2">
                <i className="fab fa-facebook-f text-warning"></i>
              </a>
              <a href="#" className="me-2">
                <i className="fab fa-twitter text-warning"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram text-warning"></i>
              </a>
            </div>
            </div>
          </div>

          <div className="row footer-bottom ">
            <p className="col-lg-8 col-sm-12 footer-text m-0 text-white text-center mx-auto">
              Copyright © All rights reserved |
              <a href="/" target="_blank">
                SeniorBuddy
              </a>
            </p>
         
          </div>
        </div>
      </footer>
      {/*================ End Footer Area =================*/}
    </>
  );
}
