const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Define the API endpoints you want to call
const apiEndpoints = [
    { property: 'types', url: '/problem/types' },
    { property: 'levels', url: '/problem/levels' },
    { property: 'statuses', url: '/problem/statuses' },
    { property: 'platforms', url: '/platforms' },
    { property: 'trackers', url: '/trackers' },
    { property: 'reminders', url: '/reminders' },
    { property: 'companies', url: '/companies' },
    { property: 'remarks', url: '/remarks' },
    { property: 'notes', url: '/notes' },
    { property: 'settings', url: '/settings' },
    { property: 'analytics', url: '/analytics' },
    { property: 'timeline', url: '/timeline' },
    { property: 'problems', url: '/problems' },
    { property: 'playlists', url: '/playlists' },
    { property: 'sheets', url: '/sheets' }
];

// Function to call API and save response to file
async function callAndSave(endpoint) {
    try {
        const response = await axios.get(`http://localhost:5000/api${endpoint.url}`);
        const pathComponents = endpoint.url.split('/').filter(Boolean); // remove empty elements
        const fileName = `${pathComponents.pop()}.json`;
        const folderPath = path.join(__dirname, 'dist/api', ...pathComponents);
        const filePath = path.join(folderPath, fileName);

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        fs.writeFileSync(filePath, JSON.stringify(response.data, null, 2));
        console.log(`Response from ${endpoint.property} saved to ${filePath}`);
    } catch (error) {
        console.error(`Error fetching data from ${endpoint.property}: ${error.message}`);
    }
}

// Call APIs and save responses
async function fetchAndSaveResponses() {
    for (const endpoint of apiEndpoints) {
        await callAndSave(endpoint);
    }
}

fetchAndSaveResponses();
