const express = require('express');
//const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true, useCreateIndex: true
})

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('connection established successfully!');
})

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
