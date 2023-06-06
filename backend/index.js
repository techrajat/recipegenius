const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const hostname = '127.0.0.1';
const port = 5000;
mongoose.connect("mongodb://localhost:27017/recipeMasters");

app.use(cors())
app.use((express.json()));

// Routes :-
app.use('/api/auth', require('./routes/auth'));
app.use('/api/recipe', require('./routes/recipe'));

app.listen(port, ()=>{
    console.log(`Server started successfully at http://${hostname}:${port}`);
});