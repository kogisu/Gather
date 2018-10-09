const request = require('request');
const config = require('../config');

const detailsSearch = (id) => { 
  let API_KEY = config.API_KEY;
  let url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&fields=name,rating,formatted_address,formatted_phone_number,opening_hours,url,icon,reviews,types,price_level,website&key=${API_KEY}`
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
}

module.exports = detailsSearch;