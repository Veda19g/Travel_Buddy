const mongoose=require('mongoose');
require('dotenv').config();
const mongoUrl=process.env.MONGO_URI;


mongoose.connect(mongoUrl);

const db=mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;