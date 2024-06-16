const express = require('express');
const router = express.Router();
const moment = require('moment');


//middleware to handle date parsing 
const middlewareDateParser = (req, res, next) => {
    const { date } = req.params;
    
    //Checking if date is empty
    if (!date){
        req.parsedDate = new Date();

    //Checking if date is provided as unix timestamp in milliseconds
    } else if(/^\d{13}$/g.test(date)){
       const unixTimestamp = parseInt(date);
       req.parsedDate = new Date(unixTimestamp);

       //Checking if date is provided in YYYY-MM-DD format      
    } else if((/^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[01])$/g.test(date))){
        req.parsedDate = new Date(date);

     //Handling invalid Date
    } else {
        return res.status(400).json({ error: 'Invalid Date' });
    }

    //Checking if the date parsed is valid
    if (isNaN(req.parsedDate.getTime())) {
        return res.status(400).json({ error: 'Invalid Date'});
    }

    next();

}


//Route Handle to  respond with parsed Date
router.get('/:date?', middlewareDateParser, (req, res) => {
    const { parsedDate } = req;

    res.json({ unix: parsedDate.getTime(), utc: parsedDate.toUTCString() })
});



/*

router.get('/:date?', parseDateMiddleware, (req, res) => { 
        const date = req.params.date;

        //checking if date is empty 
       // if (/^\s*$/.test(date)){
 /*      if(!req.params.date && typeof date !== "string"){
            const date = new Date(Date.now()).toUTCString();
            res.send({ unix: Date.now(), utc: date});

            //Checking  if date is in seconds convert it to return date in UTC
        } else if (/^\d{13}$/g.test(date )) {
            const newtime = parseInt(date);
            const newDate = new Date(newtime).toUTCString()
            res.send({ unix: newtime, utc: newDate});

          //if date is date not in seconds 
        } else if(/^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[01])$/g.test(date)) {
            const updatedDate = new Date(date).toUTCString();
            res.send({ unix: Date.parse(date), utc: updatedDate});
  
        } else {
            res.send({ 'error': 'Invalid Date'})
      }
     
});

*/
module.exports = router;