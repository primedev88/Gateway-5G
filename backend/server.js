const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const {exec} = require('child_process');

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

let adapterName='';   // Run command: iwconfig and replace the adapter name

exec('iwconfig',(error,stdout,stderr)=>{
  if(error){
    console.error('Error in executing command iwconfig ',error);
  }
  const lines = stdout.split('\n');
  lines.forEach((line)=>{
    if(line.includes('IEEE 802.11')){
      adapterName = line.split(' ')[0];
    }
  })
})

function turnOffHotspot(){
  const command = 'nmcli connection down Hotspot';

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error turning off hotspot: ${error.message}`);
      return;
    }
    hotspot_status=false;
    console.log('Hotspot turned off successfully!');
  });
}

function turnOnHotspot(ssid, password) {
  const command = `nmcli device wifi hotspot ifname ${adapterName} con-name Hotspot ssid ${ssid} password ${password}`;

  exec(command, (error, stdout, stderr) => {
    let hotspot_status;
    if (error) {
      hotspot_status=false;
      console.error(`Error turning on hotspot: ${error.message}`);
    }
    else{
      hotspot_status=true;
      console.log('Hotspot turned on successfully!');
    }
    console.log(hotspot_status)
    function getStatus(res){
      res.json({hotspot_status});
    }
    
  });
}

app.get('/HotspotStatus',(req,res)=>{
  getStatus(res);
})

function getConnectedDevices(res){
  const devicesCommand = `iw dev ${adapterName} station dump`;

  exec(devicesCommand,(error,stdout,stderr)=>{
    if(error){
      console.error(`Error retrieving connected devices: ${error.message}`);
      return;
    }
    const connectedDevices = parseConnectedDevices(stdout);
    if(connectedDevices.length>0){
      console.log(`Number of connected devices: ${connectedDevices.length}`);
      console.log('Connected devices: ',connectedDevices);
    }
    const jsonData = {
      devices: Array.from({ length: 8 }, (_, index) => ({
        status: index < connectedDevices.length ? 'connected' : 'unconnected',
      })),
    };
    // Send the updated connectivity status as a response
    res.json(jsonData);
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


app.get('/get-connectivity-status',(req,res) => {
  getConnectedDevices(res);
})

app.get('/status',(req,res)=>{
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
    res.json({ isConnected });
  })
})

app.post('/update-credentials', (req, res) => {
    const { ssid, password } = req.body;
    const data = { ssid, password };
    fs.writeFileSync('./data.json', JSON.stringify(data));
    turnOnHotspot(ssid,password);
    res.json({ message: 'Credentials updated successfully' });
});

app.post('/toggle-hotspot', (req, res) => {
  const { isHotspotOn } = req.body;
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



