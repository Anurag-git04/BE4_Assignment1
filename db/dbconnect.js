const mongoose = require('mongoose');
require('dotenv').config(); 

const mongoUri = process.env.MONGODB;
console.log(mongoUri)

// console.log('MongoDB URI:', mongoUri); 

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
