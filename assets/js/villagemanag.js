const searchBox = document.querySelector(".search-box");
const villageItemsContainer = document.querySelector(".village-list");
const villageItems = Array.from(document.querySelectorAll(".village-item"));
const sortSelect = document.querySelector("#sort");

// Handling search functionality
if (searchBox) {
    searchBox.addEventListener("input", () => {
        const searchText = searchBox.value.toLowerCase().trim();
        villageItems.forEach(item => {
            const villageName = item.querySelector("span").textContent.toLowerCase().trim();
            item.style.display = villageName.includes(searchText) ? "flex" : "none";
        });
    });
}

// Handling sort functionality
if (sortSelect) {

    sortSelect.addEventListener("change", () => {
        const sortValue = sortSelect.value;
        if (sortValue === "name") {
            villageItems.sort((a, b) => {
                const nameA = a.querySelector("span").textContent.toLowerCase();
                const nameB = b.querySelector("span").textContent.toLowerCase();
                return nameA.localeCompare(nameB);
            });
        } else {
            villageItems.sort((a, b) => a.dataset.originalOrder - b.dataset.originalOrder);
        }
        villageItems.forEach(item => villageItemsContainer.appendChild(item));
    });
}

// Storing original order of village items
villageItems.forEach((item, index) => {
    item.dataset.originalOrder = index;
});

// Modal for viewing village details
const viewModal = document.getElementById("view-village-modal");
const viewModalContent = document.querySelector("#view-village-modal .modal-content");
const closeViewModal = document.querySelector("#view-village-modal .close-btn");

// Handle view button click
villageItems.forEach(item => {
    const viewButton = item.querySelector(".view");
    if (viewButton) {
        console.log("viewButton clicked");

        viewButton.addEventListener("click", () => {
            const villageName = item.querySelector("span").textContent.trim();
            const regionDistrict = item.dataset.regionDistrict;
            const landArea = item.dataset.landArea;
            const latitude = item.dataset.latitude;
            const longitude = item.dataset.longitude;
            const tags = item.dataset.tags;

            // Update the view modal with the selected village's details
            viewModalContent.innerHTML = `
                <span class="close-btn" onclick="closeViewModalfun()">&times;</span>
                <h3>Village Details</h3>
                <p><strong>Village Name:</strong> ${villageName}</p>
                <p><strong>Region/District:</strong> ${regionDistrict}</p>
                <p><strong>Land Area (sq km):</strong> ${landArea}</p>
                <p><strong>Latitude:</strong> ${latitude}</p>
                <p><strong>Longitude:</strong> ${longitude}</p>
                <p><strong>Tags:</strong> ${tags}</p>
                <p><strong>Village Image:</strong><br><img src="${item.dataset.image}" alt="Village Image" style="width:100%; max-width:400px;"></p>
            `;

            // Show the modal
            viewModal.style.display = "block";
        });
    }
});

// Close the view modal
closeViewModal.onclick = function () {
    viewModal.style.display = "none";
};

// Modal handling code for adding new village
const addVillageModal = document.getElementById("add-village-modal");
const btn = document.querySelector(".add-new");
const span = document.querySelector(".close-btn");
const form = document.querySelector("form");

// Show the modal when the button is clicked
btn.onclick = function () {
    addVillageModal.classList.add('show');
    addVillageModal.style.display = "block";
};

// Close the modal when the close button is clicked
span.onclick = function () {
    addVillageModal.style.display = "none";
};

// Close the modal if the user clicks outside the modal content
window.onclick = function (event) {
    if (event.target === addVillageModal) {
        addVillageModal.style.display = "none";
    }
};

// Handling form submission to add new village
form.addEventListener("submit", function (e) {
    console.log("   Handling form submission to add new village");
    e.preventDefault();

    const villageName = document.getElementById("village-name").value.trim();
    const regionDistrict = document.getElementById("region-district").value.trim();
    const landArea = document.getElementById("Land Area (sq Km)").value.trim();
    const latitude = document.getElementById("Latitude").value.trim();
    const longitude = document.getElementById("Longitude").value.trim();
    const categories = document.getElementById("Categories/Tags").value.trim();

    if (!villageName || !regionDistrict || !landArea || !latitude || !longitude) {
        alert("Please fill all the required fields.");
        return;  // Stop form submission if validation fails
    }

    const image = document.getElementById("village-file").files[0] ? URL.createObjectURL(document.getElementById("village-file").files[0]) : "";

    // Create new village item
    const newVillageItem = document.createElement("div");
    newVillageItem.classList.add("village-item");
    newVillageItem.dataset.regionDistrict = regionDistrict;
    newVillageItem.dataset.landArea = landArea;
    newVillageItem.dataset.latitude = latitude;
    newVillageItem.dataset.longitude = longitude;
    newVillageItem.dataset.tags = categories;
    newVillageItem.dataset.image = image;

    // After creating the new village item
    newVillageItem.innerHTML = `
        <span>${villageName} - ${regionDistrict}</span>
        <div class="buttons">
            <button class="view">View</button>
            <button class="update">Update Village</button>
            <button class="delete">Delete Village</button>
            <button class="update-data">Update Demographic Data</button>
        </div>
    `;

    // Add the item to the village list
    villageItemsContainer.appendChild(newVillageItem);

    // Add event listener to the new "view" button
    const viewButton = newVillageItem.querySelector(".view");
    viewButton.addEventListener("click", () => {
        const villageName = newVillageItem.querySelector("span").textContent.trim();
        const regionDistrict = newVillageItem.dataset.regionDistrict;
        const landArea = newVillageItem.dataset.landArea;
        const latitude = newVillageItem.dataset.latitude;
        const longitude = newVillageItem.dataset.longitude;
        const tags = newVillageItem.dataset.tags;

        // Update the view modal with the selected village's details
        viewModalContent.innerHTML = `
            <span class="close-btn" onclick="closeViewModalfun()">&times;</span>
            <h3>Village Details</h3>
            <p><strong>Village Name:</strong> ${villageName}</p>
            <p><strong>Region/District:</strong> ${regionDistrict}</p>
            <p><strong>Land Area (sq km):</strong> ${landArea}</p>
            <p><strong>Latitude:</strong> ${latitude}</p>
            <p><strong>Longitude:</strong> ${longitude}</p>
            <p><strong>Tags:</strong> ${tags}</p>
            <p><strong>Village Image:</strong><br><img src="${newVillageItem.dataset.image}" alt="Village Image" style="width:100%; max-width:400px;"></p>
        `;

        // Show the modal
        viewModal.style.display = "block";
    });

    // Close the modal after adding the village
    addVillageModal.style.display = "none";
    addVillageModal.classList.remove('show');

    // Reset the form
    form.reset();
});

