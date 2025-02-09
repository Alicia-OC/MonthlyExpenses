const mongoose = require("mongoose");
require("dotenv").config();
process.env.DATABASE_MONGODB_URI;

const dbname = "Monthly-expenses";
const uri = process.env.DATABASE_MONGODB_URI;

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri);
   
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
  }
}

module.exports = run;
