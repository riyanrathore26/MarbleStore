import React, { Component } from 'react';
import NavigationBar from "./NavigationBar";
import '../Components_css/CreateSeller.css';


class CreateSeller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeComponent: 1,
      formData: {
        name: '',
        address: '',
        phoneNumber: '',
        images: [],
        projectInfo: {
          name: '',
          description: '',
          price: '',
        },
      },
    };
  }

  showComponent = (componentNumber, dataG) => {
    console.log("OYE", dataG);
    this.setState({ activeComponent: componentNumber, formData: { ...this.state.formData, ...dataG } });
  };

  render() {
    const { activeComponent, formData } = this.state;

    return (
      <>
        <NavigationBar />
        <div className="CreateSellerr">
          <div className="compo">
            <h3 className={`compo_text ${activeComponent === 1 ? 'first' : ''}`} onClick={() => this.showComponent(1)}>About You</h3>
            <h3 className="compo_text" onClick={() => this.showComponent(2)}>About Project</h3>
            <h3 className="compo_text" onClick={() => this.showComponent(3)}>View Profile</h3>
          </div>
          {activeComponent === 1 && <ComponentOne showComponent={this.showComponent} />}
          {activeComponent === 2 && <ComponentTwo showComponent={this.showComponent} formData={formData} />}
          {activeComponent === 3 && <ComponentThree formData={formData} />}
        </div>
      </>
    );
  }
}

class ComponentOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      phoneNumber: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, address, phoneNumber } = this.state;
    const formData = {
      name,
      address,
      phoneNumber,
    };
    console.log("tt", formData);
    this.props.showComponent(2, formData);
  };

  render() {
    const { name, address, phoneNumber } = this.state;

    return (
      <div className="component1 compons Big-container">
        <img
          src="https://via.placeholder.com/150" // Replace with your image URL
          alt="User"
        />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={address}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={this.handleInputChange}
          />
          <button type="submit">Next</button>
        </form>
      </div>
    );
  }
}

class ComponentTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileContainers: [{ id: 1, selectedImage: null }],
      projectInfo: {
        name: '',
        description: '',
        price: '',
      },
    };
  }

  handleAddContainer = () => {
    const newContainer = {
      id: this.state.fileContainers.length + 1,
      selectedImage: null,
    };

    this.setState((prevState) => ({
      fileContainers: [...prevState.fileContainers, newContainer],
    }));
  };

  inline = {
    width: '60%',
  };

  handleImageChange = (event, containerId) => {
    const file = event.target.files[0];
    this.setState((prevState) => ({
      file,
      fileContainers: prevState.fileContainers.map((container) =>
        container.id === containerId ? { ...container, selectedImage: file } : container
      ),
    }));
  };

  handleNavigation = (direction) => {
    const { showComponent } = this.props;
    const { fileContainers, projectInfo } = this.state;

    if (direction === 'previous') {
      showComponent(1, { projectInfo });
    } else if (direction === 'next') {
      const images = fileContainers.map(container => URL.createObjectURL(container.selectedImage));
      showComponent(3, { images, projectInfo });
    }
  };

  render() {
    const { fileContainers, projectInfo } = this.state;

    return (
      <div className="compons">
        <div className='Big-container'>
          <div className="container">
            {fileContainers.map((container) => (
              <div key={container.id} className="file-container">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => this.handleImageChange(event, container.id)}
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
            <button className='submit' onClick={this.handleAddContainer}> + </button>
          </div>
          <div className='information' style={this.inline}>
            <label htmlFor="text">Enter Name:</label>
            <input
              type='text'
              name='text'
              placeholder='Enter Name'
              onChange={(e) => this.setState({ projectInfo: { ...projectInfo, name: e.target.value } })}
            />
            <label htmlFor="Description">Enter Description:</label>
            <input
              type='text'
              name='Description'
              placeholder='Enter Description'
              onChange={(e) => this.setState({ projectInfo: { ...projectInfo, description: e.target.value } })}
            />
            <label htmlFor="Price">Enter Price:</label>
            <input
              type='number'
              name='Price'
              placeholder='Enter Price'
              onChange={(e) => this.setState({ projectInfo: { ...projectInfo, price: e.target.value } })}
            />
          </div>
          <div className="compo2">
            <button className='Compo2_btn' onClick={() => this.handleNavigation('previous')}> Back</button>
            <button className='Compo2_btn' onClick={() => this.handleNavigation('next')}> Next </button>
          </div>
        </div>
      </div>
    );
  }
}

class ComponentThree extends React.Component {
  componentDidMount() {
    console.log("ComponentThree - componentDidMount");
    console.log("this.props.formData:", this.props.formData);
  }
  AddSeller = async () => {
    alert("HI");
    try {
      const response = await fetch('https://marblestore-gdqv.onrender.com/AddSeller', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.props.formData),
      });
  
      if (!response.ok) {
        // Handle error if the response status is not OK
        console.error('AddSeller request failed:', response.statusText);
        alert('An error occurred. Please try again.');
        return;
      }
  
      // Handle success response, e.g., show a success message
      const responseData = await response.json();
      console.log('AddSeller response:', responseData);
      alert('Seller added successfully!');
    } catch (error) {
      // Handle network or other errors
      console.error('AddSeller error:', error);
      alert('An error occurred. Please try again.');
    }
  };
  
  render() {
    const { formData } = this.props;

    if (!formData) {
      return <div>formData</div>;
    }

    return (
      <div className="compons">
        <h2>View Profile</h2>
        <p>Name: {formData.name}</p>
        <p>Address: {formData.address}</p>
        <p>Phone Number: {formData.phoneNumber}</p>
        <p>Project Name: {formData.projectInfo && formData.projectInfo.name}</p>
        <p>Project Description: {formData.projectInfo && formData.projectInfo.description}</p>
        <p>Project Price: {formData.projectInfo && formData.projectInfo.price}</p>
        <button type='submit' onClick={() => this.AddSeller()}>submit</button>
      </div>
    );
  }
}

export default CreateSeller;
