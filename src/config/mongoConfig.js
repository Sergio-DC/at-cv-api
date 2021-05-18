const mongoose = require('mongoose');

const startDBConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, (err) => {
        if(err)
            console.log("Database conection error", err)
        else
            console.log("Successful connection with mongodb");
    });
};

module.exports = {
    startDBConnection
};