// This modules gives the status of internet connectivity

const {exec} = require('child_process');

const handleGetStatus = (req, res) => {
    let responseStatus = 200;
    exec('nmcli general status', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing nmcli: ${error}`);
            responseStatus = 500;
        }
        if (stderr) {
          console.error(`Error output from nmcli: ${stderr}`);
            responseStatus = 500;
        }
        const isConnected = stdout.includes('full');
        res.json({ isConnected, 'err': error, 'stderr': stderr, status: responseStatus });
    })
}

module.exports = {
    handleGetStatus
}