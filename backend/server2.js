const { exec } = require('child_process');

function turnOnHotspot(ssid, password) {
  const command = `nmcli device wifi hotspot ifname wlan0 con-name Hotspot ssid ${ssid} password ${password}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error turning on hotspot: ${error.message}`);
      return;
    }

    console.log('Hotspot turned on successfully!');
  });
}

turnOnHotspot('YourSSID', 'YourPassword');
