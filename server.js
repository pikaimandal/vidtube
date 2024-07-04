const express = require('express');
const path = require('path');
const ytdl = require('ytdl-core');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/video-info', async (req, res) => {
    const videoUrl = req.query.url;
    if (!ytdl.validateURL(videoUrl)) {
        return res.status(400).send('Invalid URL');
    }

    try {
        const info = await ytdl.getInfo(videoUrl);
        const formats = ytdl.filterFormats(info.formats, 'videoandaudio');
        const response = {
            title: info.videoDetails.title,
            thumbnail: info.videoDetails.thumbnails[0].url,
            formats: formats.map(format => ({ quality: format.qualityLabel, url: format.url })),
        };
        res.json(response);
    } catch (err) {
        res.status(500).send('Error retrieving video info');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
