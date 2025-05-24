const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname)));

// API route to serve page content
app.get('/api/pages/:page', (req, res) => {
    const page = req.params.page;
    const allowedPages = ['home', 'about', 'projects', 'lectures', 'activities'];
    
    if (!allowedPages.includes(page)) {
        return res.status(404).json({ error: 'Page not found' });
    }
    
    const filePath = path.join(__dirname, 'pages', `${page}.html`);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).json({ error: 'Page not found' });
        }
    });
});

// Catch all handler: send back React's index.html file for client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});