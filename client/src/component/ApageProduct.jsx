import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../config';
import axios from 'axios';

export default function ApageProduct() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/showProduct`); // Replace with your actual API endpoint
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product });
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/deleteProduct/${productId}`);
      if (response.status === 200) {
        setProducts(products.filter(product => product._id !== productId));
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/updateProduct/${editingProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingProduct),
      });
      const data = await response.json();
      if (data.success) {
        // Update product list after saving changes
        setProducts(products.map((product) => (product._id === editingProduct._id ? editingProduct : product)));
        setEditingProduct(null); // Clear editing state
      } else {
        console.error('Error updating product:', data.message);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...editingProduct.images];
    newImages[index] = value;
    setEditingProduct({ ...editingProduct, images: newImages });
  };

  return (
    <div>
      <h1>Products</h1>
      <div className="product-list" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <div key={product._id} className="product-item" style={{ margin: '10px', width: '100%' }}>
            {editingProduct && editingProduct._id === product._id ? (
              <div className="product-edit-form">
                <input
                  type="text"
                  name="name"
                  value={editingProduct.name}
                  onChange={handleChange}
                  placeholder="Product Name"
                />
                <input
                  type="text"
                  name="price"
                  value={editingProduct.price}
                  onChange={handleChange}
                  placeholder="Product Price"
                />
                <textarea
                  name="description"
                  value={editingProduct.description}
                  onChange={handleChange}
                  placeholder="Product Description"
                />
                <div className="image-edit-section" style={{ display: 'flex', flexDirection: 'column' }}>
                  {editingProduct.images.map((image, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                      <h6>{index + 1}</h6>
                      <input
                        type="text"
                        value={image}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        placeholder={`Image URL ${index + 1}`}
                        style={{ flex: 1 }}
                      />
                    </div>
                  ))}
                </div>
                <button onClick={handleSaveChanges}>Save Changes</button>
                <button onClick={() => setEditingProduct(null)}>Cancel</button>
              </div>
            ) : (
              <div className="product-details">
                <div className="images-container" style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
                  {product.images.map((image, index) => (
                    <img key={index} src={image} alt={`${product.name} ${index + 1}`} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                  ))}
                </div>
                <h2>{product.name}</h2>
                <p>{product.price}</p>
                <p>{product.description}</p>
                <button onClick={() => handleEditProduct(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
