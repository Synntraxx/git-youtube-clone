const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// Route proxy pour les images
app.get('/proxy-image', async (req, res) => {
    const imageUrl = req.query.url;
    try {
        const response = await axios({
            url: imageUrl,
            responseType: 'stream',
        });
        response.data.pipe(res);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors du chargement de l\'image' });
    }
});

app.listen(port, () => {
    console.log(`Serveur Node.js en cours d'exécution sur http://localhost:${port}`);
});