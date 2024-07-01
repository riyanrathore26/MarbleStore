import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaPinterest, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="list-box">
          <ul>
            <h1>More from MarbleStore</h1>
            <li><a href="">about us</a></li>
            <li><a href="">privacy policy</a></li>
            <li><a href="">FAQ</a></li>
            <li><a href="">terms and conditions</a></li>
            <li><a href="">contribute</a></li>
          </ul>
          <ul>
            <h1>Categories</h1>
            <li><a href="">Marble At Home</a></li>
            <li><a href="">Home Decore</a></li>
            <li><a href="">Marble At Home</a></li>
            <li><a href="">Marble At Home</a></li>
            <li><a href="">Marble At Home</a></li>

          </ul>
          <ul>
            <h1>Work with Us</h1>
            <li><a href="">Franchise</a></li>
          </ul>
          <ul>
            <h1>Contact & Support</h1>
            <li><a href="">contact us</a></li>
            <li><a href="">support@akimarble.com</a></li>
          </ul>
        </div>
        <div className="icon-box">
          <div className="icon"><FaInstagram /></div>
          <div className="icon"><FaFacebookF /></div>
          <div className="icon"><FaTwitter /></div>
          <div className="icon"><FaPinterest /></div>
          <div className="icon"><FaYoutube /></div>
        </div>
        <p className="footer-text">
          Copyright 2017-2024 @MarbleStore | Powered by: Notion Online Solutions Private Limited
        </p>
      </div>
    </>
  );
}

export default Footer;
