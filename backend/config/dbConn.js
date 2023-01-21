const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI).catch(error => {
      throw new Error(error)
    }).then(result => {


    })
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB