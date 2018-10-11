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
  phone: String,
  hours: {
    open: Boolean,
    weekday_hours: [String]
  },
  icon: String,
  reviews: Number,
  types: [String],
  price: Number,
  search: String
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
  savePlace: function(places, search) {
    let completed = 1;
    return new Promise((resolve, reject) => {
      places.forEach((place, index) => {
        // if (index === 0) {console.log('place: ', place); }
        details(place.place_id)
        .then(place => {
          let pl = place.result;
          let PlaceObj = {
            name: pl.name,
            rating: pl.rating,
            address: pl.formatted_address,
            url: pl.url,
            website: pl.website ,
            phone: pl.formatted_phone_number,
            icon: pl.icon,
            types: pl.types || [],
            price: pl.price_level,
            search: search
          }
          if (pl.opening_hours) {
            PlaceObj.hours = {
              open: pl.opening_hours.open_now,
              weekday_hours: pl.opening_hours.weekday_text
            }
          } else {
            PlaceObj.hours = {
              open: '',
              weekday_hours: ''
            }
          }
          if (pl.reviews) {
            PlaceObj.reviews = pl.reviews.length;
          } else {
            PlaceObj.reviews = 0;
          }

          Place.create(PlaceObj, (err, data) => {  
            // console.log('completed: ', completed);
            if (err) {
              reject(err);
            }
            if (completed === places.length) {
              // console.log('resolved');
              resolve(data);
            }
            completed++;
          });
        });
      });
    });
  },
  selectAll: function(model, queries, fields, sortSelector) {
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
        Place.find(queries, fields).sort({[sortSelector]: 'desc'}).then(items => {
          resolve(items);
        });
      }
    });
  },
  delete: function(model, next) {
    if (model === 'Place') {
      Place.deleteMany({}, next);
    }
  }
}

// module.exports = {save, selectAll};