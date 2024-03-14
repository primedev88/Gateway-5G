const dgram = require('dgram');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Create a UDP socket
const server = dgram.createSocket('udp4');

const handleLoraDevices = () => {
  server.on('error', (err) => {
    console.log(`Server error:\n${err.stack}`);
    server.close();
  });

  server.on('message', (msg, rinfo) => {
    console.log(`Received message from ${rinfo.address}:${rinfo.port}`);
    console.log(`Message: ${msg}`);

    // Here you can parse the message and extract the sensor id
    try {
      const data = JSON.parse(msg);
      if (data.sensor_id) {
        console.log(`Sensor ID: ${data.sensor_id}`);
        // You can process the sensor ID here
      } else {
        console.log('No sensor ID found in the received data.');
      }
    } catch (error) {
      console.log('Error parsing JSON:', error);
    }
  });

  server.on('listening', () => {
    const address = server.address();
    console.log(`Server listening on ${address.address}:${address.port}`);
  });

  // Bind the server to the specified port and address
  server.bind(12345, '127.0.0.1');
};

// Handle GET request for number of LoRa devices connected
app.get('/loradevices', (req, res) => {
  // Here you can collect and prepare the data from LoRa devices
  const loraDevices = [];

  // You can put your logic here to collect data from LoRa devices
  // For now, let's just send an empty array
  res.json({ count: loraDevices.length, devices: loraDevices });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // Start handling LoRa devices
  handleLoraDevices();
});
