const dgram = require('dgram');

function handleLoraDevices(req, res) {
    // Create a UDP socket to receive data from the data dump application
    const client = dgram.createSocket('udp4');

    // Listen for messages from the data dump application
    client.on('message', (message, remote) => {
        console.log(`Received message from ${remote.address}:${remote.port}: ${message}`);
       
        // Assuming the data is text, you may need to parse it based on your format
        const responseData = message.toString();

        // Send the fetched data as response to the frontend
        res.setHeader('Content-Type', 'text/plain');
        res.end(responseData);

        // Close the socket after sending data
        client.close();
    });

    // Handle errors
    client.on('error', (err) => {
        console.error('Error receiving message from data dump application:', err);
        res.statusCode = 500;
        res.end('Error receiving message from data dump application');
    });

    // Bind the socket to listen for messages
    client.bind(8000, '127.0.0.54', () => {
        console.log('UDP socket is listening for messages');
    });
}
module.exports={
  handleLoraDevices
}
// Example usage
// Assuming you're using Express.js or some other framework
// app.get('/getLoraStatus', handleLoraDevices);

// If you're using plain Node.js HTTP server
// const server = http.createServer(handleLoraDevices);
// server.listen(8000);
