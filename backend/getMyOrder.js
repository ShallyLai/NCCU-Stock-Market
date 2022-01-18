var mysql = require('../mysql/mysql.js');

let handle_request = async (user, callback) => {
  let response = { status: 400 };
  console.log("handle request user:" + user.user_id);
  var buy_order_id = [];
  var buy_stock_id = [];
  var buy_num = [];
  var buy_price = [];
  var buy_time = [];

  var sell_order_id = [];
  var sell_stock_id = [];
  var sell_num = [];
  var sell_price = [];
  var sell_time = [];

  try {
    let buyQuery = "select * from BuyOrder where buser_id='" + user.user_id + "' and Date(time)=curDate();";
    await mysql.myFetch(buyQuery, function (err, result) {
      if (err) {
        console.log(err);
        throw "select buy order error";
      } else {
        for(i = 0; i < result.length; i++){
          buy_order_id.push(result[i][0]);
          buy_stock_id.push(result[i][1]);
          buy_num.push(result[i][2]);
          buy_price.push(result[i][3]);
          buy_time.push(result[i][4]);
        }
      }
    });

    let sellQuery = "select * from SellOrder where suser_id='" + user.user_id + "' and Date(time)=curDate();";
    await mysql.myFetch(sellQuery, function (err, result) {
      if (err) {
        console.log(err);
        throw "select sell order error";
      } else {
        for(i = 0; i < result.length; i++){
          sell_order_id.push(result[i][0]);
          sell_stock_id.push(result[i][1]);
          sell_num.push(result[i][2]);
          sell_price.push(result[i][3]);
          sell_time.push(result[i][4]);
        }
      }
    });
    
    response.status = 200;

    response.buy_order_id = buy_order_id;
    response.buy_stock_id = buy_stock_id;
    response.buy_num = buy_num;
    response.buy_price = buy_time;
    response.buy_time = buy_time;
    response.sell_order_id = sell_order_id;
    response.sell_stock_id = sell_stock_id;
    response.sell_num = sell_num;
    response.sell_price = sell_price;
    response.sell_time = sell_time;
    
    console.log("\n---callback---\n");
    callback(null, response);

  } catch (error) {
    console.log("catch error");
    console.log(error);
    callback(error, response);
  }


}

exports.handle_request = handle_request;