require('dotenv').config();

const DataBase = require('./Config/DataBase');
const express = require('express');
const cors = require('cors');
require("./Corn/dailyMembershipCheck");

// Set Up Port and Make Server listen To requests
const app = express();
const PORT = 5007;

app.use(express.json()); // Middleware to parse JSON

// Users Routes //
const UserMembership_Routes = require('./Routes/Routes');
app.use('/api/v3/user-membership', UserMembership_Routes);

// ✅ حل مشكلة CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));