let mysql = require("mysql2");

//每個人的mysql都不一樣，這邊要記得改
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nccuroot',
    database: 'nccu_stock'
});
connection.connect(function (err) {
    if (err) {
        console.log('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

//還有這邊也是，不要忘了改
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'nccuroot',
    database: 'nccu_stock',
    rowsAsArray: true
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

module.exports = {fetchData, insertData, deleteData, myFetch};