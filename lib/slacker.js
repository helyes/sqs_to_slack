//https://aws.amazon.com/premiumsupport/knowledge-center/internet-access-lambda-function/
var request = require('request');

class Slacker {
    //curl -X POST --data-urlencode "payload={\"channel\": \"#general\", \"username\": \"webhookbot\", \"text\": \"This is posted to #general and comes from a bot named webhookbot.\", \"icon_emoji\": \":ghost:\"}" https://hooks.slack.com/services/XXXXX/YYYYYYYY
    // constructor (webhookUrl, channel) {
    //     this.webhookUrl = webhookUrl;
    //     this.channel = channel;
    // }
    
    post (messageJson) {        
        console.log(`Posting ${JSON.stringify(messageJson)}` )
        console.log(`URL:${messageJson.webhook_url}`)
        return new Promise(function (resolve, reject) {
            request({
                url: messageJson.webhook_url,
                method: 'POST',
                json: true,
                headers: {
                    "content-type": "application/json",
                },
                body: messageJson
            }, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log("Response: " + JSON.stringify(response));
                    resolve(body);
                  } else {
                    console.log("Error: " + error);
                    reject(error);
                  }
            });
        });
    }
}

module.exports = Slacker;

module.exports = Slacker;
