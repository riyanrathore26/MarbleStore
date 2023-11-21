import React, { useState, useEffect } from 'react';
import '../Components_css/PostData.css';
import axios from 'axios';

const PostData = () => {
  const [products, setProducts] = useState([]);
  const [indexMap, setIndexMap] = useState({});

  const fun = (productId, direction) => {
    const currentIndex = indexMap[productId] || 0;
    let newIndex;

    if (direction === 'next') {
      // Move forward
      const maxIndex = products.find(product => product._id === productId)?.images.length - 1;
      newIndex = currentIndex < maxIndex ? currentIndex + 1 : currentIndex;
    } else {
      // Move backward
      newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    }

    // Update the state with the new index for the specific product _id
    setIndexMap((prevIndexMap) => ({
      ...prevIndexMap,
      [productId]: newIndex,
    }));
  };

  useEffect(() => {
    // Fetch data from the backend (replace with your actual backend URL)
    axios.get('http://localhost:5000/posts')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, []); // Empty dependency array to fetch data only once on component mount

  return (
    <>
    <div className='try'>
      {products.map(product => (
        <div key={product._id} className='Slide-Container'>
          {/* Use the new index value to change the image */}
          <img src={`http://localhost:5000/images/${product.images[indexMap[product._id] || 0]}`} alt={product.name} />
          <h1>Name:-{product.name}</h1>
          <h1>Price:-{product.price}</h1>
          <button className='Post-Btn prev' onClick={() => fun(product._id, 'previous')}></button>
          <button className='Post-Btn next' onClick={() => fun(product._id, 'next')}></button>  
        </div>
      ))}
      </div>
    </>
  );
};

export default PostData;