import React, { useState } from 'react';
import '../Components_css/AdminPage.css'; // Import the CSS file
import NavigationBar from '../Components/NavigationBar';

const AdminPage = () => {
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

  const handleSubmit = async () => {
    // Gather data from the input fields
    const formData = new FormData();
    formData.append('name', document.querySelector('[name="text"]').value);
    formData.append('description', document.querySelector('[name="Description"]').value);
    formData.append('price', document.querySelector('[name="Price"]').value);

    // Append the image file(s) to the FormData (assuming fileContainers is an array of File objects)
    fileContainers.forEach((container, index) => {
      if (container.selectedImage) {
        formData.append(`images`, container.selectedImage);
      }
    });

    try {
      // Make a POST request to the /upload endpoint
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Handle successful response
        alert('Product added successfully!');
      } else {
        alert('Error adding product. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }
  };

  const inline = {
    width: '60%',
  };

  return (
    <>
      <NavigationBar />
      <h1>Add Information About Product</h1>
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
        <div className='information' style={inline}>
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
        <button onClick={handleSubmit} className='Submit_btn'> Submit </button>
      </div>
    </>
  );
};

export default AdminPage;
