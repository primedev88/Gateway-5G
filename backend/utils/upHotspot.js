// This module turns on the hotspot

const {exec} = require('child_process');
const {getAdapterName} = require('./adapter')



const turnOnHotspot = async (ssid, password) => {
    let adapterName = await getAdapterName();
    exec('nmcli radio wifi on',(error,stdout,stderr)=>{
        if (error) {
            console.error(`Error turning on hotspot: ${error.message}`);
            return;
        }
    })
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