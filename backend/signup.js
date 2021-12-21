// 這裡的路徑每個人可能不太一樣
// 看你接SQL的檔案在哪裡
var mysql = require('../my/mysql.js');

handle_request = ((data, callback) => {
    let response = { 
        status: 400
    };

    try {
        let insertUser = "insert into User values ('" + 
                        data.user_id + "', '" +
                        data.user_name + "', '" + 
                        data.password + "', '" + 
                        data.money + "');";
        
        mysql.insertData(insertUser, function(err, res){
            if(err){
                console.log("err");
                callback(err);
            } else if(res.affectedRows == 1) {
                response.status = 200;
                response.msg = "success";
                console.log("insert response 200");
                callback(null, response);
            } else {
                response.status = 201;
                response.msg = 'error';
                console.log("insert response 201");
                callback(null, response);
            }
        });
    } catch(e) {
        console.log("catch");
        //console.log(e);
        callback(e, response);
    }
});

exports.handle_request = handle_request;