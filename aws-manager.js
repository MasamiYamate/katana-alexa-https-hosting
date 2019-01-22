const aws = require('aws-sdk');

var region = null

module.exports = {
    //Set the region.
    setRegion: function (regionCode) {
        region = regionCode
        aws.config.update({region:regionCode})
    },
    //Acquire the set region name.
    getRegion: function () {
        return region
    }
}