// Delete the village
const villageList = document.querySelector(".village-list");
// Update
const updateModal = document.getElementById("update-village-modal");
const updateButtons = document.querySelectorAll(".update");
// Update demographic
const updateModalDemographic = document.getElementById("update_Demographic-village-modal");
const updateDemoButtons = document.querySelectorAll(".update-data");

villageList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
        const villageItem = event.target.closest(".village-item");
        if (villageItem) {
            villageItem.remove();
        }
    }
    else if (event.target.classList.contains("update")) {

        updateButtons.forEach((button) => {
            updateModal.style.display = "block";
        });

    }
    else if (event.target.classList.contains("update-data")) {

        updateDemoButtons.forEach((button) => {
            console.log("update the demographic here the button");
            updateModalDemographic.style.display = "block";
        });
    }

    function hideUpdateModal() {
        console.log("inside the hide")
        updateModal.style.display = "none";
    }

    window.addEventListener("click", (event) => {
        if (event.target === updateModal) {
            updateModal.style.display = "none";
        }
    });
});

// Close view modal function
function closeViewModalfun() {
    const viewModal = document.getElementById("view-village-modal");
    viewModal.style.display = "none";
}

function hideUpdateModal() {
    const modal = document.getElementById("update-village-modal");
    if (modal) {
        modal.style.display = "none";
    }
}

function hideDemographicModal() {
    const modal = document.getElementById("update_Demographic-village-modal");
    if (modal) {
        modal.style.display = "none";
    }
}










 /* const name=document.getElementById("village-name").value ;
    const region=document.getElementById("region-district").value ;
    const land=document.getElementById("Land Area (sq Km)").value ;
    const Latitude=document.getElementById("Latitude").value ;
    const Longitude=document.getElementById("Longitude").value ;
    const imgFile=document.getElementById("village-file").value ;
    const tag=document.getElementById("Categories/Tags").value ;


    const newObject=     {  id:dataVillage.length+1 , name:name, Region:region, land:land , Latitude:Latitude , Longitude:Longitude ,Tags:tag , img:imgFile   } ;
    dataVillage.push(newObject);
    readAll();
*/










//old function of update 12/12
/*
    const object = localStorage.getItem("object");
    const villages = JSON.parse(object);

    const updateModal = document.getElementById("update-village-modal");
    const updateForm = document.getElementById("update-village-form");
    const updateButtons = document.querySelectorAll(".update-village-button-submit");


    updateButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const village = villages[index];
            console.log("Village  54564654updated here ");
            console.log("here the village");

            if (village) {
            
                document.getElementById("update-village-name").value = village.name;
                document.getElementById("update-region-district").value = village.Region;
                document.getElementById("update-land-area").value = village.land;
                document.getElementById("update-latitude").value = village.Latitude;
                document.getElementById("update-longitude").value = village.Longitude;

                
                console.log(document.getElementById("update-village-name").value);

                updateModal.style.display = "block";


                updateForm.onsubmit = (event) => {
                    event.preventDefault();
                    village.name = document.getElementById("update-village-name").value;
                    village.Region = document.getElementById("update-region-district").value;
                    village.land = document.getElementById("update-land-area").value;
                    village.Latitude = document.getElementById("update-latitude").value;
                    village.Longitude = document.getElementById("update-longitude").value;
                    village.img = document.getElementById("update-image").value;

                    localStorage.setItem("object", JSON.stringify(villages));

            
                    readAll();
                    searchBox();
                    sortByAlpha();

             
                    closeUpdateModal();

                    console.log("Village updated successfully!");
                };
            } else {
                console.error("Village data not found!");
            }
        });
    });










*/