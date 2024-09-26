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

  toast.success("Background Removed Successfully you can save changes")
  const response = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: { 'X-Api-Key': 'jENrBFrn79nxpWVovin37YSF' },
    body: formData,
  });

  if (response.ok) {
    const rbgResultData = await response.arrayBuffer();
    // Convert ArrayBuffer to Blob and File
    const blob = new Blob([rbgResultData], { type: 'image/png' });
    const file = new File([blob], `${name}_${index}.png`, { type: blob.type });
    // Pass the generated file to handleImageUpload2
    handleImageUpload2([file], index);
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
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="product-list flex flex-wrap gap-5 p-5">
        {products.map((product) => (
          <div key={product._id} className="product-item bg-gray-100 border border-gray-300 rounded-lg p-5 w-full">
            {editingProduct && editingProduct._id === product._id ? (
              <div className="product-edit-form">
                <input
                  type="text"
                  name="name"
                  value={editingProduct.name}
                  onChange={handleChange}
                  placeholder="Product Name"
                  className="block w-full my-3 p-3 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="price"
                  value={editingProduct.price}
                  onChange={handleChange}
                  placeholder="Product Price"
                  className="block w-full my-3 p-3 border border-gray-300 rounded-md"
                />
                <div className="selected-tags">
                  <input
                    type="text"
                    id="tags"
                    value={product.tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="block w-full my-3 p-3 border border-gray-300 rounded-md"
                  />
                  {selectedTags.map((tag) => (
                    <span
                      key={tag}
                      className="tag selected bg-blue-500 text-white px-2 py-1 rounded-lg inline-block mr-2 mb-2 cursor-pointer"
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
                  className="block w-full my-3 p-3 border border-gray-300 rounded-md"
                />
                <div className="categories flex gap-2 flex-wrap">
                  {Object.keys(availableTags).map((category) => (
                    <span
                      key={category}
                      className="category tag bg-gray-200 text-gray-700 px-3 py-1 rounded-lg cursor-pointer"
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <div className="tag-suggestions flex flex-wrap gap-2 my-3">
                  {currentTags.map((tag) => (
                    <span
                      key={tag}
                      className={`tag px-3 py-1 rounded-lg cursor-pointer ${
                        selectedTags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                      }`}
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
  
                <div className="image-edit-section flex flex-col gap-4">
                  {editingProduct.images.map((image, index) => (
                    <div key={index} className="image-edit-item flex items-center gap-4">
                      <input
                        type="text"
                        value={image}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        placeholder={`Image URL ${index + 1}`}
                        className="flex-1 border border-gray-300 p-3 rounded-md"
                      />
                      <img src={image} alt="" className="w-8 h-8" />
                      <FaTrashAlt
                        onClick={() => handleRemoveImage(index)}
                        className="cursor-pointer text-red-600"
                      />
                      <button className="bg-red-500 text-white py-1 px-3 rounded" onClick={() => removebg(image, editingProduct.name, index + 1)}>removebg</button>
                    </div>
                  ))}
                  {editingProduct.images.length > 0 && editingProduct.images[editingProduct.images.length - 1] === '' && (
                    <input
                      type="file"
                      onChange={(e) => handleImageUpload(e, editingProduct.images.length - 1)}
                      className="block w-full"
                    />
                  )}
                  {editingProduct.images.length < 5 && (
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleAddImage}>
                      Add Another Image
                    </button>
                  )}
                </div>
  
                <div className="button-group flex gap-4 my-4">
                  <button
                    onClick={handleSaveChanges}
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditingProduct(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="product-details">
                <div className="images-container flex flex-wrap gap-2">
                  {product.images.map((image, index) => (
                    <img key={index} src={image} alt={`${product.name} ${index + 1}`} className="w-24 h-24 border border-gray-300 rounded-md" />
                  ))}
                </div>
                <h2 className="text-2xl font-semibold my-2">{product.name}</h2>
                <p className="text-lg my-1">{product.price}</p>
                <p className="text-gray-600 my-1">{product.description}</p>
                <div className="button-group flex gap-4 mt-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleEditProduct(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
  
}
