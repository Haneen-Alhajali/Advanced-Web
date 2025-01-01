import React, { useEffect, useState } from "react";
import styles from "../assets/css/sections/gallery.module.css";

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageSource, setImageSource] = useState("url");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Load gallery data from localStorage
    const storedGalleryData = JSON.parse(localStorage.getItem("galleryData")) || [];
    setGalleryData(storedGalleryData);

    // Load current user data from localStorage
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
  }, []);

  const renderGallery = () => {
    return galleryData.map((item) => (
      <div key={item.id} className={styles.galleryItem}>
        <img src={item.imageUrl} alt="Gallery" />
        <p>{item.description}</p>
      </div>
    ));
  };

  const handleAddImage = () => {
    if (!currentUser || currentUser.role !== "admin") {
      alert("You are not authorized to perform this action. Only administrators can perform this operation.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setImageUrl("");
    setImageFile(null);
    setDescription("");
  };

  const handleImageOptionChange = (e) => {
    setImageSource(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (imageSource === "url" && !imageUrl) {
      alert("Please provide an image URL.");
      return;
    }

    if (imageSource === "upload" && !imageFile) {
      alert("Please upload an image file.");
      return;
    }

    if (imageSource === "upload") {
      const reader = new FileReader();
      reader.onloadend = () => {
        saveImageData(reader.result, description);
      };
      reader.readAsDataURL(imageFile);
    } else {
      saveImageData(imageUrl, description);
    }
  };

  const saveImageData = (imageSrc, description) => {
    const newImage = {
      id: galleryData.length + 1,
      imageUrl: imageSrc,
      description,
    };

    const updatedGallery = [...galleryData, newImage];
    setGalleryData(updatedGallery);
    localStorage.setItem("galleryData", JSON.stringify(updatedGallery));
    handleModalClose();
  };

  return (
    <div className={styles.gallery}>
      {currentUser && currentUser.role === "admin" ? (
        <button className={styles.galleryAddImageBtn} onClick={handleAddImage}>
          Add New Image
        </button>
      ) : (
        <p className={styles.galleryAuthMessage}>
          Only administrators can add new images.
        </p>
      )}
      <div className={styles.galleryGrid}>{renderGallery()}</div>

      {isModalOpen && (
        <div className={styles.galleryModal}>
          <div className={styles.galleryModalContent}>
            <span className={styles.galleryCloseBtn} onClick={handleModalClose}>
              &times;
            </span>
            <h2>Add New Image</h2>
            <form id="galleryAddImageForm" onSubmit={handleFormSubmit}>
              <label htmlFor="galleryImageOption">Choose Image Source:</label>
              <select
                id="galleryImageOption"
                className={styles.galleryImageOption}
                value={imageSource}
                onChange={handleImageOptionChange}
              >
                <option value="url">Image URL</option>
                <option value="upload">Upload File</option>
              </select>

              {imageSource === "url" && (
                <div>
                  <label htmlFor="imageUrl">Image URL:</label>
                  <input
                    type="url"
                    id="imageUrl"
                    className={styles.gallerymodalInput}
                    value={imageUrl}
                    style={{
                      backgroundColor: "white",
                    }}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Enter image URL"
                    required
                  />
                </div>
              )}

              {imageSource === "upload" && (
                <div>
                  <label htmlFor="imageFile">Upload Image:</label>
                  <input
                    type="file"
                    id="imageFile"
                    className={styles.gallerymodalInput}
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setImageFile(file);
                    }}
                    required
                  />
                </div>
              )}

              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter image description"
                required
              ></textarea>

              <button type="submit" className={styles.gallerySubmitBtn}>
                Add Image
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
