const express = require('express');
const bodyParser = require('body-parser');

// configure app
const app = express();

// import the places-routes file
const placeRoutes = require('./routes/places-routes');

// use the imported file for the endpoint
app.use('/api/places' , placeRoutes);


app.listen(5000);

