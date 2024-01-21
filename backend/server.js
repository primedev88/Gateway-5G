const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

require('./routes/routes')(app)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



