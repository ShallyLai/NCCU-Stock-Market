// 這裡的路徑每個人可能不太一樣
// 看你接SQL的檔案在哪裡
var mysql = require('../my/mysql.js');

handle_request = ((data, callback) => {
    let response = {
        status: 400
    };

    try {
        let checkUser = "select * from User where user_name='" + data.user_name + "';";
        mysql.fetchData(checkUser, function (err, fetch_res) {
            if (err) {
                console.log("err");
                response.status = 400;
                response.msg = 'check user_name error';
                callback(err, response);
            } else if (fetch_res.length == 0) {
                let insertUser = "insert into User (user_name, password, money) values ('" +
                    //data.user_id + "', '" +
                    data.user_name + "', '" +
                    data.password + "', '" +
                    data.money + "');";

                mysql.insertData(insertUser, function (insert_err, insert_res) {
                    if (insert_err) {
                        console.log("err");
                        response.msg = 'insert error';
                        response.status = 400;
                        callback(err, response);
                    } else if (insert_res.affectedRows == 1) {
                        response.status = 200;
                        response.msg = "signup success";
                        console.log("insert response 200");
                        callback(null, response);
                    } else {
                        response.status = 400;
                        response.msg = 'signup error';
                        console.log("insert response 201");
                        callback(null, response);
                    }
                });
            } else {
                response.status = 403;
                response.msg = 'user name already used';
                console.log("user name used");
                callback(null, response);
            }
        })
    } catch (e) {
        console.log("catch");
        callback(e, response);
    }
});

exports.handle_request = handle_request;