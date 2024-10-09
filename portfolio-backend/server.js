const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const projectRoutes = require('./routes/projectRoutes');


// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize the app
const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Use project routes
app.use('/api/projects', projectRoutes);


app.get('/', (req, res) => {
  res.send('Portfolio Backend API');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
