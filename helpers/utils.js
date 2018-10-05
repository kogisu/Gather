// const googleSearch = require('../google/geocode');
// const db = require('../database-mongo');

module.exports = {
  init: function() {

  },
  calculateAvgPt: function(friends) {
    let avgLat = friends.reduce((total, friend) => {
      return total += friend.coordinates.lat;
    }, 0) / friends.length;

    let avgLng = friends.reduce((total, friend) => {
      return total += friend.coordinates.lng;
    }, 0) / friends.length;

    return {lat: avgLat, lng: avgLng};
  }
}