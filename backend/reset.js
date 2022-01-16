var mysql = require('../mysql/mysql.js');

handle_request = async(data, callback) => {
  let response = { status: 400 };

  try {
    let delete_buyOrder = "delete from BuyOrder where order_id not in (select tbuy_order_id from MyTransaction) and Date(time)<curDate();";
    let delete_sellOrder = "delete from SellOrder where order_id not in (select tsell_order_id from MyTransaction) and Date(time)<curDate();";
    let get_trans_id = "select tbuy_order_id, tsell_order_id from MyTransaction;";
    await mysql.myFetch(delete_buyOrder, function (err, delete_buy_res) {
      if (err) {
        console.log("delete buy order err");
        throw err;
      } else {
        console.log(delete_buy_res);
      }
    });
    await mysql.myFetch(delete_sellOrder, function (err, delete_sell_res) {
      if (err) {
        console.log("delete sell order err");
        throw err;
      } else {
        console.log(delete_sell_res);
        response.status = 200;
        callback(null, response);
      }
    });
  } catch (err) {
    console.log("catch err");
    console.log(err);
    callback(err, response);
  }

}

exports.handle_request = handle_request;