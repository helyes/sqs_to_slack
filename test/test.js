const expect = require('chai').expect;
const main = require('../main');

require('dotenv').config()

describe('Evaluate query result', function () {
  
   let event= {
        "query": "SELECT CASE WHEN COUNT(id) > 50 THEN 'Number of entries in delayed_jobs table exceeds 50' ELSE 'OK' END AS result FROM delayed_jobs",
        "username": "DB poll bot",
        "icon_emoji": ":ghost:"
    };

  it('should return false if query resultset is empty', async function () {
    let ret = await main.handler(event);
    console.log(ret);
    expect(ret).to.deep.equal({ result: 'OK' });

  });
});
