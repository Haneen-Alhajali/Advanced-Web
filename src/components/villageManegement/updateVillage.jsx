import React, { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import styles from "../../assets/css/sections/village-management.module.css";

const UPDATE_VILLAGE = gql`
  mutation UpdateVillage($id: ID!, $name: String, $Region: String, $land: Int, $Latitude: Float, $Longitude: Float, $img: String) {
    updateVillage(id: $id, name: $name, Region: $Region, land: $land, Latitude: $Latitude, Longitude: $Longitude, img: $img) {
      id
      name
      Region
      land
      Latitude
      Longitude
      img
    }
  }
`;

const UpdateVillage = ({ village, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    Region: "",
    land: "",
    Latitude: "",
    Longitude: "",
    img: "",
  });

  const [updateVillage] = useMutation(UPDATE_VILLAGE);

  // تحميل البيانات القديمة عند فتح المكون
  useEffect(() => {
    if (village) {
      setFormData({
        name: village.name,
        Region: village.Region,
        land: village.land,
        Latitude: village.Latitude,
        Longitude: village.Longitude,
        img: village.img,
      });
    }
  }, [village]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, img: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateVillage({
        variables: {
          id: village.id,
          name: formData.name,
          Region: formData.Region,
          land: parseInt(formData.land),
          Latitude: parseFloat(formData.Latitude),
          Longitude: parseFloat(formData.Longitude),
          img: formData.img,
        },
      });
      onClose(); 

    } catch (error) {
      console.error("Error updating village:", error);
    }
  };

  return (
    <div id="update-village-modal" className={styles.modalUpdate}>
      <div className={styles.modalcontent}>
        <span className={styles.closebtn} onClick={onClose}>
          ×
        </span>
        <h3>Update Village</h3>
        <form id="update-village-form" onSubmit={handleUpdate}>
          <label htmlFor="update-village-name">Village Name:</label>
          <input
            type="text"
            className="update-village-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="update-region-district">Region/District:</label>
          <input
            type="text"
            className="update-region-district"
            name="Region"
            value={formData.Region}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="update-land-area">Land Area (sq Km):</label>
          <input
            type="number"
            className="update-land-area"
            name="land"
            value={formData.land}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="update-latitude">Latitude:</label>
          <input
            type="number"
            className="update-latitude"
            name="Latitude"
            value={formData.Latitude}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="update-longitude">Longitude:</label>
          <input
            type="number"
            className="update-longitude"
            name="Longitude"
            value={formData.Longitude}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="update-image">Upload Image:</label>
          <input type="file" className="update-image" name="image" onChange={handleFileChange} />
          <br />
          <button type="submit" className="update-village-button-submit">
            Update Village
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateVillage;
