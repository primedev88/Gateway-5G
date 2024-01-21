const {getConnectedDevice, getStatus, updateCredentials, toggleHotspot} = require("../controllers/controllers")

module.exports = (app) => {
    app.get('/get-connectivity-status',getConnectedDevice)

    app.get('/status',getStatus)

    app.post('/update-credentials', updateCredentials)

    app.post('/toggle-hotspot', toggleHotspot)
}