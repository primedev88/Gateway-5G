const { exec } = require('child_process');

function createHotspot(ssid, password) {
  const hotspotCommand = `nmcli device wifi hotspot ifname wlan0 con-name Hotspot ssid ${ssid} password ${password}`;
  
  exec(hotspotCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error creating hotspot: ${error.message}`);
      return;
    }

    console.log('Hotspot created successfully!');
    
    // After creating the hotspot, get the number of connected devices
    getConnectedDevices();
  });
}

function getConnectedDevices() {
  const devicesCommand = 'iw dev wlan0 station dump';

  exec(devicesCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error retrieving connected devices: ${error.message}`);
      return;
    }

    const connectedDevices = parseConnectedDevices(stdout);
    console.log(`Number of connected devices: ${connectedDevices.length}`);
    console.log('Connected devices:', connectedDevices);
  });
}

function parseConnectedDevices(output) {
  const lines = output.split('\n');
  const connectedDevices = [];

  lines.forEach((line) => {
    // Extract MAC addresses from the output
    const macAddressMatch = line.match(/Station ([0-9a-fA-F:]{17})/);
    if (macAddressMatch) {
      connectedDevices.push(macAddressMatch[1]);
    }
  });

  return connectedDevices;
}

// Replace 'YourSSID' and 'YourPassword' with your desired SSID and password
createHotspot('YourSSID', 'YourPassword');
