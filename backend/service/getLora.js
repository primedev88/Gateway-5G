const dgram = require('dgram');

const handleLoraDevices = (req, res) => {
  // Create a UDP socket
  const server = dgram.createSocket('udp4');

  // Listen for messages on the specified port
  const PORT = 12345;

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
        // Send the sensor ID back to the frontend
        res.send({ sensor_id: data.sensor_id });
      } else {
        console.log('No sensor ID found in the received data.');
        res.status(400).send('No sensor ID found in the received data.');
      }
    } catch (error) {
      console.log('Error parsing JSON:', error);
      res.status(500).send('Error parsing JSON.');
    }
  });

  server.on('listening', () => {
    const address = server.address();
    console.log(`Server listening on ${address.address}:${address.port}`);
  });

  // Bind the server to the specified port and address
  server.bind(PORT);
};

module.exports = {
  handleLoraDevices
};
