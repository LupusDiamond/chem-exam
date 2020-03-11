/// Core App File

// Packages
const express = require("express");

const e_app = express();


// exam page
e_app.get('/', function (req, res) {
    res.sendFile( __dirname + '/public/exampage.html')
  })




e_app.listen(3000, () => console.log("Server up and running!"));
