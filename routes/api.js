const express = require('express');
const router = express.Router();

//Getting all
router.get('/:date', (req, res, next) => { 
  const date = req.params.date;
  const UTCDate = new Date(date).toUTCString();
  
    res.send({'unix': Date.parse(date), 'utc': UTCDate});
})

module.exports = router;