import React, { useEffect, useState } from 'react';
import styles from '../assets/css/sections/gallery.module.css';

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imageOption, setImageOption] = useState('url');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState('');

  // Load gallery data from localStorage when the component mounts
  useEffect(() => {
    const savedGalleryData = JSON.parse(localStorage.getItem('galleryData')) || [];
    setGalleryData(savedGalleryData);
  }, []);

  // Render gallery items
  const renderGallery = () => {
    return galleryData.map((item) => (
      <div key={item.id} className={styles.galleryItem}>
        <img src={item.imageUrl} alt="Gallery" />
        <p>{item.description}</p>
      </div>
    ));
  };

  // Handle image addition
  const addImage = () => {
    if (!imageUrl && !imageFile) {
      alert('Please provide an image URL or upload a file.');
      return;
    }

    const newImage = {
      id: galleryData.length + 1,
      imageUrl: imageUrl,
      description: description,
    };

    // If file is uploaded, convert to base64 and update the image URL
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        const newImageWithFile = { ...newImage, imageUrl: base64Image };
        updateGalleryData(newImageWithFile);
      };
      reader.readAsDataURL(imageFile);
    } else {
      updateGalleryData(newImage);
    }
  };

  // Update gallery data and localStorage
  const updateGalleryData = (newImage) => {
    const updatedGalleryData = [...galleryData, newImage];
    setGalleryData(updatedGalleryData);
    localStorage.setItem('galleryData', JSON.stringify(updatedGalleryData));
    setShowModal(false);
    resetForm();
  };

  // Reset the form
  const resetForm = () => {
    setImageUrl('');
    setImageFile(null);
    setDescription('');
  };

  return (
    <div className={styles.galleryContainer}>
      <button onClick={() => setShowModal(true)} className={styles.galleryAddImageBtn}>
        Add New Image
      </button>
      <div className={styles.galleryGrid}>
        {renderGallery()}
      </div>

      {showModal && (
        <div className={styles.galleryModal}>
          <div className={styles.modalContent}>
            <span
              className={styles.closeBtn}
              onClick={() => setShowModal(false)}
            >
              &times;
            </span>
            <h2>Add New Image</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addImage();
              }}
            >
              <label htmlFor="gallery-imageOption">Choose Image Source:</label>
              <select
                id="gallery-imageOption"
                value={imageOption}
                onChange={(e) => setImageOption(e.target.value)}
              >
                <option value="url">Image URL</option>
                <option value="upload">Upload File</option>
              </select>

              {/* URL Input */}
              {imageOption === 'url' && (
                <div>
                  <label htmlFor="gallery-imageUrl">Image URL:</label>
                  <input
                    type="url"
                    id="gallery-imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Enter image URL"
                    required
                  />
                </div>
              )}

              {/* Upload File Input */}
              {imageOption === 'upload' && (
                <div>
                  <label htmlFor="gallery-imageFile">Upload Image:</label>
                  <input
                    type="file"
                    id="gallery-imageFile"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    accept="image/*"
                  />
                </div>
              )}

              <label htmlFor="gallery-description">Description:</label>
              <textarea
                id="gallery-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter image description"
                required
              ></textarea>

              <button type="submit" className={styles.submitBtn}>
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
