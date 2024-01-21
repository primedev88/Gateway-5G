// This module returns the number of connected devices

const { exec } = require('child_process');

let adapterName = '';

exec('iwconfig', (error, stdout, stderr) => {
    if (error) {
        console.error('Error in executing command iwconfig ', error);
    }
    const lines = stdout.split('\n');
    lines.forEach((line) => {
        if (line.includes('IEEE 802.11')) {
            adapterName = line.split(' ')[0];
        }
    })
})

const getConnectedDevices = (res) => {
    const devicesCommand = `iw dev ${adapterName} station dump`;

    exec(devicesCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error retrieving connected devices: ${error.message}`);
            return;
        }
        const connectedDevices = parseConnectedDevices(stdout);
        console.log(`Number of connected devices: ${connectedDevices.length}`);
        console.log('Connected devices: ', connectedDevices);
        const jsonData = {
            devices: Array.from({ length: 8 }, (_, index) => ({
                status: index < connectedDevices.length ? 'connected' : 'unconnected',
            })),
        };
        // Send the updated connectivity status as a response
        res.json(jsonData);
    });
}

function parseConnectedDevices(output) {
    const lines = output.split('\n');
    const connectedDevices = [];

    lines.forEach((line) => {
        const macAddressMatch = line.match(/Station ([0-9a-fA-F:]{17})/);
        if (macAddressMatch) {
            connectedDevices.push(macAddressMatch[1]);
        }
    });
    return connectedDevices;
}

const handleConnectedDevices = (req, res) => {
    getConnectedDevices(res);
}

module.exports = {
    handleConnectedDevices
}