require('dotenv').config();
let dataStore = require('./lib/dataStore.js');

dataStore.subscribe((data) => {
    console.log(data);
})