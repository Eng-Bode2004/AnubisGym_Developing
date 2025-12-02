// Connect To DataBase
require('./Config/DataBase');
const express = require('express');

const cors = require('cors');
// Set Up Port and Make Server listen To requests
const app = express();
const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
app.use(express.json()); // Middleware to parse JSON

// ✅ حل مشكلة CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Main Routes
//  Image Routes //
ImagesRoutes = require('./Routes/ImagesRoutes');
app.use('/api/v3/images',ImagesRoutes);
