// This module turns on the hotspot
const { promisify } = require('util');
const execAsync = promisify(require('child_process').exec);
const { getAdapterName } = require('./adapter');

const turnOnHotspot = async (ssid, password) => {
    try {
        let adapterName = await getAdapterName();

        // Enable Wi-Fi
        await execAsync('nmcli radio wifi on');

        // Add a short delay (1 second) before creating the hotspot
        await delay(1000);

        // Create hotspot
        const createCommand = `nmcli device wifi hotspot ifname ${adapterName} con-name Hotspot ssid ${ssid} password ${password}`;
        await execAsync(createCommand);
        console.log('Hotspot turned on successfully!');
        return true;
        
    } catch (error) {
        await execAsync('nmcli radio wifi off');
        console.error(`Error turning on hotspot: ${error.message}`);
        return false;
    }
};

const delay = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

module.exports = {
    turnOnHotspot
}