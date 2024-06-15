const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({optionsSuccessStatus: 200}));

app.use(express.json());

const timestampRouter = require('./routes/timestamp');
app.use('/timestamp', timestampRouter);


app.listen(3000, () => console.log('Server Started'));

