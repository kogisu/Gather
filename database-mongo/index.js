const details = require('../google/details');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

const AddressSchema = mongoose.Schema({
  name: String,
  coordinates: {
    lat: Number,
    lng: Number
  }
});

const Address = mongoose.model('Address', AddressSchema);

const PlaceSchema = mongoose.Schema({
  name: String,
  rating: Number,
  address: String,
  url: String,
  website: String,
  phone: String
});

const Place = mongoose.model('Place', PlaceSchema);

module.exports = {
  saveFriend: function(data, next) {
    let queries = {
      coordinates: {
        lat: JSON.parse(data.coordinates.lat),
        lng: JSON.parse(data.coordinates.lng)
      }
    };

    this.selectAll(queries, null, (err, results) => {
      if (err) {
        console.log('error in saving to db');
      } else if (results.length < 1) {
        Address.create(data, (err, data) => {
          next(data);
        });
      } else {
        next(null);
      }
    });
  },
  savePlace: function(places) {
    let completed = 1;
    return new Promise((resolve) => {
      places.forEach((place, index) => {
        details(place.place_id)
        .then(place => {
          console.log('place: ', index);
          // Address.create(Place, (err, data) => {  
          // });
          completed++;
          if (completed === places.length) {
            console.log('resolved');
            resolve();
          }
        });
      });
    });
  },
  selectAll: function(queries, fields, callback) {
    queries = queries || {};
    Address.find(queries, fields, (err, items) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, items);
      }
    });
  }
}

// module.exports = {save, selectAll};