let mysql = require("mysql2");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'nccu_stock',
    password: 'Stock_1218',
    database: 'nccu_stock'
});
connection.connect(function (err) {
    if (err) {
        console.log('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

var pool = mysql.createPool({
    host: 'localhost',
    user: 'nccu_stock',
    password: 'Stock_1218',
    database: 'nccu_stock'
});
const promisePool = pool.promise();

const myFetch = async(sqlQuery, callback) => {
    console.log("myFetch SQL query: ", sqlQuery);
    const [rows, fields] = await promisePool.execute(sqlQuery);
    console.log("result after promisePool: ");
    console.log([rows]);
    callback(null, rows);

}


const fetchData = (sqlQuery, callback) => {
	console.log("\nSQL query: ", sqlQuery);
    connection.query(sqlQuery, (err, rows) => {
        if(err){
            console.log("error: " + err.message);
            callback(err);
        } else {
            console.log("db results:");
            console.log(rows);
            callback(err, rows);
        }
        console.log("\nconnection closed...");
    });
};

const insertData = (sqlQuery, callback) => {
	console.log("\nSQL query: ", sqlQuery);
    connection.query(sqlQuery, (err, rows) => {
        if(err){
            console.log("error: " + err.message);
            callback(err);
        } else {
            console.log("db results:");
            console.log(rows);
            callback(err, rows);
        }
        console.log("\nconnection closed...");
    });
};

const deleteData = (sqlQuery, callback) => {
	console.log("\nSQL query: ", sqlQuery);
    connection.query(sqlQuery, (err, rows) => {
        if(err){
            console.log("error: " + err.message);
        } else {
            console.log("db results:");
            console.log(rows);
            callback(err, rows);
        }
        console.log("\nconnection closed...");
    });
};

module.exports = {fetchData, insertData, deleteData};