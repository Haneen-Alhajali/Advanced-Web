function loadPage(page) {
    const mainContent = document.getElementById('mainContent');
    const allItems = document.querySelectorAll('.sidebar ul li');

    // Remove active class from all sidebar items
    allItems.forEach(item => item.classList.remove('active'));

    // Set active class on the clicked item
    document.getElementById(page).classList.add('active');

    // Simulate loading new content
    mainContent.innerHTML = `<h1>Loading ${page}...</h1>`;

    setTimeout(() => {
        if (page === 'overview') {
            mainContent.innerHTML = `
                <h1>Overview</h1>
                <p>This is the Overview page.</p>
            `;
        } else if (page === 'villageManagement') {
            mainContent.innerHTML = `
                <h1>Village Management</h1>
                <p>Manage villages here.</p>
            `;
        } else if (page === 'chat') {
            mainContent.innerHTML = `
                <h1>Chat</h1>
                <p>Chat with users here.</p>
            `;
        } else if (page === 'gallery') {
            mainContent.innerHTML = `
                <h1>Gallery</h1>
                <p>View gallery here.</p>
            `;
        }
    }, 300); // Simulated loading time
}
