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
    return new Promise((resolve, reject) => {
      this.selectAll('Address', queries, null)
      .then(results => {
        if (results.length < 1) {
          Address.create(data, (err, data) => {
            resolve(data);
          });
        } else {
          resolve(null);
        }
      })
      .catch(err => {
        console.log('error occured in finding address in db: ', err);
      });
    });
  },
  savePlace: function(places) {
    let completed = 1;
    return new Promise((resolve) => {
      places.forEach((place, index) => {
        details(place.place_id)
        .then(place => {
          console.log('place: ', index, 'completed: ', completed);
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
  selectAll: function(model, queries, fields) {
    queries = queries || {};

    return new Promise((resolve, reject) => {
      if (model === 'Address') {
        Address.find(queries, fields, (err, items) => {
          if(err) {
            reject(err);
          } else {
            resolve(items);
          }
        });
      } else {
        Place.find(queries, fields, (err, items) => {
          if(err) {
            reject(err);
          } else {
            resolve(items);
          }
        });
      }
    });
  }
}

// module.exports = {save, selectAll};