const https = require('https');
var parseUrl = require('url').parse

class Slacker {

    post (messageJson) {        
        console.log(`Posting ${JSON.stringify(messageJson)}` )
        console.log(`URL:${messageJson.webhook_url}`)
        const payload = JSON.stringify(messageJson);
        var url = parseUrl(messageJson.webhook_url);
        var options = {
            hostname: url.hostname,
            path: url.path,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          };
        return new Promise(function (resolve, reject) {
            let responseData = ''            
            let req = https.request(options, (response) => {
              
              var code = response.statusCode
              
              response.on('data', function (chunk) {
                responseData += chunk
              })

              response.on('end', function () {
                if (code < 400) {
                  resolve(responseData)
                } else {
                  reject(responseData)
                }
              })

            });
        
            req.on('error', function (error) {
              reject(error.message)
            })
        
            req.write(payload)
            req.end()
          });

    }




    post3 (messageJson) {        
        console.log(`Posting ${JSON.stringify(messageJson)}` )
        console.log(`URL:${messageJson.webhook_url}`)
        const payload = JSON.stringify(messageJson);
        return new Promise(function (resolve, reject) {
            var responseData = ''
            var url = parseUrl(messageJson.webhook_url)
            var req = https.request({
              hostname: url.hostname,
              path: url.path,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              }
            }, function (response) {
              var code = response.statusCode
              response.on('data', function (chunk) {
                responseData += chunk
              })
              response.on('end', function () {
                if (code < 400) {
                  resolve(responseData)
                } else {
                  reject(responseData)
                }
              })
            })
        
            req.on('error', function (error) {
              reject(error.message)
            })
        
            req.write(payload)
            req.end()
          });

    }


    post2 (messageJson) {        
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
