document.addEventListener('DOMContentLoaded', () => {

  // Get the logged-in user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
  if (!currentUser) {
    window.location.href = "login.html"; // Redirect if no user is logged in
    return;
  }

  // Update the sidebar with user details
  const userNameElem = document.getElementById("user-name");
  const userAvatarElem = document.getElementById("user-avatar");

  // Dynamically update user name and avatar based on role
  userNameElem.textContent = currentUser.fullName;
  
  // Update the avatar dynamically based on username or role
  userAvatarElem.src = `../assets/images/${currentUser.role}-avatar.png`;
  
  const buttons = document.querySelectorAll('.sidebar-btn');
  const mainContent = document.getElementById('main-content');
  const sidebar = document.getElementById('sidebar');
  const hamburgerBtn = document.getElementById('hamburger-btn');

  // Toggle sidebar on hamburger button click
  hamburgerBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    mainContent.classList.toggle("sidebar-open", sidebar.classList.contains("open"));
  });

  // Close sidebar if clicked outside (optional)
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && e.target !== hamburgerBtn) {
      sidebar.classList.remove('open');
      mainContent.classList.remove("sidebar-open");
    }
  });

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      console.log(`Button clicked: ${button.textContent}`);

      // Get the file name from the button
      const file = button.getAttribute('data-file');

      // Fetch the content from the sections directory
      fetch(`sections/${file}`)
        .then(response => {
          console.log(`Response status: ${response.status}`);
          if (!response.ok) {
            throw new Error('Failed to load section.');
          }
          return response.text();
        })
        .then(html => {
          console.log(`Content loaded: ${file}`);
          mainContent.innerHTML = html;

          // Dynamically load gallery.js if gallery page is loaded
          if (file === "gallery.html") {
            galleryGrid.innerHTML = ""; // Clear the gallery grid

            loadScript("/assets/js/data/galleryData.js", () => {
              console.log("galleryData.js loaded");

              // Use import to access renderGallery from gallery.js
              import('/assets/js/gallery.js').then(module => {
                console.log("gallery.js loaded");
                module.renderGallery(); // Now call the function directly
              }).catch(error => {
                console.error("Error loading gallery.js:", error);
              });
            });
          }

          // load chat.js if chat page is loaded
          if (file === "chat.html") {
            loadScript("/assets/js/chat.js", () => {
              console.log("chat.js loaded");
            });
          }
        })
        .catch(error => {
          console.error(error.message);
          mainContent.innerHTML = `<p>Error loading content: ${error.message}</p>`;
        });
    });
  });

  // Load the overview content by default
  document.querySelector('.sidebar-btn[data-file="overview.html"]').click();
});

/**
 * Helper Function to Dynamically Load JavaScript Files
 * @param {string} src - Path to the JavaScript file
 * @param {function} callback - Function to execute after the script loads
 */
function loadScript(src, callback) {
  if (document.querySelector(`script[src="${src}"]`)) {
    if (callback) callback();
    return;
  }

  const script = document.createElement('script');
  script.src = src;
  script.type = 'module'; 
  script.onload = callback;
  script.onerror = () => console.error(`Failed to load script: ${src}`);
  document.body.appendChild(script);
}
