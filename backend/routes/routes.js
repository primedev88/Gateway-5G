const {getConnectedDevice, getStatus, updateCredentials, toggleHotspot, getLoraStatus} = require("../controllers/controllers")

module.exports = (app) => {
    app.get('/get-connectivity-status',getConnectedDevice)

    app.get('/status',getStatus)

    app.get('/loraStatus',getLoraStatus)

    app.post('/update-credentials', updateCredentials)

    app.post('/toggle-hotspot', toggleHotspot)
}