var mysql = require('../mysql/mysql.js');

handle_request = ((data, callback) => {
  let response = {status: 400};

  try {
    // 註冊就送一萬元
    let checkUser = "select * from User where user_name='" + data.user_name + "';";
    mysql.fetchData(checkUser, function (err, fetch_res) {
      if (err) {
        console.log("err");
        response.status = 400;
        response.msg = 'check user_name error';
        callback(err, response);
      } else if (fetch_res.length == 0) {
        let insertUser = "insert into User (user_name, password, money) values ('" +
          data.user_name + "', '" + data.password + "', 10000);";        

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
    response.status = 400;
    response.msg = "catch error";
    callback(e, response);
  }
});

exports.handle_request = handle_request;