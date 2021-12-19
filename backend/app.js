var express = require('express');
var bodyParser = require('body-parser');
let cp = require('cookie-parser');
let cors = require("cors");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cp());
app.use(cors());

app.get('/test', function(req, res){
    console.log("test success");
    res.send("test success");
});

var server = app.listen(3000, function() {
    console.log('Listening on port 3000');
});