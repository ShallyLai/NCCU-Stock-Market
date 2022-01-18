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
let HighLow = require('./getHighLow.js');
let myOrder = require('./getMyOrder.js');
let getHistory = require("./getHistory.js");
let myTrans = require('./getMyTransaction.js');
let buyOrder = require('./buyOrder.js');
let sellOrder = require("./sellOrder.js");
let reset = require('./reset.js');
let getMoney = require('./getMoney.js');
let storeValue = require('./storeValue.js');
let getMyStock = require('./getMyStock.js');

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

app.get('/getAllHighLow', function(req, res){
    console.log("\nget all high low");
    
    let data = [101, 102, 103, 104, 202, 203, 204, 205, 206, 207, 208, 209, 301, 302, 303, 304, 305, 306, 307, 308, 401, 402, 403, 405, 501, 502, 504, 506, 507, 508, 509, 510, 601, 701, 702, 703];
    
    HighLow.handle_request(data, function(err, result){
        if(err){
            console.log("get all high low error\n");
            res.send(result).status(result.status);
        } else {
            res.send(result).status(result.status);
        }
    });
});

app.get('/getMyOrder', function(req, res){
    var user_id = req.query.user_id;
    console.log("getmyorder user:" + user_id);

    myOrder.handle_request(user_id, function(err, result){
        if(err){
            console.log("get my order error");
            res.send(result).status(result.status);
        } else {
            res.send(result).status(result.status);
        }
    });
});

app.post("/GetMyTransaction", function(req, res){
  console.log("get my transaction");
    console.log("req.body");
    console.log(req.body);
    myTrans.handle_request(req.body, function(err, result){
        if(err){
            console.log("get my transaction handle_request error");
            res.send(result).status(result.status);
        } else {
            res.send(result).status(result.status);
        }
    });
})

app.get('/getHistory', function(req, res){
    var company_id = req.query.company_id;
    console.log('getHistory');
    console.log('company_id:');
    console.log(company_id);
    getHistory.handle_request(company_id, function(err, result){
        if(err){
            console.log("getHistory handle_request error");
            res.send(result).status(result.status);
        } else {
            res.send(result).status(result.status);
        }
    });
});

app.get('/getMyStock', function(req, res){
    var user_id = req.query.user_id;
    console.log('getMyStock');
    console.log('user_id:');
    console.log(user_id);
    getMyStock.handle_request(user_id, function(err, result){
        if(err){
            console.log("getMyStock handle_requet error");
            res.send(result).status(result.status);
        } else{
            res.send(result).status(result.status);
        }
    });
});

app.get('/getMoney', function(req,res){
    console.log('get Money');
    console.log('req.body:');
    console.log(req.body);
    getMoney.handle_request(req.body, function(err, result){
        if(err){
            console.log("getMoney handle_request error");
            res.send(result).status(result.status);
        } else {  
            console.log("result");
            console.log(result);
            res.send(result).status(result.status);
        }
    });
});

app.post('/buyOrder', function(req, res){
    console.log("post buy order");
    console.log("req.body:");
    console.log(req.body);

    buyOrder.handle_request(req.body, function(err, result){
        if(err){
            console.log("buyOrder handle_request error");
            res.send(result).status(result.status);
        } else {
            console.log("result");
            console.log(result);
            res.send(result).status(result.status);
        }
    });
});

app.post('/sellOrder', function(req, res){
    console.log("post sell order");
    console.log("req.body:");
    console.log(req.body);

    sellOrder.handle_request(req.body, function(err, result){
        if(err){
            console.log("sellOrder handle_request error");
            res.send(result).status(result.status);
        } else {
            console.log("result");
            console.log(result);
            res.send(result).status(result.status);
        }
    });
});

app.post("/storeValue", function(req,res){
  console.log("post store value");
  console.log("req.body");
  console.log(req.body);
  storeValue.handle_request(req.body.user_id, function(err,result){
    if(err){
      console.log("storeValue handle_request error");
      res.send(result).status(result.status);
    } else{
        console.log("result");
        console.log(result);
        res.send(result).status(result.status);
    }
  });
});

app.post("/delete",function(req,res){
    console.log('post login');
    console.log('req.body:');
    
});

var server = app.listen(3000, function() {
    console.log('Listening on port 3000');
    setTimeout(() => reset.handle_request(null, function(err, result){
        if(err){
            console.log("reset handle request error");
        } else {
            console.log("reset");
            console.log("result:" + result);
        }
    }), 2000);
    // reset.handle_request(null, function(err, result){
    //     if(err){
    //         console.log("reset handle request error");
    //     } else {
    //         console.log("reset");
    //         console.log("result:" + result);
    //     }
    // })
});
