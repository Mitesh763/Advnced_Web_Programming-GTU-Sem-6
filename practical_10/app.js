const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB max file size
}).single('file');

// Set up static folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle file upload
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).send('Error uploading file.');
    } else {
      if (req.file == undefined) {
        res.status(400).send('No file selected.');
      } else {
        console.log(req.file);
        res.send('File uploaded successfully on  :  ' + path.join(__dirname,req.file.destination));
      }
    }
  });
});

// Set up homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
