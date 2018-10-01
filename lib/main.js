let AWS = require('aws-sdk');
let sqs = new AWS.SQS();
const  Slacker = require('./slacker_http');

const slacker = new Slacker();
// test

exports.handler = async function(event, context) {
  console.log(event);
  let response = [];
  for (let i=0; i<event.Records.length; i++) {
    let record = event.Records[i];
    console.log(record);
    const { body } = record;
    console.log("Body:" + body);
    let slackerResponse = await slacker.post(JSON.parse(body));
    console.log('Slacker response ' + slackerResponse);
    response.push({status: 200, trigger: body})
  }
  
  return response;
}

