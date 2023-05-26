const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const hostname = '127.0.0.1';
const port = 5000;
mongoose.connect("mongodb://localhost:27017/recipeHub");

app.use(cors())
app.use(express.urlencoded({extended: true}));

// Routes :-
app.use('/api/auth', require('./routes/auth'));

app.listen(port, ()=>{
    console.log(`Server started successfully at http://${hostname}:${port}`);
});