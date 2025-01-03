import React, { useState, useEffect } from 'react';
import styles from "../../assets/css/sections/village-management.module.css";

const UpdateVillage = ({ village, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    Region: "",
    land: "",
    Latitude: "",
    Longitude: "",
    img: "",
  });

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

  const villages=JSON.parse(localStorage.getItem('dataVillage')) || []

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedVillages = villages.map((villageHandel) => {
      if (villageHandel.id === village.id) {
        return { ...villageHandel, ...formData };
      }
      return villageHandel;
    });
    
    localStorage.setItem('dataVillage', JSON.stringify(updatedVillages));
    onUpdate(); 
    onClose();
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
