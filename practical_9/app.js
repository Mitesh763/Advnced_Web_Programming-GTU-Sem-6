const express = require('express');
const multer = require('multer');
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');
const pako = require('pako');
const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '', 'index.html'));
});
app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send('File uploaded successfully.');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));