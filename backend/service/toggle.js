//This module handles the toggle button for hotspot

const {exec} = require('child_process');
const fs = require('fs');
const { turnOnHotspot } = require('../utils/upHotspot')

const turnOffHotspot = () => {
  const command = 'nmcli radio wifi off';

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error turning off hotspot: ${error.message}`);
      return;
    }

    console.log('Hotspot turned off successfully!');
  });
}

const handleToggle = (req,res) => {
    const { isHotspotOn } = req.body;
    if (isHotspotOn) {
        fs.readFile('./data.json','utf8',(err,data1)=>{
        if(err){
            console.error(`Error reading JSON file: ${err.message}`);
            return;
        }
        const credentials = JSON.parse(data1);
        const ssid = credentials.ssid;
        const password = credentials.password;
        turnOnHotspot(ssid,password);
        })
    } else {
        turnOffHotspot();
    }
    res.json({ message: 'Toggle request received successfully' });
}

module.exports = {
    handleToggle
}