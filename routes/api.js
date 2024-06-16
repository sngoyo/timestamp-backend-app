const express = require('express');
const router = express.Router();
const moment = require('moment');



//Getting all
router.get('/:date', (req, res) => { 
        const date = req.params.date;

        //checking if date is empty 
        if (date == ""){
            res.send({"unix": Date.now()});

            //Checking if date is in seconds convert it to return date in UTC
        } else if (!isNaN(date)) {
          const newDate = UTCDate(date);
          res.send({'unix': date, 'utc': newDate});

          //if date is date not in seconds 
        } else if(typeof date == 'string') {
            const updatedDate = new Date(date).toUTCString();
            res.send({'unix':Date.parse(date), 'utc': updatedDate});
        } else {
            res.send({'error': 'Invalid Data'})
        }

  //Checking if date is empty
  //if (date == "") {
  //  res.send({"unix": Date.now()});
 // }
    //Checking if date is not a number or 145000000000.
  
})

const UTCDate = (secondsDate) =>{
  //  const date = new Date(secondsDate * 1000);
     
  const date = new Date(secondsDate);
    
    const daysOfWeek = ["monday", "Tuesday", "wesday","Thursday", "saturday", "Fri", "sunday"];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const year = date.getFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

  const utcDateString = `${dayOfWeek}, ${day} ${month} ${year} ${hours} ${minutes} ${seconds} GMT`;
  //console.log(utcDateString);

 // const utcDateString = `${dayOfWeek} ${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} UTC`;

 
    return utcDateString;
 
}

module.exports = router;