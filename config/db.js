const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://Twain:1234@nodetuts.08tzqrn.mongodb.net/religion_centreDb?retryWrites=true&w=majority&appName=religion_centre');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

module.exports = connectDB;
