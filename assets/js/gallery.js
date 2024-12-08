import { galleryData } from './data/galleryData.js';
console.log("Initial gallery from localStorage:", galleryData);

export function renderGallery() {
  const galleryGrid = document.getElementById("galleryGrid");
  galleryGrid.innerHTML = ""; // Clear existing content

  galleryData.forEach(item => {
    const galleryItem = document.createElement("div");
    galleryItem.classList.add("gallery-item");

    galleryItem.innerHTML = `<img src="${item.imageUrl}" alt="Gallery Image"><p>${item.description}</p>`;
    galleryGrid.appendChild(galleryItem);
  });
}

// Attach to the global window object
window.renderGallery = renderGallery;

// Initial render
renderGallery();

// Add new image functionality
const addImageBtn = document.querySelector(".add-image-btn");
const addImageModal = document.getElementById("addImageModal");
const closeBtn = document.querySelector(".close-btn");
const addImageForm = document.getElementById("addImageForm");
const imageOption = document.getElementById("imageOption");
const urlInput = document.getElementById("urlInput");
const uploadInput = document.getElementById("uploadInput");
const imageUrl = document.getElementById("imageUrl");
const imageFile = document.getElementById("imageFile");

addImageBtn.addEventListener("click", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser || currentUser.role !== "admin") {
      alert("You are not authorized to perform this action. Only administrators can perform this operation.");
      return;
  }
  addImageModal.style.display = "block"; // Show the modal
});

closeBtn.addEventListener("click", () => {
  addImageModal.style.display = "none"; // Close the modal
});

// Toggle input fields based on the selected image source
imageOption.addEventListener("change", () => {
  if (imageOption.value === "url") {
    urlInput.style.display = "block";
    uploadInput.style.display = "none";
    imageUrl.required = true; // Make URL field required
    imageFile.required = false; // Make file field not required
  } else {
    urlInput.style.display = "none";
    uploadInput.style.display = "block";
    imageUrl.required = false; // Make URL field not required
    imageFile.required = true; // Make file field required
  }
});

// Handle form submission
addImageForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form from submitting normally

  let imageUrlValue = "";
  let imageFileValue = null;
  const description = document.getElementById("description").value;

  // If image URL is selected
  if (imageOption.value === "url") {
    imageUrlValue = imageUrl.value;

  }
  
  // If upload file is selected
  if (imageOption.value === "upload") {
    imageFileValue = imageFile.files[0];
    if (!imageFileValue) {
      alert("Please upload a file.");
      return;
    }

    // Use FileReader to convert file to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      imageUrlValue = reader.result; // Get base64 image URL
      saveImageData(imageUrlValue, description); // Call save function
    };
    reader.readAsDataURL(imageFileValue);
    return; // Prevent form submission until the image is loaded
  }

  // Add new image to gallery data and save to localStorage
  saveImageData(imageUrlValue, description);
});

// Save image data to gallery and localStorage
function saveImageData(imageUrl, description) {
  const newImage = {
    id: galleryData.length + 1,
    imageUrl: imageUrl,
    description: description,
  };

  galleryData.push(newImage); // Add to gallery data
  localStorage.setItem("galleryData", JSON.stringify(galleryData)); // Save to localStorage
  renderGallery(); // Re-render the gallery
  addImageModal.style.display = "none"; // Close the modal
}



// Remove the last image from the gallery data in localStorage
function removeLastImage() {
  // Get the gallery data from localStorage
  let galleryData = JSON.parse(localStorage.getItem("galleryData"));

  // Check if galleryData exists and has at least one item
  if (galleryData && galleryData.length > 0) {
    // Remove the last item from the array
    galleryData.pop();

    // Save the updated galleryData back to localStorage
    localStorage.setItem("galleryData", JSON.stringify(galleryData));

    // Re-render the gallery to reflect the changes
    renderGallery();
  }
}

    // Expose  to the global scope
    // window.removeLastImage = removeLastImage;

