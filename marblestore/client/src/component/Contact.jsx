import React from 'react';
import { FaBuilding, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3553.770032247856!2d74.7243043!3d27.0374318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396b9dad98f7d335%3A0x2d4f44f8fa426851!2sMakrana%20Junction!5e0!3m2!1sen!2sin!4v1715469951728!5m2!1sen!2sin";

  return (
    <>
      <div className="contect" style={{display:'flex'}}>
        <div className="map" style={{marginTop:'15px'}}>
          <iframe
            src={mapUrl}
            width="600"
            height="450"
            style={{ border: 0, borderRadius: 15 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="information" style={{margin:'80px',border:'2px solid black',borderRadius:'10px', padding:'5px'}}>
        <h2>Contact Information:-</h2>
        <hr />
        <br />
        <ul>
          <li>
            <FaBuilding className="icon" /> <span>Company Name</span>
          </li>
          <br />
          <li>
            <FaPhoneAlt className="icon" /> <span>+91 9999999999</span>
          </li>
          <br />
          <li>
            <FaMapMarkerAlt className="icon" /> <span>Address of Company</span>
          </li>
          <br />
          <li>
            <FaEnvelope className="icon" /> <span>exaple@gmail.com</span>
          </li>
          <br />
        </ul>
      </div>

      </div>
    </>
  );
};

export default Contact;
