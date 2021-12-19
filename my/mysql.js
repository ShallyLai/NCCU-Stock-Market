let mysql = require("mysql2");

var connection = mysql.createConnection({
    host    : 'localhost',
	user	: 'nccu_stock',
	password: 'Stock_1218',
    database: 'nccu_stock'
});

connection.connect(function(err){
    if(err){
        console.log('error connecting: ' + err.stack);
        return;
    }
    
    console.log('connected as id ' + connection.threadId);
});