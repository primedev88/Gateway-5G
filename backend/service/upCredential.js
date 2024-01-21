const fs = require('fs');
const { turnOnHotspot } = require('../utils/utils')

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