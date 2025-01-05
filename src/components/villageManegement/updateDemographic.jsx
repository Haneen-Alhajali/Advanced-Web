import React, { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import styles from "../../assets/css/sections/village-management.module.css";

// تعريف Mutation لتحديث البيانات
const UPDATE_VILLAGE_DEMOGRAPHIC = gql`
  mutation UpdateVillage(
    $id: ID!
    $population: Int
    $age: String
    $gender: String
    $growthRate: Float
  ) {
    updateVillage(
      id: $id
      population: $population
      age: $age
      gender: $gender
      growthRate: $growthRate
    ) {
      id
      population
      age
      gender
      growthRate
    }
  }
`;

const UpdateDemographic = ({ village, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    population: "",
    age: "",
    gender: "",
    growthRate: "",
  });

  // استخدام Apollo Mutation
  const [updateVillage, { loading, error }] = useMutation(UPDATE_VILLAGE_DEMOGRAPHIC);

  useEffect(() => {
    if (village) {
      setFormData({
        population: village.population || "",
        age: village.age || "",
        gender: village.gender || "",
        growthRate: village.growthRate || "",
      });
    }
  }, [village]);

  // تحديث الحقول عند إدخال المستخدم
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // إرسال البيانات إلى الـ Backend عبر GraphQL
  const demographicUpdate = async (e) => {
    e.preventDefault();

    try {
      const { data } = await updateVillage({
        variables: {
          id: village.id,
          population: parseInt(formData.population),
          age: formData.age,
          gender: formData.gender,
          growthRate: parseFloat(formData.growthRate),
        },
      });

      alert("Village data updated successfully!");
      if (onClose) onClose();
    } catch (err) {
      console.error("Error updating village:", err);
      alert("Failed to update village data.");
    }
  };

  return (
    <div id="update_Demographic-village-modal" className={styles.modalUpdateDemographic}>
      <div className={styles.modalcontent}>
        <span className={styles.closebtn} onClick={onClose}>
          ×
        </span>
        <h3>Update Demographic Data</h3>
        <form id="update-Demographic-form" onSubmit={demographicUpdate}>
          <label htmlFor="Population-Size">Population Size:</label>
          <input
            type="number"
            className="update-village-Population"
            name="population"
            value={formData.population}
            onChange={handleInputChange}
            required
          />
          <br />
          <label htmlFor="update-Age">Age Distribution:</label>
          <input
            type="text"
            className="update-Age"
            name="age"
            placeholder="e.g., 0-14: 30%, 15-64: 60%, 65+: 10%"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
          <br />
          <label htmlFor="update-Gender">Gender Ratios:</label>
          <input
            type="text"
            className="update-Gender"
            name="gender"
            placeholder="e.g., Male: 51%, Female: 49%"
            value={formData.gender}
            onChange={handleInputChange}
            required
          />
          <br />
          <label htmlFor="update-Population">Population Growth Rate:</label>
          <input
            type="number"
            className="update-Growth-Population"
            name="growthRate"
            step="0.01"
            value={formData.growthRate}
            onChange={handleInputChange}
            required
          />
          <br />
          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Demographic Data"}
          </button>
          {error && <p className={styles.error}>Error: {error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default UpdateDemographic;
