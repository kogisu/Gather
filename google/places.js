const request = require('request');
const config = require('../config');

const placesSearch = (input, distance, coordinates, next) => { 
  let keywords = input.split('').join('%20');
  //includes name, rating, opening_hours, geometry, formatted address
  //locationbias=circle:${meters}@${lat},${lng}
  let API_KEY = config.API_KEY;
  let url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${keywords}&inputtype=textquery&fields=place_id,photos,formatted_address,name,rating,opening_hours&locationbias=circle:${distance}@${coordinates.lat},${coordinates.lng}&key=${API_KEY}`

  request(url, (error, response, body) => {
    if (error) {
      next(error, null);
    }
    next(null, JSON.parse(body));
  });
}

module.exports = googleSearch;