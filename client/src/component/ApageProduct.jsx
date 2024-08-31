import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../config';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import availableTags from './availableTags';
import { FaTrashAlt } from 'react-icons/fa';

export default function ApageProduct() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [currentTags, setCurrentTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState('');
  const [bgRemoved, setBgRemoved] = useState([]);



  const handleCategoryClick = (category) => {
    setCurrentTags(availableTags[category]);
  };

  const handleTagClick = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
      setTags((prevTags) => (prevTags ? `${prevTags}, ${tag}` : tag));
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
    setTags(tags.split(',').filter((tag) => tag.trim() !== tagToRemove).join(', '));
  };



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
  const handleImageUpload = (e, index) => {
    console.log("stee");
    const file = e.target.files[0];
    if (file) {
      console.log(typeof(file));
      console.log(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImagesArray = [...newImages];
        newImagesArray[index] = file; // Store the file object instead of base64 data
        setNewImages(newImagesArray);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append('name', editingProduct.name);
      formData.append('price', editingProduct.price);
      formData.append('description', editingProduct.description);
      formData.append('tags', tags.split(',').map(tag => tag.trim()));

      // Add existing images as a JSON string
      formData.append('existingImages', JSON.stringify(editingProduct.images));

      // Add new images to FormData
      newImages.forEach((image) => {
        formData.append('newImages', image); // Match this with Multer's expected field name
      });

      const response = await fetch(`${BASE_URL}/api/updateProduct/${editingProduct._id}`, {
        method: 'PUT',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setProducts(products.map(product => product._id === editingProduct._id ? editingProduct : product));
        setEditingProduct(null);
        setNewImages([]); // Clear new images
        toast.success('Product updated successfully!');
      } else {
        toast.error('Error updating product!');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Error updating product!');
    }
  };
// Corrected handleImageUpload2 function
const handleImageUpload2 = (file, index) => {
  console.log("st4")
  const selectedFile = file[0]; // Fixed duplicate variable declaration
  if (selectedFile) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newImagesArray = [...newImages];
      newImagesArray[index] = selectedFile; // Store the file object instead of base64 data
      setNewImages(newImagesArray);
    };
    reader.readAsDataURL(selectedFile); // Start reading the file
  }
};

// Corrected removebg function
const removebg = async (imgUrl, name, index) => {
  const formData = new FormData();
  formData.append('size', 'auto');
  formData.append('image_url', imgUrl);

  const response = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: { 'X-Api-Key': 'jENrBFrn79nxpWVovin37YSF' },
    body: formData,
  });

  if (response.ok) {
    const rbgResultData = await response.arrayBuffer();
    console.log("st`1")
    // Convert ArrayBuffer to Blob and File
    const blob = new Blob([rbgResultData], { type: 'image/png' });
    const file = new File([blob], `${name}_${index}.png`, { type: blob.type });
    console.log("st2")
    // Pass the generated file to handleImageUpload2
    handleImageUpload2([file], index);
    console.log("st3")
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
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
                <div className="selected-tags">
                  <input
                    type="text"
                    id="tags"
                    value={product.tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                  {selectedTags.map((tag) => (
                    <span
                      key={tag}
                      className="tag selected"
                      onClick={() => handleTagRemove(tag)}
                    >
                      {tag} &times;
                    </span>
                  ))}
                </div>
                <textarea
                  name="description"
                  value={editingProduct.description}
                  onChange={handleChange}
                  placeholder="Product Description"
                />
                <div className="categories">
                  {Object.keys(availableTags).map((category) => (
                    <span
                      key={category}
                      className="category tag"
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <div className="tag-suggestions">
                  {currentTags.map((tag) => (
                    <span
                      key={tag}
                      className={`tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="image-edit-section">
                  {editingProduct.images.map((image, index) => (
                    <div key={index} className="image-edit-item">
                      <input
                        type="text"
                        value={image}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        placeholder={`Image URL ${index + 1}`}
                      />
                      <img src={image} alt="" style={{ width: '30px', height: '30px',position:'absolute',marginLeft:'60pc' }} />
                      <FaTrashAlt
                        onClick={() => handleRemoveImage(index)}
                        style={{ cursor: 'pointer', marginLeft: '10px' }}
                      />
                      <button onClick={() => removebg(image,editingProduct.name,index+1)}>removebg</button>
                    </div>
                  ))}
                  {editingProduct.images.length > 0 && editingProduct.images[editingProduct.images.length - 1] === '' && (
                    <input
                      type="file"
                      onChange={(e) => handleImageUpload(e, editingProduct.images.length - 1)}
                    />
                  )}
                  {editingProduct.images.length < 5 && (
                    <button onClick={handleAddImage}>Add Another Image</button>
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
