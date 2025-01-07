/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import styles from "../../assets/css/sections/village-management.module.css";

const ViewVillage = ({ village, onClose }) => {
  return (
    <div className={styles.modal2}>
      <div className={styles.modalcontent}>
        <span className={styles.closebtn} onClick={onClose}>
          ×
        </span>
        <h3>Village Details</h3>
        <div>
          <p>
            <strong>Village Name:</strong> {village.name}
          </p>
          <p>
            <strong>Region/District:</strong> {village.Region}
          </p>
          <p>
            <strong>Land Area (sq km):</strong> {village.land}
          </p>
          <p>
            <strong>Latitude:</strong> {village.Latitude}
          </p>
          <p>
            <strong>Longitude:</strong> {village.Longitude}
          </p>
          <p>
            <strong>Tags:</strong> {village.Tags}
          </p>
          <p>
            <strong>Village Image:</strong>
            <br />
            <img
            src={village.image || "https://via.placeholder.com/100"}
            alt={`Image of ${village.name}`}
            className={styles.viewImage}
            />
          
              
            
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewVillage;
