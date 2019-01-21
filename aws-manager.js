var aws = require('aws-sdk');

var region = null

module.exports = {
    setRegion: function (regionCode) {
        region = regionCode
        aws.config.update({region:regionCode})
    },
    getRegion: function () {
        return region
    }
}