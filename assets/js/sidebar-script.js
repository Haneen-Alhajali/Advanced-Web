document.addEventListener('DOMContentLoaded', () => {
  console.log("Document loaded");

  const buttons = document.querySelectorAll('.sidebar-btn');
  const mainContent = document.getElementById('main-content');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      console.log(`Button clicked: ${button.textContent}`);

      // Get the file name from the button
      const file = button.getAttribute('data-file');
      console.log(`File to load: ${file}`);

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
            loadScript("/assets/js/data/galleryData.js", () => {
              console.log("galleryData.js loaded");
              loadScript("/assets/js/gallery.js", () => {
                console.log("gallery.js loaded");
                renderGallery(); // Ensure the gallery renders
              });
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
  const script = document.createElement('script');
  script.src = src;
  script.onload = callback;
  script.onerror = () => {
    console.error(`Failed to load script: ${src}`);
  };
  document.body.appendChild(script);
}
