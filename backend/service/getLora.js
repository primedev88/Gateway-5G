const net = require('net');

function handleLoraDevices(req, res) {
    // Create a TCP socket to connect to the local address where the data is dumped
    const client = net.createConnection({ port: 12345, host: '127.0.0.1' }, () => {
        console.log('Connected to data dump application');

        // When connection is established, start reading data
        client.on('data', (data) => {
            // Assuming the data is text, you may need to parse it based on your format
            const responseData = data.toString();

            // Send the fetched data as response to the frontend
            res.setHeader('Content-Type', 'text/plain');
            res.end(responseData);

            // Close the connection after sending data
            client.end();
        });
    });

    // Handle errors
    client.on('error', (err) => {
        console.error('Error connecting to data dump application:', err);
        res.statusCode = 500;
        res.end('Error connecting to data dump application');
    });
}

// Example usage
// Assuming you're using Express.js or some other framework
// app.get('/getLoraStatus', handleLoraDevices);

// If you're using plain Node.js HTTP server
// const server = http.createServer(handleLoraDevices);
// server.listen(8000);

module.exports={
  handleLoraDevices
}