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

let signup = require('./signup.js');
let login = require('./login.js');
let allStock = require('./getALLStock.js');

app.get('/', function(req, res){
    console.log("connected to port 3000");
    res.send("connected to port 3000");
    //res.sendfile('./views/index.html');
});
app.get('/test', function(req, res){
    console.log("test success");
    res.send("test success");
});

app.post('/signup', function(req, res){
    console.log('post signup');
    console.log('req.body:');
    console.log(req.body);
    signup.handle_request(req.body, function(err, result){
        if(err){
            console.log("signup handle_request error");
            res.send(result).status(result.status);
        } else {
            res.send(result).status(result.status);
        }
    });
});

app.post('/login', function(req, res){
    console.log('post login');
    console.log('req.body:');
    console.log(req.body);
    login.handle_request(req.body, function(err, result){
        if(err){
            console.log("login handle_request error");
            res.send(result).status(result.status);
        } else {
            res.send(result).status(result.status);
        }
    });
})

app.get('/GetALLStock', function(req, res){
    console.log("get all stocks");
    console.log("req.body");
    console.log(req.body);
    allStock.handle_request(req.body, function(err, result){
        if(err){
            console.log("get all Stock handle_request error");
            res.send(result).status(result.status);
        } else {
            res.send(result).status(result.status);
        }
    });
})

app.post("/delete",function(req,res){
    console.log('post login');
    console.log('req.body:');
    
});

var server = app.listen(3000, function() {
    console.log('Listening on port 3000');
});