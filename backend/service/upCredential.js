// This module accepts the ssid and key from frontend

const fs = require('fs');
const { turnOnHotspot } = require('../utils/upHotspot')

const handleSubmit = (req,res) => {
    const { ssid, password } = req.body;
    const data = { ssid, password };
    fs.writeFileSync('./data.json', JSON.stringify(data));
    turnOnHotspot(ssid,password);
    res.json({ message: 'Credentials updated successfully' });
}

module.exports={
    handleSubmit
}