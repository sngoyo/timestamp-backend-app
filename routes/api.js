const express = require('express');
const router = express.Router();
const moment = require('moment');



//Getting all
router.get('/:date', (req, res) => { 
        const date = req.params.date;

        //checking if date is empty 
       // if (/^\s*$/.test(date)){
        if(!req.params.date){
            const date = new Date(Date.now()).toUTCString();
            res.send({ unix: Date.now(), utc: date});

            //Checking  if date is in seconds convert it to return date in UTC
        } else if (/^\d{13}$/g.test(date )) {
            const newtime = parseInt(date);
            const newDate = new Date(newtime).toUTCString()
            res.send({ unix: newtime, utc: newDate});

          //if date is date not in seconds 
        } else if(/^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[01])$/g.test(date) | date == "string") {
            const updatedDate = new Date(date).toUTCString();
            res.send({ unix: Date.parse(date), utc: updatedDate});

        } else if (req.params.date){
               // Try to parse the date string into a Date object
              const date = new Date(req.params.date);

              // Convert Unix timestamp to UTC date string
             const utcDate = date.toUTCString();

             // Send JSON response
            res.send({ unix: date, utc: utcDate });
        
        } else {
            res.send({ 'error': 'Invalid Date'})
      }
    

  
});


module.exports = router;