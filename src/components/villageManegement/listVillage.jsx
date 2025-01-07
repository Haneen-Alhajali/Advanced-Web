import React, { useEffect, useState } from "react"; 
import { useQuery, useMutation } from "@apollo/client";
import styles from "../../assets/css/sections/village-management.module.css";
import ViewVillage from "../villageManegement/viewVillage";
import UpdateVillage from "../villageManegement/updateVillage";
import UpdateDemographic from "../villageManegement/updateDemographic";
import { gql } from "@apollo/client";

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // Check if the current user is an admin
  const isAdmin = currentUser && currentUser.role === "admin";

// تعريف استعلام GraphQL لجلب القرى
const GET_VILLAGES = gql`
  query GetVillages {
    villages {
      id
      name
      Region
      land
      Latitude
      Longitude
      Tags
      img
      population
      age
      gender
      growthRate
      Urban
    }
  }
`;

// تعريف استعلام GraphQL لحذف قرية
const DELETE_VILLAGE = gql`
  mutation DeleteVillage($id: ID!) {
    deleteVillage(id: $id) {
      id
    }
  }
`;

const ListVillage = ({ reloadList, searchQuery, sortOption }) => {
  const [villages, setVillages] = useState([]);
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdatModalOpen] = useState(false);
  const [isDemographicModalOpen, setIsDemographicModalOpen] = useState(false);

  // استخدام الاستعلام لجلب البيانات
  const { loading, error, data, refetch } = useQuery(GET_VILLAGES);

  // استخدام الـ Mutation لحذف قرية
  const [deleteVillage] = useMutation(DELETE_VILLAGE);

  // إعادة تحميل القرى عند تغيير reloadList
  useEffect(() => {
    if (reloadList) {
      refetch(); // إعادة تحميل البيانات
    }
  }, [reloadList, refetch]);

  useEffect(() => {
    if (data) {
      setVillages(data.villages);
    }
  }, [data]);

  const filteredVillages = searchQuery
    ? villages.filter((village) =>
        village.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : villages;

  const sortedVillages =
    sortOption === "name"
      ? [...filteredVillages].sort((a, b) => a.name.localeCompare(b.name))
      : filteredVillages;

  const handleDelete = async (villageId) => {
    if (!isAdmin) {
      alert("This action is restricted to admins only.");
      return;
    }

    try {
      await deleteVillage({ variables: { id: villageId } });
      setVillages(villages.filter((v) => v.id !== villageId)); // تحديث الحالة بعد الحذف
      alert(`Village with ID: ${villageId} deleted.`);
    } catch (err) {
      console.error("Error deleting village:", err);
    }
  };

  const viewModal = (village) => {
    setSelectedVillage(village);
    setIsViewModalOpen(true);
  };

  const UpdateModal = (village) => {
    if (!isAdmin) {
      alert("This action is restricted to admins only.");
      return;
    }
    setSelectedVillage(village);
    setIsUpdatModalOpen(true);
  };

  const UpdateDemographicModal = (village) => {
    if (!isAdmin) {
      alert("This action is restricted to admins only.");
      return;
    }
    setSelectedVillage(village);
    setIsDemographicModalOpen(true);
  };

  const closeModal = () => {
    setIsViewModalOpen(false);
    setIsUpdatModalOpen(false);
    setIsDemographicModalOpen(false);
    setSelectedVillage(null);
  };

  return (
    <div className={styles.villageItemContainer}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : sortedVillages.length > 0 ? (
        sortedVillages.map((village) => (
          <div key={village.id} className={styles.villageitem}>
            <span>
              {village.name} {village.Region}
            </span>
            <div className={styles.buttons}>
              <button
                className={styles.view}
                onClick={() => viewModal(village)}
              >
                View
              </button>
              <button
                className={styles.update}
                onClick={() => UpdateModal(village)}
              >
                Update Village
              </button>
              <button
                className={styles.delete}
                onClick={() => handleDelete(village.id)}
              >
                Delete Village
              </button>
              <button
                className={styles.updatedata}
                onClick={() => UpdateDemographicModal(village)}
              >
                Update Demographic Data
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No villages found.</p>
      )}
      {isViewModalOpen && selectedVillage && (
        <ViewVillage village={selectedVillage} onClose={closeModal} />
      )}

      {isUpdateModalOpen && selectedVillage && (
        <UpdateVillage village={selectedVillage} onClose={closeModal} />
      )}

      {isDemographicModalOpen && selectedVillage && (
        <UpdateDemographic village={selectedVillage} onClose={closeModal} />
      )}
    </div>
  );
};

export default ListVillage;
