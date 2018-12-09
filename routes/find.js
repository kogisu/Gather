const express = require('express');
const router = express.Router();
const geocode = require('../google/geocode');
const db = require('../database-mongo');
const {google} = require('googleapis');
const places = require('../google/places');

router.get('/', (req, res) => {
  let model, query;
  if (req.query.friends) {
    model = 'Address';
    fields = 'name coordinates';
  } else {
    model = 'Place';
    fields = null;
  }
  if (req.query.distance || req.query.rating) {
    query = {
      // distance: {$lte: req.query.distance * 1609.34 || 50000},
      rating: {$lte: req.query.rating || 5}
    };
  }
  db.selectAll(model, query, fields, req.query.sortby)
  .then((data) => {
    console.log('data: ', data);
    res.status(200).json(data);
  })
  .catch(err => {
    console.log('error occured in getting addresses from db: ', err);
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

    db.saveFriend({name, coordinates})
    .then(coordinates => {
      db.selectAll('Address', null, 'name coordinates')
      .then((data) => {
        res.status(201).json(data);
      })
      .catch(err => {
        console.log('error occured in getting addresses from db: ', err);
      });
    })
    .catch(err => {
      console.log('error occured in saving address to db: ', err);
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
        db.saveFriend({name, coordinates})
        .then(coordinates => {
          db.selectAll('Address', null, 'name coordinates')
          .then((data) => {
            res.status(201).json(data);
          })
          .catch(err => {
            console.log('error occured in getting addresses from db: ', err);
          });
        })
        .catch(err => {
          console.log('error occured in saving address to db: ', err);
        });
      } else if (data.results.length === 0) {
        res.status(201).json({fail: 0});
      } else {
        res.status(201).json({fail: 1});
      }
    });
  } else if (req.query.places) {
    // console.log('places search:', req.body);
    let searchString = req.body.places;
    let distance = req.query.distance || 50000; //meters
    let coordinates = req.body.avgPoint;

    places(searchString, distance, coordinates)
    .then(places => {
      console.log('results: ', places.results);
      return db.savePlace(places.results, searchString);
    })
    .then(() => {
      db.selectAll('Place', null, null)
      .then((places) => {
        res.status(201).json(places);
      });
    });
  }
});

router.delete('/', (req, res) => {
  console.log('in delete!!');
  let query;
  if (req.query.deletePlaces === 'all') {
    model = 'Place';
    query = null;
  } else if (req.query.deleteFriends === 'all') {
    model = 'Address';
    query = null;
  } else {
    query = req.query.deletePlaces
  }
  console.log('query: ', query);
  db.delete(model, query, () => {
    console.log('selecting after delete');
    db.selectAll(model, null, null)
    .then(collection => {
      console.log(collection);
      res.status(202).json(collection);
    })
  });
});

module.exports = router;