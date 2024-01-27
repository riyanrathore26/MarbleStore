import React, { useState, useEffect } from 'react';
import NavigationBar from "./NavigationBar";
import axios from 'axios';
import ChatInterface from './ChatInterface';
import '../Components_css/Seller.css';

const Seller = () => {
  const [isChatOpen, setChatOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [indexMap, setIndexMap] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/ShowSeller')
      .then(response => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, []);

  const handleButton = (productId, direction) => {
    console.log("JI", productId, direction);
    // Implement logic based on productId and direction
  };

  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  return (
    <>
      <NavigationBar />
      <div className='Sellers'>
        {products.map(product => (
          <div key={product._id} className='Seller-Container'>
            <h1>Seller Name: {product.SellerName || 'N/A'}</h1>
            {/* Other details */}
            <button className='Seller-Btn prev' onClick={() => handleButton(product._id, 'previous')}></button>
            <button className='Seller-Btn next' onClick={() => handleButton(product._id, 'next')}></button>
            {!isChatOpen && (
              <button onClick={toggleChat} className="chat-button">Message</button>
            )}
            {isChatOpen && <ChatInterface onClose={toggleChat} SellerName={product.SellerName} seller_id={product._id} />}
          </div>
        ))}
      </div>
    </>
  );
};

export default Seller;
