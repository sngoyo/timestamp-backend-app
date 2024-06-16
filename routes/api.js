const express = require('express');
const router = express.Router();


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
     
    //Checking if date can be successfully parsed by new Date(date_string)
     //And Handling invalid Date
    } else {
        const parsedDate = new Date(date)
        if(!isNaN(parsedDate.getTime())){
            req.parsedDate = parsedDate;
        } else {
        return res.status(400).json({ error: 'Invalid Date' });
       }
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

module.exports = router;