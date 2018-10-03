const express = require('express');
const router = express.Router();
const geocode = require('../google/geocode');
const db = require('../database-mongo');
const {google} = require('googleapis');

router.get('/', (req, res) => {
});

router.post('/', (req, res) => {

  //Google Geocode
  let name = req.body.name;
  let address = req.body.address;
  console.log('posting address');

  geocode(address, (data) => {
    let coordinates = data.results[0].geometry.location
    console.log('name', name);
    console.log('coordinates: ', coordinates);
    db.save({name, coordinates}, (coordinates) => {
      console.log('coordinates: ', coordinates);
      
      res.status(201).end();
    });
  });
});

// app.get('/items', function (req, res) {
//   items.selectAll(function(err, data) {
//     if(err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   });
// });


module.exports = router;