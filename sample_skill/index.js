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
			.speak("申し訳ありません、内部エラーが発生しました。")
			.withShouldEndSession(true)
			.getResponse();
	}
}

//スキルビルダーのオブジェクトを生成します
//この際にlambda()を呼ばずに呼び出すこと
var skillBuilder = Alexa.SkillBuilders.standard()
        .addErrorHandlers(LaunchIntentHandler)
        .addErrorHandlers(ErrorHandler)

//DynamoDBを利用する際のリージョンを設定する
KatanaHttps.awsSetup.setRegion('ap-northeast-1')

//任意のポート番号を利用する場合
//KatanaHttps.expressSetup.setPortNo('3030')

//任意のパスを利用する場合
//KatanaHttps.expressSetup.setAnyPath('/alexa/')

//Skillオブジェクトを設定します
KatanaHttps.alexaSetup.setSkill(skillBuilder)

//Skillを起動します
KatanaHttps.expressSetup.start()