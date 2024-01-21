const {exec} = require('child_process');
let adapterName='wlo1'

const turnOnHotspot = (ssid, password) => {
    const command = `nmcli device wifi hotspot ifname ${adapterName} con-name Hotspot ssid ${ssid} password ${password}`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
        console.error(`Error turning on hotspot: ${error.message}`);
        return;
        }
        console.log('Hotspot turned on successfully!');
    });
}

module.exports = {
    turnOnHotspot
}