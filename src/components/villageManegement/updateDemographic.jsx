import React, { useState, useEffect } from "react";
import styles from "../../assets/css/sections/village-management.module.css";

const UpdateDemographic = ({ village, onClose,onUpdate }) => {
  const [formData, setFormData] = useState({
    population: "",
    age: "",
    gender: "",
    growthRate: "",
  });

  // تحميل البيانات القديمة عند فتح النموذج
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

  // حفظ البيانات الجديدة في LocalStorage
  const demographicUpdate = (e) => {
    e.preventDefault();
    const dataVillages = JSON.parse(localStorage.getItem("dataVillage")) || [];
    const updatedVillages = dataVillages.map((v) =>
      v.id === village.id ? { ...v, ...formData } : v
    );

    localStorage.setItem("dataVillage", JSON.stringify(updatedVillages));
    alert("Village data updated successfully!");
    if (onClose) onClose();
    onUpdate();
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
            type="text"
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
            type="text"
            className="update-Growth-Population"
            name="growthRate"
            value={formData.growthRate}
            onChange={handleInputChange}
            required
          />
          <br />
          <button type="submit">Update Demographic Data</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateDemographic;
