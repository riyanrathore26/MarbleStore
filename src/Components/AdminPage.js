import React, { useState } from 'react';
import '../Components_css/AdminPage.css'; // Import the CSS file
import NavigationBar from '../Components/NavigationBar'

const AdminPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileContainers, setFileContainers] = useState([{ id: 1, selectedImage: null }]);

  const handleImageChange = (event, containerId) => {
    const file = event.target.files[0];

    // Update the selected image for the specified container
    setFileContainers((prevContainers) =>
      prevContainers.map((container) =>
        container.id === containerId ? { ...container, selectedImage: file } : container
      )
    );
  };

  const handleAddContainer = () => {
    const newContainer = {
      id: fileContainers.length + 1,
      selectedImage: null,
    };

    // Add a new file container
    setFileContainers([...fileContainers, newContainer]);
  };

  return (
    <>
    <NavigationBar/>
    <h1>Add Infomation About Product</h1>
    <div className='Big-container'>
    <div className="container">
      {fileContainers.map((container) => (
        <div key={container.id} className="file-container">
          <input
            type="file"
            accept="image/*"
            onChange={(event) => handleImageChange(event, container.id)}
          />
          {container.selectedImage && (
            <div>
              <h4>Selected Image:</h4>
              <img
                src={URL.createObjectURL(container.selectedImage)}
                alt="Selected"
              />
            </div>
          )}
        </div>
      ))}
      <button onClick={handleAddContainer}> + </button>
    </div>
    <div className='infomation'>
    <label htmlFor="text">Enter Name:</label>
        <input
        type='text'
        name='text'
        placeholder='Enter Name'
        />
        <label htmlFor="Description">Enter Description:</label>
        <input
        type='text'
        name='Description'
        placeholder='Enter Description'
        />
        <label htmlFor="Price">Enter Price:</label>
        <input
        type='number'
        name='Price'
        placeholder='Enter Price'
        />

    </div>
    </div>
    </>
  );
};

export default AdminPage;
