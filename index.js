const awsManager     = require('./aws-manager.js')
const expressManager = require('./express-manager.js')
const alexaManager   = require('./alexa-manager.js')

module.exports = {
    awsSetup: awsManager,
    expressSetup: expressManager,
    alexaSetup: alexaManager
    
}