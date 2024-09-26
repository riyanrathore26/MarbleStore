import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaPinterest, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <>
      <div className="footer w-full p-5 flex flex-col items-center bg-gray-900 text-white bg-cover bg-center" style={{ backgroundImage: "url('img/Footer_bg.jpg')" }}>
        <div className="list-box w-full flex flex-wrap justify-center gap-5 py-5">
          <ul className="flex-1 min-w-[200px] m-2">
            <h1 className="text-pink-700 text-lg mb-2">More from MarbleStore</h1>
            <li><a href="#" className="text-white text-sm block my-1">about us</a></li>
            <li><a href="#" className="text-white text-sm block my-1">privacy policy</a></li>
            <li><a href="#" className="text-white text-sm block my-1">FAQ</a></li>
            <li><a href="#" className="text-white text-sm block my-1">terms and conditions</a></li>
            <li><a href="#" className="text-white text-sm block my-1">contribute</a></li>
          </ul>
          <ul className="flex-1 min-w-[200px] m-2">
            <h1 className="text-pink-700 text-lg mb-2">Categories</h1>
            <li><a href="#" className="text-white text-sm block my-1">Marble At Home</a></li>
            <li><a href="#" className="text-white text-sm block my-1">Home Decor</a></li>
            <li><a href="#" className="text-white text-sm block my-1">Marble At Home</a></li>
            <li><a href="#" className="text-white text-sm block my-1">Marble At Home</a></li>
            <li><a href="#" className="text-white text-sm block my-1">Marble At Home</a></li>
          </ul>
          <ul className="flex-1 min-w-[200px] m-2">
            <h1 className="text-pink-700 text-lg mb-2">Work with Us</h1>
            <li><a href="#" className="text-white text-sm block my-1">Franchise</a></li>
          </ul>
          <ul className="flex-1 min-w-[200px] m-2">
            <h1 className="text-pink-700 text-lg mb-2">Contact & Support</h1>
            <li><a href="#" className="text-white text-sm block my-1">contact us</a></li>
            <li><a href="#" className="text-white text-sm block my-1">support@akimarble.com</a></li>
          </ul>
        </div>
        <div className="icon-box flex flex-wrap justify-center items-center gap-5 my-5">
          <div className="icon w-12 h-12 rounded-full bg-white flex items-center justify-center text-pink-700 text-2xl hover:scale-110 transition-transform cursor-pointer">
            <FaInstagram />
          </div>
          <div className="icon w-12 h-12 rounded-full bg-white flex items-center justify-center text-pink-700 text-2xl hover:scale-110 transition-transform cursor-pointer">
            <FaFacebookF />
          </div>
          <div className="icon w-12 h-12 rounded-full bg-white flex items-center justify-center text-pink-700 text-2xl hover:scale-110 transition-transform cursor-pointer">
            <FaTwitter />
          </div>
          <div className="icon w-12 h-12 rounded-full bg-white flex items-center justify-center text-pink-700 text-2xl hover:scale-110 transition-transform cursor-pointer">
            <FaPinterest />
          </div>
          <div className="icon w-12 h-12 rounded-full bg-white flex items-center justify-center text-pink-700 text-2xl hover:scale-110 transition-transform cursor-pointer">
            <FaYoutube />
          </div>
        </div>
        <p className="footer-text text-center my-5 text-sm">
          Copyright 2017-2024 @MarbleStore | Powered by: Notion Online Solutions Private Limited
        </p>
      </div>
    </>
  );
}

export default Footer;
