import React, { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import axios from 'axios';
import '../Components_css/Seller.css'
const Seller = () => {
  const fun = (productId, direction) => {
    console.log("JI", productId, direction);
    // Implement logic based on productId and direction
  };
  const MessageSeller = () =>{
    alert("JI");
  };

  const [products, setProducts] = useState([]);
  const [indexMap, setIndexMap] = useState({});

  useEffect(() => {
    // Fetch data from the backend (replace with your actual backend URL)
    axios.get('http://localhost:5000/ShowSeller')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, []); // Empty dependency array to fetch data only once on component mount

  return (
    <>
      <NavigationBar />
      <div className='Sellers'>
        {products.map(product => (
          <div key={product._id} className='Seller-Container'>
            {/* Use the new index value to change the image */}
            {/* <img src={`http://localhost:5000/images/${product.images[indexMap[product._id] || 0]}`} alt={product.SellerName} /> */}
            <h1>Name: {product.SellerName}</h1>
            <h1>Price: {product.ProjectPrice}</h1>
            <button className='Seller-Btn prev' onClick={() => fun(product._id, 'previous')}></button>
            <button className='Seller-Btn next' onClick={() => fun(product._id, 'next')}></button>
            <button onClick={() => MessageSeller()}>message</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Seller;
