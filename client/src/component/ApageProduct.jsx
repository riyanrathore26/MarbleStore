import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../config';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrashAlt } from 'react-icons/fa';

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
        toast.success('Product deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product!');
    }
  };

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append('name', editingProduct.name);
      formData.append('price', editingProduct.price);
      formData.append('description', editingProduct.description);
      editingProduct.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });

      const response = await fetch(`${BASE_URL}/api/updateProduct/${editingProduct._id}`, {
        method: 'PUT',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        // Update product list after saving changes
        setProducts(products.map((product) => (product._id === editingProduct._id ? editingProduct : product)));
        setEditingProduct(null); // Clear editing state
        toast.success('Product updated successfully!');
      } else {
        console.error('Error updating product:', data.message);
        toast.error('Error updating product!');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Error updating product!');
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

  const handleAddImage = () => {
    setEditingProduct({ ...editingProduct, images: [...editingProduct.images, ''] });
  };

  const handleRemoveImage = (index) => {
    const newImages = editingProduct.images.filter((_, i) => i !== index);
    setEditingProduct({ ...editingProduct, images: newImages });
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...editingProduct.images];
        newImages[index] = reader.result;
        setEditingProduct({ ...editingProduct, images: newImages });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <ToastContainer /> {/* Toast container for notifications */}
      <h1>Products</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-item">
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
                <div className="image-edit-section">
                  {editingProduct.images.map((image, index) => (
                    <div key={index} className="image-edit-item">
                      <input
                        type="text"
                        value={image}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        placeholder={`Image URL ${index + 1}`}
                      />
                      <FaTrashAlt
                        onClick={() => handleRemoveImage(index)}
                        style={{ cursor: 'pointer', marginLeft: '10px' }}
                      />
                    </div>
                  ))}
                  {editingProduct.images.length < 5 && (
                    <button onClick={handleAddImage}>Add Another Image</button>
                  )}
                  {editingProduct.images.length > 0 && editingProduct.images[editingProduct.images.length - 1] === '' && (
                    <input
                      type="file"
                      onChange={(e) => handleImageUpload(e, editingProduct.images.length - 1)}
                    />
                  )}
                  <br />
                </div>
                <div className="button-group">
                  <button onClick={handleSaveChanges}>Save Changes</button>
                  <button onClick={() => setEditingProduct(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="product-details">
                <div className="images-container">
                  {product.images.map((image, index) => (
                    <img key={index} src={image} alt={`${product.name} ${index + 1}`} />
                  ))}
                </div>
                <h2>{product.name}</h2>
                <p>{product.price}</p>
                <p>{product.description}</p>
                <div className="button-group">
                  <button className="button button-edit" onClick={() => handleEditProduct(product)}>Edit</button>
                  <button className="button button-delete" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <ToastContainer /> {/* Add ToastContainer at the bottom */}
    </div>
  );
}
