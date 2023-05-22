const express = require('express');
// const path = require('path');
const app = express();
const cors = require('cors')

const hostname = '127.0.0.1';
const port = 5000;

app.use(cors())
app.use(express.urlencoded({extended: true}));

app.listen(port, ()=>{
    console.log(`Server started successfully at http://${hostname}:${port}`);
});