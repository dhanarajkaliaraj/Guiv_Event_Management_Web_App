const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const { connectMongoDB } = require('./config/db-config');
require('dotenv').config();

connectMongoDB();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users-route'));
app.use('/api/events', require('./routes/events-route'));
app.use('/api/bookings', require('./routes/bookings-route'));


app.listen(port, ()=> {
    console.log(`Node+Express server running on ${port}`);
})