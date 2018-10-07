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
  selectAll: function(queries, fields, callback) {
    queries = queries || {};
    Address.find(queries, fields, (err, items) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, items);
      }
    })
    .select(fields);
  }
}

// module.exports = {save, selectAll};