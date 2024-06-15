const express = require('express');
const router = express.Router();

//Getting all
router.get('/', (req, res, next) => { 
   req.time = Date.now().toString();
   req.timeUTC = new Date().toUTCString()
   next();
}, (req, res) => {
    res.send({'unix': req.time, 'utc': req.timeUTC});
})

module.exports = router;