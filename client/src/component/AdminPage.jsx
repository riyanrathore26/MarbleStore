import React, { useState } from 'react';
import { BASE_URL } from '../config';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../ComponentsCss/AdminPage.css'

const AdminPage = () => {
    const [fileContainers, setFileContainers] = useState([{ id: 1, selectedImage: null }]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const token = localStorage.getItem('token');

    const handleImageChange = (event, containerId) => {
        const file = event.target.files[0];
        setFileContainers((prevContainers) =>
            prevContainers.map((container) =>
                container.id === containerId ? { ...container, selectedImage: file } : container
            )
        );
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);

        fileContainers.forEach((container) => {
            if (container.selectedImage) {
                formData.append('images', container.selectedImage);
            }
        });

        try {
            const response = await axios.post(`${BASE_URL}/api/addProduct`, formData, {
                // headers: {
                //   Authorization: token ? `Bearer ${token}` : '' // Include 'Bearer' prefix if required
                // }
            });

            if (response.status === 201) {
                toast.success('Product added successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                });
                // Clear form fields
                setName('');
                setPrice('');
                setDescription('');
                setFileContainers([{ id: 1, selectedImage: null }]);
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
        };
        setFileContainers([...fileContainers, newContainer]);
    };

    return (
        <div className="admin-container">
            <h1>Add Information About Product</h1>
            <div>
                <div>
                    {fileContainers.map((container) => (
                        <div key={container.id} className="file-input-container">
                            <input
                                type="file"
                                id={`file-input-${container.id}`}
                                accept="image/*"
                                onChange={(event) => handleImageChange(event, container.id)}
                            />
                            <label htmlFor={`file-input-${container.id}`}>
                                <i className="fas fa-upload"></i> Choose Image
                            </label>
                        </div>
                    ))}
                    <button className="add-image-button" onClick={handleAddContainer}>
                        <i className="fas fa-plus"></i> Add Image
                    </button>
                </div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="price">Price:</label>
                    <input
                        type="text"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button className="submit-button" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AdminPage;
