import React, { useEffect, useState } from "react";
import styles from "../../assets/css/sections/village-management.module.css";
import ViewVillage from "../villageManegement/viewVillage";
import UpdateVillage from "../villageManegement/updateVillage";
import UpdateDemographic from "../villageManegement/updateDemographic";

const ListVillage = ({ reloadList, searchQuery,sortOption }) => {
  const [villages, setVillages] = useState([]);
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdatModalOpen] = useState(false);
  const [isDemographicModalOpen, setIsDemographicModalOpen] = useState(false);
  const [updateVillageModal, setUpdateVillageModal] = useState(false);
  const [updateDemographicModal, setUpdateDemographicModal] = useState(false);
  let flagOfsearchQuery = false;

  const filteredVillages = searchQuery
    ? villages.filter((village) =>
        village.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : villages;

    const sortedVillages =
    sortOption === "name"
      ? [...filteredVillages].sort((a, b) =>
          a.name.localeCompare(b.name)
        )
      : filteredVillages;

  const trggerUpdateVillage = () => {
    setUpdateVillageModal((prev) => !prev);
  };

  const trggerUpdateDemographic = () => {
    setUpdateDemographicModal((prev) => !prev);
  };

  const fetchVillages = () => {
    const storedVillages =
      JSON.parse(localStorage.getItem("dataVillage")) || [];
    setVillages(storedVillages);
  };

  useEffect(() => {
    fetchVillages();
  }, [
    reloadList,
    updateVillageModal,
    updateDemographicModal,
    flagOfsearchQuery,
  ]);

  const viewModal = (village) => {
    setSelectedVillage(village);
    setIsViewModalOpen(true);
  };

  const UpdateModal = (village) => {
    setSelectedVillage(village);
    setIsUpdatModalOpen(true);
  };

  const UpdateDemographicModal = (village) => {
    setSelectedVillage(village);
    setIsDemographicModalOpen(true);
  };
  const closeModal = () => {
    setIsViewModalOpen(false);
    setIsUpdatModalOpen(false);
    setIsDemographicModalOpen(false);
    setSelectedVillage(null);
  };
  if (searchQuery !== "") {
    flagOfsearchQuery = true;
  } else {
    flagOfsearchQuery = false;
  }
  return (
    <div className={styles.villageItemContainer}>
      {sortedVillages.length > 0 ? (
        sortedVillages.map((village) => (
          <div key={village.id} className={styles.villageitem}>
            <span>
              {village.name}
              {village.Region}
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
                onClick={() => {
                  const updatedVillages = villages.filter(
                    (v) => v.id !== village.id
                  );
                  setVillages(updatedVillages);
                  localStorage.setItem(
                    "dataVillage",
                    JSON.stringify(updatedVillages)
                  );
                  alert(`Village with ID: ${village.id} deleted.`);
                }}
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
        <UpdateVillage
          village={selectedVillage}
          onClose={closeModal}
          onUpdate={trggerUpdateVillage}
        />
      )}

      {isDemographicModalOpen && selectedVillage && (
        <UpdateDemographic
          village={selectedVillage}
          onClose={closeModal}
          onUpdate={trggerUpdateDemographic}
        />
      )}
    </div>
  );
};

export default ListVillage;
