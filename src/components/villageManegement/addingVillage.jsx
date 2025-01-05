import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styles from "../../assets/css/sections/village-management.module.css";

const ADD_VILLAGE = gql`
  mutation AddVillage(
    $name: String
    $Region: String
    $land: Int
    $Latitude: Float
    $Longitude: Float
    $Tags: String
    $img: String
  ) {
    addVillage(
      name: $name
      Region: $Region
      land: $land
      Latitude: $Latitude
      Longitude: $Longitude
      Tags: $Tags
      img: $img
    ) {
      id
      name
      Region
      land
      Latitude
      Longitude
      Tags
      img
    }
  }
`;

const AddingVillage = ({ onClose, onVillageAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    land: "",
    latitude: "",
    longitude: "",
    tags: "",
    img: "",
  });

  const [addVillage] = useMutation(ADD_VILLAGE);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addVillage({
        variables: {
          name: formData.name,
          Region: formData.region,
          land: parseFloat(formData.land),
          Latitude: parseFloat(formData.latitude),
          Longitude: parseFloat(formData.longitude),
          Tags: formData.tags,
          img: formData.img || "https://via.placeholder.com/100",
        },
      });
      alert("Village added successfully!");
      onVillageAdded();

      onClose();
    } catch (error) {
      console.error("Error adding village:", error);
      alert("Failed to add village.");
    }
  };

  return (
    <div id={styles.addVillageModal} className={styles.modal}>
      <div className={styles.modalcontent}>
        <span className={styles.closebtn} onClick={onClose}>
          ×
        </span>
        <h3>Add New Village</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Village Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="region">Region/District:</label>
          <input
            type="text"
            id="region"
            name="region"
            value={formData.region}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="land">Land Area (sq Km):</label>
          <input
            type="number"
            id="land"
            name="land"
            value={formData.land}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="latitude">Latitude:</label>
          <input
            type="number"
            id="latitude"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="longitude">Longitude:</label>
          <input
            type="number"
            id="longitude"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="village-file">Upload Image:</label>
          <input
            type="file"
            id="village-file"
            name="village-file"
            onChange={handleFileChange}
          />
          <br />
          <label htmlFor="tags">Categories/Tags:</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g., rural, urban"
          />
          <br />
          <button type="submit">Add Village</button>
        </form>
      </div>
    </div>
  );
};

export default AddingVillage;
