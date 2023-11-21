import React, { useState } from 'react';
import '../Components_css/AdminPage.css';
import NavigationBar from '../Components/NavigationBar';

const AdminPage = () => {
  const [file, setFile] = useState(null);
  const [fileContainers, setFileContainers] = useState([{ id: 1, selectedImage: null }]);


  const handleImageChange = (event, containerId) => {
    setFile(event.target.files[0]);
    const file = event.target.files[0];
    setFileContainers((prevContainers) =>
      prevContainers.map((container) =>
        container.id === containerId ? { ...container, selectedImage: file } : container
      )
    );
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', document.querySelector('[name="text"]').value);
    formData.append('description', document.querySelector('[name="Description"]').value);
    formData.append('price', document.querySelector('[name="Price"]').value);

    fileContainers.forEach((container) => {
      if (container.selectedImage) {
        formData.append('images', container.selectedImage);
      }
    });

    if (!file) {
      console.error('No file selected for upload.');
      return;
    }

    const formData2 = new FormData();
    // formData2.append('image', file);
    fileContainers.forEach(container => {
      formData2.append('image', container.selectedImage);
    });
  

    try {
      // First API call
      const response1 = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response1.ok) {
        return;
      }

      // Second API call
      const response2 = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData2,
      });

      if (response2.ok) {
        console.log(formData);
        alert('Product added successfully!');
      } else {
        alert('Error adding product. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleAddContainer = () => {
    const newContainer = {
      id: fileContainers.length + 1,
      selectedImage: null,
    };

    setFileContainers([...fileContainers, newContainer]);
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
          <button className='submit' onClick={handleAddContainer}> + </button>
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
        <button className='submit' onClick={handleSubmit}> Submit </button>
      </div>

    </>
  );
};

export default AdminPage;
