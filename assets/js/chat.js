// Function to filter admins by name
function filterAdmins() {
    const searchQuery = document.querySelector(".search-bar").value.toLowerCase();
    const adminList = document.querySelectorAll(".admin");
  
    adminList.forEach((admin) => {
      const adminName = admin.querySelector("span").textContent.toLowerCase();
      if (adminName.includes(searchQuery)) {
        admin.style.display = "flex";
      } else {
        admin.style.display = "none";
      }
    });
  }
  
// Function to open chat for the selected admin
function openChat(adminId) {
    // Hide all chat boxes
    const chatBoxes = document.querySelectorAll(".chat-box");
    chatBoxes.forEach((box) => {
      box.style.display = "none";
    });
  
    // Show the selected admin's chat box
    const selectedChatBox = document.getElementById(`chat-box-${adminId}`);
    if (selectedChatBox) {
      selectedChatBox.style.display = "block";
    }
  }
  
  // Expose openChat to the global scope
  window.openChat = openChat;

    // Expose openChat to the global scope
    window.filterAdmins = filterAdmins;
  