require('./config/config');

const express = require('express');
const bodyparser = require('body-parser');
const { mongoose } = require('./db.js');
const cors = require('cors');
const passport = require('passport');


const rtsIndex = require('./routes/index.router');
require('./config/passportConfig');


let app = express();
app.use(bodyparser.json())
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(passport.initialize());
app.use('/users', rtsIndex);


app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else{
        console.log(err);
    }
});


app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));
