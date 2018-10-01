const express = require('express');
const router = express.Router();
const google = require('../google/geocode');

router.get('/', (req, res) => {
});

router.post('/', (req, res) => {
  console.log('posting address');
  console.log('body: ', req.body);
  google(req.body.address);
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