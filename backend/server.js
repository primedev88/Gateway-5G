const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

app.post('http://localhost:8000/update-credentials', (req, res) => {
    const { ssid, password } = req.body;
    const data = { ssid, password };
    fs.writeFileSync('./backend/data.json', JSON.stringify(data));

    res.json({ message: 'Credentials updated successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
