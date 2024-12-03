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
          })
          .catch(error => {
            console.error(error.message);
            mainContent.innerHTML = `<p>Error loading content: ${error.message}</p>`;
          });
      });
    });
// Load the overview content by default
 document.querySelector('.sidebar-btn[data-file="overview.html"]').click(); });