const e = require("express");
const mongoose = require("mongoose");
const mongoUri =
  "mongodb+srv://aaron215:a0928299300@aarondb.qkt85tc.mongodb.net?retryWrites=true&w=majority";

const connectMongo = async (dbname) => {
  try {
    await mongoose.connect(mongoUri, {
      dbName: dbname,
    });
    return `MongoDB connected to ${dbname} database`;
  } catch (error) {
    throw error;
  }
};

const closeMongo = async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed");
};

module.exports = { connectMongo, closeMongo };
