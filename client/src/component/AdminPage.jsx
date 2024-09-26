// AdminPage.js
import React, { useState } from 'react';
import { BASE_URL } from '../config';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApageProduct from './ApageProduct';
import availableTags from './availableTags';

const AdminPage = () => {
    const [fileContainers, setFileContainers] = useState([{ id: 1, selectedImage: null, previewUrl: null }]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [currentTags, setCurrentTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    const handleImageChange = (event, containerId) => {
        const file = event.target.files[0];
        const previewUrl = URL.createObjectURL(file);
        setFileContainers((prevContainers) =>
            prevContainers.map((container) =>
                container.id === containerId ? { ...container, selectedImage: file, previewUrl } : container
            )
        );
    };

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

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('tags', tags.split(',').map(tag => tag.trim()));

        fileContainers.forEach((container) => {
            if (container.selectedImage) {
                formData.append('images', container.selectedImage);
            }
        });

        try {
            const response = await axios.post(`${BASE_URL}/api/addProduct`, formData);

            if (response.status === 200) {
                toast.success('Product added successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                });
                // Clear form fields
                setName('');
                setPrice('');
                setDescription('');
                setTags('');
                setSelectedTags([]);
                setFileContainers([{ id: 1, selectedImage: null, previewUrl: null }]);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error adding product. Please try again later.', {
                position: 'top-center',
                autoClose: 3000,
            });
        }
    };

    const handleAddContainer = () => {
        const newContainer = {
            id: fileContainers.length + 1,
            selectedImage: null,
            previewUrl: null,
        };
        setFileContainers([...fileContainers, newContainer]);
    };

    const handleRemoveImage = (containerId) => {
        setFileContainers((prevContainers) =>
            prevContainers.map((container) =>
                container.id === containerId ? { ...container, selectedImage: null, previewUrl: null } : container
            )
        );
    };

    return (
        <div className="father m-4">
          <div className="admin-container p-4 rounded-lg shadow-lg w-full flex flex-col items-center border border-black">
            <h1 className="text-center text-gray-800 text-2xl font-bold mb-4">Add Information About Product</h1>
            <div>
              <div className="Admin_div flex flex-wrap gap-4">
                {fileContainers.map((container) => (
                  <div key={container.id} className="file-input-container flex items-center my-4">
                    {!container.previewUrl && (
                      <div>
                        <input
                          type="file"
                          id={`file-input-${container.id}`}
                          accept="image/*"
                          onChange={(event) => handleImageChange(event, container.id)}
                          className="hidden"
                        />
                        <label
                          htmlFor={`file-input-${container.id}`}
                          className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-md cursor-pointer hover:bg-indigo-700"
                        >
                          <i className="fas fa-upload">Choose Image</i>
                        </label>
                      </div>
                    )}
                    {container.previewUrl && (
                      <div className="selected_img relative inline-block">
                        <img
                          src={container.previewUrl}
                          alt="Selected"
                          className="w-24 h-24 rounded-lg my-2"
                        />
                        <i
                          className="fas fa-close absolute top-2 right-2 border border-black bg-white rounded-full p-1 cursor-pointer"
                          onClick={() => handleRemoveImage(container.id)}
                        >
                          X
                        </i>
                      </div>
                    )}
                  </div>
                ))}
                <button
                  className="add-image-button flex items-center px-4 py-2 bg-green-500 text-white rounded-md cursor-pointer hover:bg-green-700"
                  onClick={handleAddContainer}
                >
                  <i className="fas fa-plus">Add Image</i>
                </button>
              </div>
              <div className="w-full">
                <label htmlFor="name" className="block text-gray-700 mt-4">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full p-2 border border-gray-300 rounded-md mt-2"
                />
                <label htmlFor="price" className="block text-gray-700 mt-4">Price:</label>
                <input
                  type="text"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="block w-full p-2 border border-gray-300 rounded-md mt-2"
                />
                <label htmlFor="description" className="block text-gray-700 mt-4">Description:</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full p-2 border border-gray-300 rounded-md mt-2 h-24 resize-none"
                />
                <label htmlFor="tags" className="block text-gray-700 mt-4">Tags:</label>
                <input
                  type="text"
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="block w-full p-2 border border-gray-300 rounded-md mt-2"
                />
                <div className="selected-tags mt-2 flex flex-wrap gap-2">
                  {selectedTags.map((tag) => (
                    <span
                      key={tag}
                      className="tag selected bg-green-200 border border-green-400 rounded-lg px-2 py-1 cursor-pointer"
                      onClick={() => handleTagRemove(tag)}
                    >
                      {tag} &times;
                    </span>
                  ))}
                </div>
                <div className="categories flex flex-wrap gap-2 border border-gray-300 rounded-md mt-4 p-2">
                  {Object.keys(availableTags).map((category) => (
                    <span
                      key={category}
                      className="category tag bg-gray-200 border border-gray-400 rounded-md px-3 py-1 cursor-pointer"
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <div className="tag-suggestions flex flex-wrap gap-2 border border-gray-300 rounded-md mt-4 p-2">
                  {currentTags.map((tag) => (
                    <span
                      key={tag}
                      className={`tag px-3 py-1 rounded-md cursor-pointer ${
                        selectedTags.includes(tag) ? 'bg-blue-200 border border-blue-400' : 'bg-gray-200 border border-gray-400'
                      }`}
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  className="submit-button w-full px-4 py-2 bg-green-500 text-white rounded-md cursor-pointer mt-6 hover:bg-green-700"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
            <ToastContainer />
          </div>
          <ApageProduct />
        </div>
      );      
};

export default AdminPage;
