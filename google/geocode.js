const request = require('request');
const config = require('../config');

const googleSearch = address => { 
  let googleAddress = address.split('').join('+');
  let API_KEY = config.API_KEY;
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${googleAddress}&key=${API_KEY}`

  request(url, (error, response, body) => {
    if (error) {
      console.log('error occured in getting geocode: ', error);
    }
    console.log('body: ', body);
  });
}

module.exports = googleSearch;