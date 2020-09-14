const mongoose = require('mongoose');

// * Import environment variables from our variables.env file
require('dotenv').config({path: 'variables.env'});

// * Connect to our Database and handle on bad connections
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.Promise = global.Promise; // * Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
    console.error(`🚫 Onoes! sumfin went wrong, mista rabbit: ${err.message}`);
})

// * Import all models
require('./models/Inventory');

// * Start our app
const app = require('./app');
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});