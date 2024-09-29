import React, { useState, useEffect, useRef } from 'react';
import { BASE_URL } from '../config';
import axios from 'axios';
import profile from '../../images/userImg.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem('email');
  const fileInputRef = useRef(null);
  const [profilePicFile, setProfilePicFile] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/profile/${email}`);
        setProfileData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [email]);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      setProfileData((prevData) => ({
        ...prevData,
        profilePic: URL.createObjectURL(file), // Temporary preview of the image
      }));
    }
  };

  const handleSave = async () => {
    try {
      const id = profileData._id;
      const formData = new FormData();
      formData.append('username', profileData.username);
      formData.append('email', profileData.email);
      formData.append('phonenumber', profileData.phonenumber);
      formData.append('gender', profileData.gender);

      if (profilePicFile) {
        formData.append('profilepic', profilePicFile);
      }

      const response = await axios.put(`${BASE_URL}/api/profile/edit/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        toast.success('profile updated successfully!', {
          position: 'top-right',
          autoClose: 3000,
      });
      } else {
        toast.error('Error while updating profile. Please try again later.', {
          position: 'top-center',
          autoClose: 3000,
      });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>

      {/* Profile Picture */}
      <div className="mb-6 text-center">
        <label htmlFor="profilePic" className="block text-sm font-medium text-gray-700">
          <img
            src={profilePicFile||profileData.profilepic || profile}
            alt="Profile"
            className="h-24 w-24 rounded-full object-cover border-2 border-gray-300 cursor-pointer"
            onClick={handleImageClick}
          />
        </label>
        <input
          type="file"
          name="profilePic"
          accept="image/*"
          onChange={handleProfilePicChange}
          ref={fileInputRef}
          className="hidden"
        />
      </div>

      {/* Name */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          name="username"
          value={profileData.username || ''}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          readOnly
          value={profileData.email || ''}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Mobile Number */}
      <div className="mb-4">
        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
          Mobile Number
        </label>
        <input
          type="tel"
          name="phonenumber"
          readOnly
          value={profileData.phonenumber || ''}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Gender */}
      <div className="mb-4">
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
          Gender
        </label>
        <select
          name="gender"
          value={profileData.gender || ''}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Save Profile
      </button>
    </div>
  );
}

export default Profile;
