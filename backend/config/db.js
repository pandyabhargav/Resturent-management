const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://pandyabhargav707:NmOrkav2WSAuVzo7@cluster0.doioi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected: " + conn.connection.host);
  } catch (error) {
    console.error("Error connecting to MONGODB : " + error);
    process.exit(1);
  }
};

module.exports = connectDB;
