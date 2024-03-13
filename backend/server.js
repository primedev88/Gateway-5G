const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {exec} = require('child_process');

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

require('./routes/routes')(app)

const executeCommand = () => {
    exec('nmcli radio wifi off',(error,stdout,stderr) => {
        if(error){
            return;
        }
    })
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    executeCommand();
});


