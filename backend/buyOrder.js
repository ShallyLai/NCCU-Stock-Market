var mysql = require('../mysql/mysql.js');

handle_request = async(data, callback) => {

  console.log("buyOrder handle request");

  let response = { status: 400 };

  try {

    // check money
    let need_money = data.num * data.price;
    let moneyq = "select * from User where user_id=" + data.buser_id + " and money<=" + need_money + ";";
    await mysql.myFetch(moneyq, function(err, money_res){
      if(err){
        console.log("check money err");
        throw err;
      } else if(money_res.length == 1){
        console.log("enough money");
      }
    })

    // add to buyOrder table
    let insertq = "insert into BuyOrder (stock_id, num, price, time, buser_id) values (" +
      data.stock_id + ", " +
      data.num + ", " +
      data.price + ", curTime(), " +
      data.buser_id + ");";

    await mysql.myFetch(insertq, function(err, insert_res){
      if(err){
        console.log("insert err");
        throw err;
      } else if(insert_res.affectedRows == 1){
        console.log("buy order inserted");
      }
    });

    let orderID = 0;
    let getorderid = "select order_id from BuyOrder order by time desc limit 1;";
    await mysql.myFetch(getorderid, function(err, getid_res){
      if(err){
        console.log("get order id err");
        throw err;
      } else if(getid_res.length == 1){
        console.log("get id");
        console.log(getid_res);
        orderID = getid_res[0][0];
      }
    });

    // 漲價
    let priceChange = Math.floor(data.num/10) + 1;
    let oldprice = 0;

    let getprice = "select price from Stock where stock_id=" + data.stock_id + ";";
    await mysql.myFetch(getprice, function(err, get_res){
      if(err){
        console.log("get price err");
        throw err;
      } else if(get_res.length == 1){
        console.log("get price:");
        console.log(get_res);
        console.log(get_res[0]);
        console.log(get_res[0][0]);
        oldprice = get_res[0][0];
      }
    });

    console.log("oldprice:" + oldprice);
    console.log("priceChange:" + priceChange);
    let newprice = oldprice + priceChange;
    let updatepriceQ = "update Stock set price=" + newprice + 
                        " where stock_id=" + data.stock_id + ";";
    await mysql.myFetch(updatepriceQ, function(err, update_res){
      if(err){
        console.log("update price err");
        throw err;
      } else if(update_res.affectedRows == 1){
        console.log("update price:");
      }
    });

    let matcharr = [];
    // match buy and sell order
    let matchq = "select SellOrder.order_id, SellOrder.num from BuyOrder, SellOrder, Stock where BuyOrder.order_id=" + 
                  orderID + " and SellOrder.stock_id=BuyOrder.stock_id and Stock.stock_id=BuyOrder.stock_id and " + 
                  "BuyOrder.num != 0 and SellOrder.num != 0 and " + 
                  "SellOrder.price <= Stock.price and Stock.price <= BuyOrder.price " + 
                  "order by SellOrder.time;";
    await mysql.myFetch(matchq, function(err, match_res){
      if(err){
        console.log("match err");
        throw err;
      } else if(match_res.length >= 1){
        console.log("matched");
        console.log(match_res);
        matcharr = match_res;
      } else {
        console.log("no match");
        response.msg = "no match";
        response.status = 404;
        callback(null, response);
      }
    });

    // match[][0]: id
    // match[][1]: num
    console.log("match arr");
    console.log(matcharr);
    console.log(matcharr.length);

    let curBuyNum = data.num;
    const mymap = matcharr.map(async(element, index) => {
      console.log("element: " + element);
      console.log(element[0]);
      console.log(element[1]);
      console.log("index: " + index);

      let min = Math.min(data.num, element[1]);
      console.log("min" + min);

      let updateSellOrderNum = "update SellOrder set num=(" + element[1] + "-" + min + ") where order_id=" + element[0];
      await mysql.myFetch(updateSellOrderNum, function(err, updateSellNum_res){
        if(err){
          console.log("update sell order num error");
          throw err;
        } else if(updateSellNum_res.affectedRows == 1){
          console.log("updated");
        } else{
          console.log("asdfl;");
        }
      });

      let updateBuyOrderNum = "update BuyOrder set num=(" + curBuyNum + "-" + min + ") where order_id=" + element[0];
      await mysql.myFetch(updateBuyOrderNum, function(err, updateBuyNum_res){
        if(err){
          console.log("update buy order num error");
          throw err;
        } else if(updateBuyNum_res.affectedRows == 1){
          console.log("updated");
        } else{
          console.log("asdfl;");
        }
      });
      curBuyNum = curBuyNum - min;

      let transact = "insert into MyTransaction (tbuy_order_id, tsell_order_id, finish_time, tstock_id, num, price) values (" + 
                      orderID + ", " + element[0] + ", curTime(), " + data.stock_id + ", " + min + ", " + newprice + ");";

      await mysql.myFetch(transact, function(err, tran_res){
        if(err){
          console.log("transaction error");
          throw err;
        } else if (tran_res.affectedRows == 1){
          console.log("transaction inserted");
        } else {
          console.log("transaction insertion error");
        }
      });

      if(curBuyNum == 0){
        response.status = 200;
        response
      }


    })

  } catch (err) {
    console.log(err);
    callback(err, response);
  }
}

exports.handle_request = handle_request;