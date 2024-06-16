const express = require('express');
const router = express.Router();
const moment = require('moment');



//Getting all
// middleware function to parse date String
const parseDateMiddleware = (req, res, next) => {
   const dateString = req.query.date;

   try {
      const parsedDate = new Date(dateString);
      if(isNaN(parsedDate.getTime())) {
        throw new Error('Invalid Date');
      }
        req.parsedDate = parsedDate;
        next();
   } catch(error){
    res.status(400).json({ error : error.message});
   }
}

router.get('/:date', parseDateMiddleware, (req, res) => { 
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
    
*/
if (!date) {
    const currentDate = new Date();
    res.json({ unix: currentDate.getTime(), utc: currentDate.toUTCString() });
} 
// Checking if date is provided as Unix timestamp in milliseconds
else if (/^\d{13}$/g.test(date)) {
    const timestamp = parseInt(date);
    const currentDate = new Date(timestamp);
    if (!isNaN(currentDate.getTime())) {
        res.json({ unix: timestamp, utc: currentDate.toUTCString() });
    } else {
        res.json({ error: 'Invalid Date' });
    }
} 
// Checking if date is provided in YYYY-MM-DD format
else if (/^\d{4}-\d{2}-\d{2}$/g.test(date)) {
    const currentDate = new Date(date);
    if (!isNaN(currentDate.getTime())) {
        res.json({ unix: currentDate.getTime(), utc: currentDate.toUTCString() });
    } else {
        res.json({ error: 'Invalid Date' });
    }
} 
// Handle invalid date format
else {
    res.json({ error: 'Invalid Date' });
}
  
});


module.exports = router;