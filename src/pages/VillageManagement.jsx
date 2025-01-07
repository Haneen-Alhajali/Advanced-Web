import React, { useState } from "react";
import styles from "../assets/css/sections/village-management.module.css";
import ListVillage from "../components/villageManegement/listVillage";
import AddingVillage from "../components/villageManegement/addingVillage";

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // Check if the current user is an admin
  const isAdmin = currentUser && currentUser.role === "admin";
  
const VillageManagement = () => {
  const [reloadList, setReloadList] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const triggerReloadList = () => {
    setReloadList((prev) => !prev);

  };

  const addVillageModel = () => {
    if (!isAdmin) {
      alert("This action is restricted to admins only.");
      return;
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {/* Main Content Area */}
      <div className="village-management">
        <button
          className={styles.addnew}
          onClick={() => {
            console.log("clicked");
            addVillageModel();
          }}
        >
          Add New Village
        </button>
        <div className={styles.villageList}>
          <h3>View Village List</h3>
          <input
            type="text"
            className={styles.searchBox}
            placeholder="Search villages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className={styles.sortPageContainer}>
            <div className={styles.sort}>
              <label htmlFor="sort">Sort by:</label>
              <select
                id="sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>

            <div className={styles.pagination}>
              <span>Page:</span>
              <button className={styles.prev}>Prev</button>
              <button className={styles.next}>Next</button>
            </div>
          </div>

          <ListVillage reloadList={reloadList} searchQuery={searchQuery} sortOption={sortOption} />

          {isModalOpen && (
            <AddingVillage
              onClose={closeModal}
              onVillageAdded={triggerReloadList}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default VillageManagement;
