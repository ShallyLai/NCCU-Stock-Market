var mysql = require('../mysql/mysql.js');

let handle_request = async (data, callback) => {
  let response = { status: 400 };
  try{
    let addMoney = "update User set money = (money + 500) where user_id = " + data + ";";
    mysql.fetchData(addMoney, function(error, res_money_res){
      if(error){
        console.log("store value error");
        throw error;
        callback(error, response);
      } else if(res_money_res.affectedRows == 0){
        console.log("money error");
        response.status = 400;
        response.msg = 'money error';
        callback(null, response);
      } else if(res_money_res.affectedRows == 1){
        console.log("store successsful");
        response.status = 200;
        response.msg = "store successsful";
        callback(null, response);
      }
    });
  }
  catch(error){
    console.log("error");
    response.status = 400;
    response.msg = 'catch error';
    callback(error, response);
  }
}

exports.handle_request = handle_request;