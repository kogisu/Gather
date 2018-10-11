// const googleSearch = require('../google/geocode');
// const db = require('../database-mongo');

module.exports = {
  init: function() {

  },
  radToDeg: (rad) => {
    return rad * 180 / Math.PI;
  },
  degToRad: (deg) => {
    return deg * Math.PI / 180;
  },
  calculateAvgPt: (friends) => {
    let avgLat = friends.reduce((total, friend) => {
      return total += friend.coordinates.lat;
    }, 0) / friends.length;

    let avgLng = friends.reduce((total, friend) => {
      return total += friend.coordinates.lng;
    }, 0) / friends.length;

    return {lat: avgLat, lng: avgLng};
  },
  calculateCenterPt: (friends) => {
    let radToDeg = (rad) => {
      return rad * 180 / Math.PI;
    };
    let degToRad = (deg) => {
      return deg * Math.PI / 180;
    };
    let sumX = 0;
    let sumY = 0;
    let sumZ = 0;
    console.log('this: ', this);

    friends.forEach(friend => {
      let lat = degToRad(friend.coordinates.lat);
      let lng = degToRad(friend.coordinates.lng);
      sumX += Math.cos(lat) * Math.cos(lng);
      sumY += Math.cos(lat) * Math.sin(lng);
      sumZ += Math.sin(lat);
    });
    let avgX = sumX / friends.length;
    let avgY = sumY / friends.length;
    let avgZ = sumZ / friends.length;

    console.log('avgx: ', avgX, 'avgY: ', avgY, 'avgZ: ', avgZ);
    let lng = Math.atan2(avgY, avgX);
    let hyp = Math.sqrt(avgX * avgX + avgY * avgY);
    let lat = Math.atan2(avgZ, hyp);

    return {lat: radToDeg(lat), lng: radToDeg(lng)};
  }
}