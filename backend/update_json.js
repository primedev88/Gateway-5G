const fs = require('fs');
const { exec } = require('child_process');

const jsonFilePath = 'path/to/your/json/file.json';

function createHotspot(ssid, password) {
  const hotspotCommand = `nmcli device wifi hotspot ifname wlan0 con-name Hotspot ssid ${ssid} password ${password}`;

  exec(hotspotCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error creating hotspot: ${error.message}`);
      return;
    }

    console.log('Hotspot created successfully!');

    // Check and update connected devices every 5 seconds (adjust as needed)
    setInterval(() => {
      updateConnectedDevicesStatus(jsonFilePath);
    }, 5000);
  });
}

function updateConnectedDevicesStatus(jsonFilePath) {
  const devicesCommand = 'iw dev wlan0 station dump';

  exec(devicesCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error retrieving connected devices: ${error.message}`);
      return;
    }

    const connectedDevices = parseConnectedDevices(stdout);

    // Read the JSON file
    fs.readFile(jsonFilePath, 'utf8', (readError, data) => {
      if (readError) {
        console.error(`Error reading JSON file: ${readError.message}`);
        return;
      }

      const jsonData = JSON.parse(data);

      // Update the status of connected devices in the JSON file
      jsonData.devices.forEach(device => {
        device.status = connectedDevices.includes(device.mac) ? 'connected' : 'unconnected';
      });

      // Write the updated JSON back to the file
      fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (writeError) => {
        if (writeError) {
          console.error(`Error writing to JSON file: ${writeError.message}`);
        } else {
          console.log('JSON file updated successfully!');
        }
      });
    });
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
