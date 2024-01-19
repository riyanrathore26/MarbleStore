import NavigationBar from "./NavigationBar";
import React, { useState } from 'react';
import '../Components_css/CreateSeller.css';

// Component 1
const ComponentOne = () => {
  return (
    <div className="component1 compons">
      <img
        src="https://via.placeholder.com/150" // Replace with your image URL
        alt="User"
      />
      <form>
        <input
          type="text"
          placeholder="Name"
          // Add state and event handler as needed
        />
        <input
          type="text"
          placeholder="Address"
          // Add state and event handler as needed
        />
        <input
          type="text"
          placeholder="Phone Number"
          // Add state and event handler as needed
        />
        <button type="submit">Submit</button>
        {/* Add submit button if needed */}
      </form>
    </div>
  );
};

// Component 2
// Component 2
const ComponentTwo = () => {
  const [file, setFile] = useState(null);
  const [fileContainers, setFileContainers] = useState([{ id: 1, selectedImage: null }]);

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
    // Additional logic for form submission
  };

  return (
    <div className="compons">
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
    </div>
  );
};

// Component 3
const ComponentThree = () => {
  return (
    <div className="compons">
      <h2>Component 3</h2>
      <p>This is the content of Component 3.</p>
    </div>
  );
};

// Main App Component
const CreateSeller = () => {
  const [activeComponent, setActiveComponent] = useState(1);

  const showComponent = (componentNumber) => {
    setActiveComponent(componentNumber);
  };

  return (
    <>
      <NavigationBar />
      <div className="CreateSellerr">
        <div className="compo">
          <h3 className={`compo_text ${activeComponent === 1 ? 'first' : ''}`} onClick={() => showComponent(1)}>About You</h3>
          <h3 className="compo_text" onClick={() => showComponent(2)}>About Project</h3>
          <h3 className="compo_text" onClick={() => showComponent(3)}>View Profile</h3>
        </div>
        {activeComponent === 1 && <ComponentOne />}
        {activeComponent === 2 && <ComponentTwo />}
        {activeComponent === 3 && <ComponentThree />}
      </div>
    </>
  );
};

export default CreateSeller;