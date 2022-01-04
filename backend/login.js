// 這裡的路徑每個人可能不太一樣
// 看你接SQL的檔案在哪裡
var mysql = require('../mysql/mysql.js');

handle_request = ((data, callback) => {
    let response = { 
        status: 400
    };

    try {
        let checkUser = "select * from User where user_name='" + 
                        data.user_name + "';";
        mysql.fetchData(checkUser, function (err, fetch_res) {
            if (err) {
                console.log("err");
                response.status = 400;
                response.msg = 'fetch error';
                callback(err, response);
            } else if (fetch_res.length == 0){
                console.log("no user");
                response.status = 204;
                response.msg = "no user found";
                callback(null, response);
            } else if (fetch_res.length == 1){
                if (fetch_res[0].password == data.password){
                    console.log("found user");
                    response.status = 200;
                    response.msg = "found user";
                    response.user_id = fetch_res[0].user_id;
                    callback(null, response);
                }
                else{
                    console.log("password error");
                    response.status = 204;
                    response.msg = "password error";
                    callback(null, response);
                }
                
            }
        });
    } catch(e) {
        console.log("catch");
        response.status = 400;
        response.msg = 'catch error';
        callback(e, response);
    }
});

exports.handle_request = handle_request;