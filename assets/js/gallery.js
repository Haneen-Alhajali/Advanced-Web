// Reference the gallery grid container
const galleryGrid = document.getElementById("galleryGrid");

// Function to render gallery items
function renderGallery() {
  galleryGrid.innerHTML = ""; // Clear existing content

  galleryData.forEach(item => {
    const galleryItem = document.createElement("div");
    galleryItem.classList.add("gallery-item");

    galleryItem.innerHTML = `
      <img src="${item.imageUrl}" alt="Gallery Image">
      <p>${item.description}</p>
    `;

    galleryGrid.appendChild(galleryItem);
  });
}

// Initial render
renderGallery();

const addImageBtn = document.querySelector(".add-image-btn");

addImageBtn.addEventListener("click", () => {
  const newImage = {
    id: galleryData.length + 1,
    imageUrl: "https://via.placeholder.com/150",
    description: `New village image ${galleryData.length + 1}`,
  };

  galleryData.push(newImage); // Add new image to the data array
  renderGallery(); // Re-render the gallery
});
