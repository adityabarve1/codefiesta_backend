const express = require('express');
const app =express();
const bodyParser = require ('body-parser');
const cookieParser = require('cookie-parser');

require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware
app.use(bodyParser.json());
app.use(cookieParser());
require("./config/database").connect()

const gameRoutes = require('./routes/game');
app.use('/api/',gameRoutes);

app.listen(PORT, () =>{
    console.log('Server is running at port ${PORT}');
});


app.get("/",(req,res) => {
    res.send("<h1>Code Fiesta</h1>")
})


