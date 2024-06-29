const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./Routes/auth');  // Ensure this path is correct

const app = express();

app.use(cors());
app.use(express.json());
    
// Use routes
app.use('/auth', authRoutes);

// Serve static files from the uploads directory

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/rentfurni')
    .then(() => {
        app.listen(5000, () => {
            console.log('Server is running on port 5000');
        });
    })
    .catch(err => console.log(err));
