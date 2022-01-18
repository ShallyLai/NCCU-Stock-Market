var mysql = require('../mysql/mysql.js');

let handle_request = async (data, callback) => {
  let response = { status: 400 };

  try{
    let money  = "select money from User where user_id = " + data + ";";
    mysql.fetchData(money, function(error, fetch_money){
      if(error){
        console.log(error);
        response.status = 400;
        response.msg = "get money error";
        callback(error, response);
      } else if(fetch_money.length == 0){
        console.log("get money error");
        response.status = 204;
        response.msg = "get money error";
        callback(null, response);
      } else if(fetch_money.length == 1){
        console.log("get money");
        response.status = 200;
        response.msg = "get money";
        response.money = fetch_money[0].money;
        callback(null, response);
      }

    });

  }catch(error){
    console.log("error");
    response.status = 400;
    response.msg = 'catch error';
    callback(error, response);
  }
}

exports.handle_request = handle_request;