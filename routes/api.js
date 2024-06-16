const express = require('express');
const router = express.Router();
const moment = require('moment');



//Getting all
router.get('/:date', (req, res) => { 
        const date = req.params.date;

        //checking if date is empty 
        if (/^\s*$/.test(date) && date == ""){
            const date = new Date(Date.now()).toUTCString();
            res.send({unix: Date.now()});
            res.send({utc: date});

            //Checking if date is in seconds convert it to return date in UTC
        } else if (/^\d{13}$/g.test(date )) {
            const newtime = parseInt(date);
            const newDate = new Date(newtime).toUTCString()
            res.send({unix: date, utc: newDate});

          //if date is date not in seconds 
        } else if(/^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[01])$/g.test(date) | date == "string") {
            const updatedDate = new Date(date).toUTCString();
            res.send({unix:Date.parse(date), utc: updatedDate});
        
        } else {
            res.send({'error': 'Invalid Date'})
        }
    

  
});


module.exports = router;