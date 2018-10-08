const express = require('express');
const router = express.Router();
const geocode = require('../google/geocode');
const db = require('../database-mongo');
const {google} = require('googleapis');
const places = require('../google/places');

router.get('/', (req, res) => {
  console.log('query: ', req.query);
  db.selectAll(null, 'name coordinates', (err, data) => {
    if (err) {
      console.log('Error occured in getting data from db: ', err);
      res.status(404).end();
    }
    res.status(200).json(data);
  });
});

router.post('/', (req, res) => {
  console.log('posting address');
  console.log('query: ', req.query);
  let name = req.body.name;
  let address = req.body.address;

  if (req.query.findme) {
    console.log('Saving Geodata');
    let lat = JSON.parse(req.body.address.lat).toFixed(3);
    let lng = JSON.parse(req.body.address.lng).toFixed(3);
    let coordinates = {lat, lng};

    db.saveFriend({name, coordinates}, (coordinates) => {
      console.log('coordinates: ', coordinates);
      db.selectAll(null, 'name coordinates', (err, data) => {
        if (err) {
          console.log('Error occured in getting data from db: ', err);
          res.status(404).end();
        }
        res.status(201).json(data);
      });
    });
  } else if (req.query.friends) {
    console.log('Posting new address');
    
    //Google Geocode
    geocode(address, (err, data) => {
      if (err) {
        console.log('Error occured in getting geocode: ', err);
        res.status(404).end();
      }

      if (data.results.length === 1) {
        console.log('data: ', data);
        let lat = JSON.parse(data.results[0].geometry.location.lat).toFixed(3);
        let lng = JSON.parse(data.results[0].geometry.location.lng).toFixed(3);
        let coordinates = {lat, lng};
        db.saveFriend({name, coordinates}, (coordinates) => {
          console.log('coordinates: ', coordinates);
          db.selectAll(null, 'name coordinates', (err, data) => {
            if (err) {
              console.log('Error occured in getting data from db: ', err);
              res.status(404).end();
            }
            res.status(201).json(data);
          });
        });
      } else if (data.results.length === 0) {
        res.status(201).json({fail: 0});
      } else {
        res.status(201).json({fail: 1});
      }
    });
  } else if (req.query.places) {
    console.log('places search:', req.body);
    let searchString = req.body.places;
    let distance = 5000; //meters
    let coordinates = req.body.avgPoint;

    places(searchString, distance, coordinates)
    .then(places => {
      // console.log('results: ', places.results);
      return db.savePlace(places.results);
    })
    .then(() => {
      res.status(201).end();
    });
  }
});

module.exports = router;