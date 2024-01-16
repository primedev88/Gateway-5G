const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const {exec} = require('child_process');
const wifi_json='../frontend/wifi.json';
const nr5g_json='../frontend/nr_5g.json';

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

function updateConnectivityStatus(isConnected) {
  const data = { status: isConnected ? 'connected' : 'unconnected' };
  fs.writeFile(nr5g_json, JSON.stringify(data, null, 4), (err) => {
      if (err) {
          console.error('Error writing file:', err);
          return;
      }
      console.log(`Connectivity status updated: ${isConnected ? 'online' : 'offline'}`);
  });
}

exec('nmcli general status', (error, stdout, stderr) => {
  if (error) {
      console.error(`Error executing nmcli: ${error}`);
      return;
  }
  if (stderr) {
      console.error(`Error output from nmcli: ${stderr}`);
      return;
  }

  const isConnected = stdout.includes('full');
  updateConnectivityStatus(isConnected);
});


function turnOffHotspot(){
  const command = 'nmcli connection down Hotspot';

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error turning off hotspot: ${error.message}`);
      return;
    }

    console.log('Hotspot turned off successfully!');
  });
}

function turnOnHotspot(ssid, password) {
  const command = `nmcli device wifi hotspot ifname wlp0s20f3 con-name Hotspot ssid ${ssid} password ${password}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error turning on hotspot: ${error.message}`);
      return;
    }
    
    console.log('Hotspot turned on successfully!');
    setInterval(getConnectedDevices, 500);
  });
}

function getConnectedDevices(){
  const devicesCommand = 'iw dev wlp0s20f3 station dump';

  exec(devicesCommand,(error,stdout,stderr)=>{
    if(error){
      console.error(`Error retrieving connected devices: ${error.message}`);
      return;
    }
    const connectedDevices = parseConnectedDevices(stdout);
    console.log(`Number of connected devices: ${connectedDevices.length}`);
    console.log('Connected devices: ',connectedDevices);
    
    fs.readFile(wifi_json,'utf8',(readError,data)=>{
      if(readError){
        console.error(`Error reading JSON file: ${readError.message}`);
        return;
      }
      const jsonData = JSON.parse(data);

      // jsonData.devices.forEach(device =>{
      //   device.status = connectedDevices.includes(device.mac)? 'connected':'unconnected';
      // });
      let num = connectedDevices.length-1;
      for(let i=0;i<8;i++){
        if(i<=num){
          jsonData.devices[i].status="connected";
        }
        else{
          jsonData.devices[i].status="unconnected";
        }
      }


      fs.writeFile(wifi_json,JSON.stringify(jsonData,null,2),'utf8',(writeError)=>{
        if(writeError){
          console.error(`Error writing to JSON file: ${writeError.message}`);
        }else{
          console.log('JSON file updated successfully!');
        }
      })
    })
    
  });
}
function parseConnectedDevices(output){
  const lines = output.split('\n');
  const connectedDevices = [];

  lines.forEach((line)=>{
    const macAddressMatch = line.match(/Station ([0-9a-fA-F:]{17})/);
    if(macAddressMatch){
      connectedDevices.push(macAddressMatch[1]);
    }
  });

  return connectedDevices;
}

app.post('/update-credentials', (req, res) => {
    const { ssid, password } = req.body;
    const data = { ssid, password };
    fs.writeFileSync('./data.json', JSON.stringify(data));
    
    turnOnHotspot(ssid,password);
    res.json({ message: 'Credentials updated successfully' });
});

app.post('/toggle-hotspot', (req, res) => {
  const { isHotspotOn } = req.body;
  const data = {isHotspotOn};
  fs.writeFileSync('./hotspot.json', JSON.stringify(data));
  if (isHotspotOn) {
    fs.readFile('./data.json','utf8',(err,data1)=>{
      if(err){
        console.error(`Error reading JSON file: ${err.message}`);
        return;
      }
      const credentials = JSON.parse(data1);
      const ssid = credentials.ssid;
      const password = credentials.password;
      turnOnHotspot(ssid,password);
    })
  } else {
    turnOffHotspot();
  }

  res.json({ message: 'Toggle request received successfully' });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



