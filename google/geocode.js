const request = require('request');
const config = require('../config');

const googleSearch = (address, next) => { 
  let googleAddress = address.split('').join('+');
  let API_KEY = config.API_KEY;
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${googleAddress}&key=${API_KEY}`

  request(url, (error, response, body) => {
    if (error) {
      console.log('error occured in getting geocode: ', error);
    }
    // if (body.length > 1) {
    //   res.json('Incorrect Address, please try again (results > 1)');
    // }
    // if (body.results.length < 1) {
    //   res.json('Incorrect Address, please try again (results < 1)');
    // }
    next(JSON.parse(body));
  });
}

module.exports = googleSearch;