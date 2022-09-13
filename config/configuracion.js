const mongoose = require('mongoose');
const config = require('config');

const uri = config.get('mongoURI');
const urlRoot = config.get('urlRoot');


const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('conectado a Mongo.');

    } catch(error) {
        console.log(error.message);
        process.exit(1);
    }
};


module.exports = {
    connectDB,
    urlRoot
};