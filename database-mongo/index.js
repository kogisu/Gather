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

const save = (data, next) => {
  console.log('inside save');
  Address.create(data);
  next();
}

var selectAll = function(callback) {
  Address.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports = {save, selectAll};