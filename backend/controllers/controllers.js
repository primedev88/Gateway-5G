const {handleGetStatus} = require('../service/status')
const {handleConnectedDevices} = require('../service/device')
const {handleToggle} = require('../service/toggle')
const {handleSubmit} = require('../service/upCredential')

const getConnectedDevice = (req,res) => {
    return handleConnectedDevices(req,res)
}

const getStatus = (req,res) => { 
    return handleGetStatus(req,res);
}

const updateCredentials = (req,res) => {
    return handleSubmit(req,res);
}

const toggleHotspot = (req,res) => {
    return handleToggle(req,res);
}

module.exports = {
    getConnectedDevice,
    getStatus,
    updateCredentials,
    toggleHotspot
}