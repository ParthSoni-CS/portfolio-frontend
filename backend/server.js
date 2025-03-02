// filepath: /mnt/e/Protfolio-website/backend/server.js
const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = req.file.path;
  const fileName = req.file.originalname.replace('.ipynb', '.html');
  const outputPath = path.join(__dirname, 'public', 'case-studies', fileName);

  exec(`jupyter nbconvert --to html ${filePath} --output ${outputPath}`, (err) => {
    if (err) {
      return res.status(500).send('Error converting notebook');
    }

    fs.unlinkSync(filePath); // Remove the uploaded .ipynb file
    res.send('File uploaded and converted successfully');
  });
});

app.get('/case-studies', (req, res) => {
  const caseStudiesDir = path.join(__dirname, 'public', 'case-studies');
  fs.readdir(caseStudiesDir, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading case studies');
    }

    const caseStudies = files.map(file => ({
      title: file.replace('.html', ''),
      link: `/case-studies/${file}`
    }));

    res.json(caseStudies);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});