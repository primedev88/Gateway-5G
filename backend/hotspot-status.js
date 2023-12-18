const { exec } = require('child_process');

function getConnectedDevices() {
  const command = 'iw dev wlan0 station dump';

  exec(command, (error, stdout, stderr) => {
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

getConnectedDevices();
