import React, { useState } from 'react';
import styles from "../../assets/css/sections/village-management.module.css";

const AddingVillage = ({ onClose ,onVillageAdded}) => {
  // استرجاع القرى المخزنة في Local Storage
  const storedVillages = JSON.parse(localStorage.getItem("dataVillage")) || [];
  
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    land: "",
    latitude: "",
    longitude: "",
    tags: "",
    img: "",
  });

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

  const saveAddedDataToLocal = (e) => {
    e.preventDefault();

    // إنشاء القرية الجديدة
    const newVillage = {
      id: storedVillages.length + 1,
      name: formData.name,
      Region: formData.region,
      land: parseFloat(formData.land),
      Latitude: parseFloat(formData.latitude),
      Longitude: parseFloat(formData.longitude),
      Tags: formData.tags,
      img: formData.img || "https://via.placeholder.com/100",
      population: "N/A", // يمكن تحديث هذه القيم لاحقًا
      age: [],
      gender: [],
      growthRate: 0,
      Urban: true, // افتراضيًا يمكن تغييره
    };

    // تحديث Local Storage
    const updatedVillages = [...storedVillages, newVillage];
    localStorage.setItem("dataVillage", JSON.stringify(updatedVillages));

    // إعادة ضبط النموذج
    setFormData({
      name: "",
      region: "",
      land: "",
      latitude: "",
      longitude: "",
      tags: "",
      img: "",
    });

    alert("Village added successfully!");
    onVillageAdded();
    onClose();
  };

  return (
    <div id={styles.addVillageModal} className={styles.modal}>
      <div className={styles.modalcontent}>
        <span className={styles.closebtn} onClick={onClose}>
          ×
        </span>
        <h3>Add New Village</h3>
        <form onSubmit={saveAddedDataToLocal}>
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
