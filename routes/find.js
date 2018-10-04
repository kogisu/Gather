const express = require('express');
const router = express.Router();
const geocode = require('../google/geocode');
const db = require('../database-mongo');
const {google} = require('googleapis');

router.get('/', (req, res) => {
  db.selectAll('name coordinates', (err, data) => {
    if (err) {
      console.log('Error occured in getting data from db: ', err);
      res.status(404).end();
    }
    res.status(200).json(data);
  });
});

router.post('/', (req, res) => {
  console.log('posting address');
  let name = req.body.name;
  let address = req.body.address;
  if (typeof address === 'object') {
    db.selectAll('name coordinates', (err, data) => {
      if (err) {
        console.log('Error occured in getting data from db: ', err);
        res.status(404).end();
      }
      res.status(201).json(data);
    });
  } else {
    //Google Geocode
    geocode(address, (err, data) => {
      if (err) {
        console.log('Error occured in getting geocode: ', err);
        res.status(404).end();
      }
      let coordinates = data.results[0].geometry.location
      db.save({name, coordinates}, (coordinates) => {
        console.log('coordinates: ', coordinates);
        db.selectAll('name coordinates', (err, data) => {
          if (err) {
            console.log('Error occured in getting data from db: ', err);
            res.status(404).end();
          }
          res.status(201).json(data);
        });
      });
    });
  }
  
});

module.exports = router;