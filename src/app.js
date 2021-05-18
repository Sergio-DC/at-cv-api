const express = require("express");
const {startDBConnection} = require('./config/mongoConfig');
require('dotenv').config();
const app = express();
const cvController = require('./controller/cvController');

app.use(cvController);

module.exports = app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`);   
    startDBConnection();
});