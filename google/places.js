const request = require('request');
const config = require('../config');

const placesSearch = (input, distance, coordinates) => { 
  let keywords = input.split('').join('%20');
  //includes name, rating, opening_hours, geometry, formatted address
  //locationbias=circle:${meters}@${lat},${lng}
  let API_KEY = config.API_KEY;
  // let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${keywords}&inputtype=textquery&fields=place_id,photos,formatted_address,name,rating,opening_hours&locationbias=circle:${distance}@${coordinates.lat},${coordinates.lng}&key=${API_KEY}`
  let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${keywords}&location=${coordinates.lat},${coordinates.lng}&radius=${distance}&key=${API_KEY}`
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

module.exports = placesSearch;