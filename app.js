const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//using dotenv module to access environment Variable
require('dotenv').config();


//DATABASE

const DATABASE_passwd = process.env.DATABASE_passwd;
console.log(DATABASE_passwd);
mongoose.connect(`mongodb+srv://Prodipta:${DATABASE_passwd}@clusterblog.zioz8.mongodb.net/?retryWrites=true&w=majority`,
{
    useNewUrlParser: true
},
(err)=>{
    if(err) console.log(err);
    else{
        console.log('Connection Established');
    }
});
// DATABASE

// MIDDLEWARE
//logger
app.use('*', morgan('dev'));

//to access static images  from uploads file 
app.use('/uploads', express.static('uploads'));

//parse url-encoded data
app.use('*', bodyParser.urlencoded({extended: false}));

//parse json data
app.use('*', bodyParser.json());

//set headers to avoid C-Cross O-Origin R-Resource S-Sharing error
app.use('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');//giving access control to *, i.e., any client
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Method', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//MIDDLEWARE


//ROUTES

//userRoutes
const userRoutes = require('./API/Routes/user');
app.use('/users', userRoutes);

//tagRoutes
const tagRoutes = require('./API/Routes/tag');
app.use('/tags', tagRoutes);

//blogRoutes
const blogRoutes = require('./API/Routes/blog');
app.use('/blogs', blogRoutes);

//ROUTES


// ERROR HANDLING

//error handling to set error and then pass on
app.use('*', (req, res, next) =>{
    const error = new Error('Not found');
    error.status=404;
    next(error);
});

//handles error set in previous block of code
app.use('*', (error, req, res, next) =>{
    res.status(error.status||500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// ERROR HANDLING

module.exports=app;