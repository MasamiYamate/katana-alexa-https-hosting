const Express       = require('express')
const verifier      = require('alexa-verifier')
const bodyParser    = require('body-parser')
const alexaManager  = require('./alexa-manager.js')

var port = 3000
var path = '/'

module.exports = {
    //Set port number to be listened to
    setPortNo: function (portno) {
        port = portno
    },
    //Set the path requested by the skill.
    setAnyPath: function (path) {
        path = path
    },
    //Start the skill.
    start: function () {
        var app = Express()
        app.use(bodyParser.json({
            verify: function getRawBody(req, res, buf) {
                req.rawBody = buf.toString()
            }
        }))
        app.get(path, function(req, res) {
            res.status(401).send()
        });
        app.post(path, function(req,res) {
            verifier(req.headers.signaturecertchainurl, req.headers.signature, req.rawBody ,
                function verificationCallback(err) {
                    if (err) {
                        res.status(401).send()
                    }else{
                        var context = {
                                succeed:function (result) {
                                res.json(result)
                            },
                            fail:function (error) {
                                console.log(error)
                            }
                        }
                        alexaManager.handler(req.body , context , res)
                    }
                }
            ) 
        })
        var server = app.listen(port , function (){
            console.log("Node.js is listening to PORT:" + server.address().port)
        })
    }
}