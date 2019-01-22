# katana-alexa-https-hosting
Move Alexa skill on VPS

## Description
This module is for running Alexa Skill in an environment not Lambda.

## Installation
From npm

```
npm install --save katana-alexa-https-hosting
```

## How to use
### example
```sample.js
const KatanaHttps = require('katana-alexa-https-hosting')
const Alexa = require('ask-sdk')

//Launch intent handler
const LaunchIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request
        return request.type === 'LaunchRequest'
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
                .speak('Wellcome!')
                .withShouldEndSession(true)
                .getResponse();
    }
}

//Error intent handler
const ErrorHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request
        return request.type === 'LaunchRequest'
    },
    handle(handlerInput) {
		return handlerInput.responseBuilder
			.speak('Sorry, an error occurred.')
			.withShouldEndSession(true)
			.getResponse();
	}
}

//Generate skill builder.
//At this time, do not call "lambda ()" or "create ()".
var skillBuilder = Alexa.SkillBuilders.standard()
        .addErrorHandlers(LaunchIntentHandler)
        .addErrorHandlers(ErrorHandler)

//When using DynamoDB, region setting of aws-sdk is necessary.
KatanaHttps.awsSetup.setRegion('ap-northeast-1')

//Set the port number to be listened to.
//The default is 3000.
//KatanaHttps.expressSetup.setPortNo('3030')

//Set the path requested by the skill.
//The default value is "/"
//KatanaHttps.expressSetup.setAnyPath('/alexa/')

//I will set up the skill builder that I have created.
KatanaHttps.alexaSetup.setSkill(skillBuilder)

//Start the skill.
KatanaHttps.expressSetup.start()
```
