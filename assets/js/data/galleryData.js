// Retrieve gallery data from localStorage or initialize with default data
const galleryData = JSON.parse(localStorage.getItem("galleryData")) || [
  {
    id: 1,
    imageUrl: "https://via.placeholder.com/150",
    description: "Description of the village image 1.",
  },
  {
    id: 2,
    imageUrl: "https://via.placeholder.com/150",
    description: "Description of the village image 2.",
  },
  {
    id: 3,
    imageUrl: "https://via.placeholder.com/150",
    description: "Description of the village image 3.",
  },
  {
    id: 4,
    imageUrl: "https://via.placeholder.com/150",
    description: "Description of the village image 4.",
  },
  {
    id: 5,
    imageUrl: "https://via.placeholder.com/150",
    description: "Description of the village image 5.",
  },
  {
    id: 6,
    imageUrl: "https://via.placeholder.com/150",
    description: "Description of the village image 6.",
  },
];

// Exporting galleryData so other scripts can access it
export { galleryData };