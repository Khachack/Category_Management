// Import mongoose
const mongoose = require('mongoose');

// Define the connection string
const connectionString = 'mongodb+srv://baleashvar:HelloWorld2023@cluster0.pyzuboy.mongodb.net/';

// Connect to MongoDB
mongoose.connect(connectionString, {
  dbName:"Ecommerce",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the connection object
const db = mongoose.connection;

// Handle connection events
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
