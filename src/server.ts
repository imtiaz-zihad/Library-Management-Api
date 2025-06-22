import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
require("dotenv").config();

let server: Server;
const port = 5000;

async function main() {
  try {
   
    
    await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.x6gil.mongodb.net/library-management-app?retryWrites=true&w=majority&appName=Cluster0`);
    console.log('Connected to MongoDB successfully');

    server = app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log('MongoDB connection error:', error);
  }
}

main();
