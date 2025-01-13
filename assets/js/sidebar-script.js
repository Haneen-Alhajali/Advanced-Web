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

            loadScript("./../assets/js/data/galleryData.js", () => {
              console.log("galleryData.js loaded");

              // Use import to access renderGallery from gallery.js
              import('./gallery.js').then(module => {
                console.log("gallery.js loaded");
                module.renderGallery(); // Now call the function directly
              }).catch(error => {
                console.error("Error loading gallery.js:", error);
              });
            });
          }
          
          if (file === "village-management.html") {
            loadScript("./../assets/js/villageManegment.js", () => {
              console.log("villagemanag.js loaded");
            });
          }   

          // load chat.js if chat page is loaded
          if (file === "chat.html") {
            loadScript("./../assets/js/chat.js", () => {
              console.log("chat.js loaded");
            });
          }

            // Load chart overview if overview page is loaded
          if (file === "overview.html") {
            loadChartOverview();
            loadBarChartOverview();
            initMap();
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



/**
 * Function to genrate Charts for Overview Page
 */
function loadChartOverview() {
  console.log("chartOverview.js: DOM fully loaded and parsed");

  const ageData = [15, 25, 20, 30, 10];
  const genderData = [45, 55];

  const ageCtx = document.getElementById("ageChart")?.getContext("2d");
  const genderCtx = document.getElementById("genderChart")?.getContext("2d");

  if (ageCtx) {
    new Chart(ageCtx, {
      type: "pie",
      data: {
        labels: ["0-18", "19-35", "36-50", "51-65", "65+"],
        datasets: [
          {
            data: ageData,
            backgroundColor: ["#a74c65", "#2f71a3", "#a58c4d", "#3c8489", "#684eaf"],
          },
        ],
      },
      options: { responsive: true },
    });
  } else {
    console.error("ageChart canvas not found!");
  }

  if (genderCtx) {
    new Chart(genderCtx, {
      type: "pie",
      data: {
        labels: ["Male", "Female"],
        datasets: [
          {
            data: genderData,
            backgroundColor: ["#2f71a3", "#a74c65"],
          },
        ],
      },
      options: { responsive: true },
    });
  } else {
    console.error("genderChart canvas not found!");
  }
}



 /*line chart */

function loadBarChartOverview(){

  const ctx = document.getElementById('barChart');
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [     'Jabalia', 'Beit Lahia', 'Quds', 'Shejaiya', 'Hebron', 'Nablus','Ramallah','Beit Jala'  ],
      datasets: [{
        label: 'Population',
        data: [50000, 40000, 30000, 45000, 250000,150000,100000,30000],

        borderColor: [
          'rgba(38,171,174,255)'
      ],

      backgroundColor:[
        'rgba(56,94,106,255)'
      ],

        borderWidth: 1.5
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

/********************** */

        function initMap() {
            const centerLocation = { lat: 31.7683, lng: 35.2137 }; 

            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 8,
                center: centerLocation,
            });

            const locations = [
                { lat: 31.7683, lng: 35.2137, title: "القدس" }, 
                { lat: 32.0853, lng: 34.7818, title: "تل أبيب" },
                { lat: 32.7940, lng: 35.0938, title: "الناصرة" },
            ];

            locations.forEach((location) => {
                const marker = new google.maps.Marker({
                    position: { lat: location.lat, lng: location.lng },
                    map: map,
                    title: location.title,
                });
            });
        }

