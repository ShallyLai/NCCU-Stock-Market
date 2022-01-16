var mysql = require('../mysql/mysql.js');

handle_request = async (data, callback) => {

  console.log("buyOrder handle request");

  let response = { status: 400 };

  try {

    // check money
    let need_money = data.num * data.price;
    let moneyq = "select * from User where user_id=" + data.buser_id + " and money<=" + need_money + ";";
    await mysql.myFetch(moneyq, function (err, money_res) {
      if (err) {
        console.log("check money err");
        throw err;
      } else if (money_res.length == 1) {
        console.log("enough money");
      } else {
        console.log("no money");
        response.status = 201;
        response.msg = "no money";
        callback(null, response);
        throw 'stop';
      }
    })

    // add to buyOrder table
    let insertq = "insert into BuyOrder (stock_id, num, price, time, buser_id) values (" +
      data.stock_id + ", " +
      data.num + ", " +
      data.price + ", curTime(), " +
      data.buser_id + ");";

    await mysql.myFetch(insertq, function (err, insert_res) {
      if (err) {
        console.log("insert err");
        throw err;
      } else if (insert_res.affectedRows == 1) {
        console.log("buy order inserted");
      }
    });

    let orderID = 0;
    let getorderid = "select order_id from BuyOrder order by time desc limit 1;";
    await mysql.myFetch(getorderid, function (err, getid_res) {
      if (err) {
        console.log("get order id err");
        throw err;
      } else if (getid_res.length == 1) {
        console.log("get id");
        console.log(getid_res);
        orderID = Object.values(getid_res[0]);
        //orderID = getid_res[0][0];
        console.log("orderID " + orderID);
      }
    });

    // 漲價
    let priceChange = Math.floor(data.num / 10) + 1;
    let oldprice = 0;

    let getprice = "select price from Stock where stock_id=" + data.stock_id + ";";
    await mysql.myFetch(getprice, function (err, get_res) {
      if (err) {
        console.log("get price err");
        throw err;
      } else if (get_res.length == 1) {
        console.log("get price:");
        console.log(get_res);
        console.log(get_res[0]);
        oldprice = Object.values(get_res[0]);
        console.log("oldprice: " + oldprice);
      }
    });

    console.log("oldprice:" + oldprice);
    console.log("priceChange:" + priceChange);
    let newprice = Number(oldprice) + Number(priceChange);
    console.log("newprice:" + newprice);
    let updatepriceQ = "update Stock set price=" + newprice +
      " where stock_id=" + data.stock_id + ";";
    await mysql.myFetch(updatepriceQ, function (err, update_res) {
      if (err) {
        console.log("update price err");
        throw err;
      } else if (update_res.affectedRows == 1) {
        console.log("update price:");
      }
    });

    let matcharr = [];
    // match buy and sell order
    let matchq = "select SellOrder.order_id, SellOrder.num, SellOrder.suser_id from BuyOrder, SellOrder, Stock where BuyOrder.order_id=" +
      orderID + " and SellOrder.stock_id=BuyOrder.stock_id and Stock.stock_id=BuyOrder.stock_id and " +
      "BuyOrder.num != 0 and SellOrder.num != 0 and " +
      "SellOrder.price <= Stock.price and Stock.price <= BuyOrder.price " +
      "order by SellOrder.time;";
    await mysql.myFetch(matchq, function (err, match_res) {
      if (err) {
        console.log("match err");
        throw err;
      } else if (match_res.length >= 1) {
        console.log("matched");
        console.log(match_res);
        matcharr = match_res;
      } else {
        console.log("no match");
        response.msg = "no match";
        response.status = 404;
        console.log('callback');
        callback(null, response);
        throw 'stop';
      }
    });

    // match[][0]: id
    // match[][1]: num
    // match[][2]: suser_id
    console.log("match arr");
    console.log(matcharr);
    console.log(matcharr.length);

    let curBuyNum = data.num;
    const mymap = matcharr.map(async (element, index) => {
      console.log("element: " + Object.values(element));
      let arr_element = Object.values(element);
      console.log(arr_element);
      console.log(arr_element[0]);
      console.log(arr_element[1]);
      console.log(arr_element[2]);
      console.log("index: " + index);

      let min = Math.min(data.num, arr_element[1]);
      console.log("min: " + min);

      // 更新掛單數量
      let updateSellOrderNum = "update SellOrder set num=(" + arr_element[1] + "-" + min + ") where order_id=" + arr_element[0];
      await mysql.myFetch(updateSellOrderNum, function (err, updateSellNum_res) {
        if (err) {
          console.log("update sell order num error");
          throw err;
        } else if (updateSellNum_res.affectedRows == 1) {
          console.log("updated");
        } else {
          console.log("asdfl;");
        }
      });

      let updateBuyOrderNum = "update BuyOrder set num=(" + curBuyNum + "-" + min + ") where order_id=" + arr_element[0];
      await mysql.myFetch(updateBuyOrderNum, function (err, updateBuyNum_res) {
        if (err) {
          console.log("update buy order num error");
          throw err;
        } else if (updateBuyNum_res.affectedRows == 1) {
          console.log("updated");
        } else {
          console.log("asdfl;");
        }
      });
      curBuyNum = curBuyNum - min;

      // 更新交易紀錄
      trans_id = orderID + data.stock_id + arr_element[0];
      console.log("trans_id: " + trans_id);
      let transact = "insert into MyTransaction (transaction_id, tbuy_order_id, tsell_order_id, finish_time, tstock_id, num, price) values (" +
        trans_id + ", " + orderID + ", " + arr_element[0] + ", curTime(), " + data.stock_id + ", " + min + ", " + newprice + ");";

      await mysql.myFetch(transact, function (err, tran_res) {
        if (err) {
          console.log("transaction error");
          throw err;
        } else if (tran_res.affectedRows == 1) {
          console.log("transaction inserted");
        } else {
          console.log("transaction insertion error");
        }
      });

      // 更新買方持有數量
      let buy_own_now = 0;
      let get_own = "select num from Own where Ouser_id=" + data.buser_id + " and Ostock_id=" + data.stock_id + ";";
      await mysql.myFetch(get_own, function (err, get_num_res) {
        if (err) {
          console.log("get num error");
          throw err;
        } else if (get_num_res.length == 1) {
          console.log("num:" + Object.values(get_num_res[0]));
          buy_own_now = Object.values(get_num_res[0]);
        } else if (get_num_res.length == 0) {
          console.log("num 0");
        }
      })
      let buy_own = "update Own set num=(" + buy_own_now + "+" + min + ") where Ouser_id=" + data.buser_id + " and Ostock_id=" + data.stock_id + ";";
      await mysql.myFetch(buy_own, function (err, buy_own_res) {
        if (err) {
          console.log("buy own error");
          throw err;
        } else if (buy_own_res.affectedRows == 1) {
          console.log("updated");
        } else if (get_own_res.length == 0) {
          console.log("not updated");
        }
      });
      // 更新買方持有的錢
      let cashflow = min * newprice;
      let buy_money = 0;
      let get_buy_money = "select money from User where user_id=" + data.buser_id + ";";
      await mysql.myFetch(get_buy_money, function (err, getBuyMoney_res) {
        if (err) {
          throw err;
        } else if (getBuyMoney_res.length == 1) {
          console.log(Object.values(getBuyMoney_res[0]));
          buy_money = Object.values(getBuyMoney_res[0]);
        }
      });
      let cfc_buy = "update User set money=(" + buy_money + "-" + cashflow + ") where user_id=" + data.buser_id + ";";
      await mysql.myFetch(cfc_buy, function (err, cfc_buy_res) {
        if (err) {
          throw err;
        } else if (cfc_buy_res.affectedRows == 1) {
          console.log("update buy money");
        }
      });


      // 更新賣方持有數量
      let sell_own_now = 0;
      let get_sell_own = "select num from Own where Ouser_id=" + arr_element[2] + " and Ostock_id=" + data.stock_id + ";";
      await mysql.myFetch(get_sell_own, function (err, get_sell_num_res) {
        if (err) {
          console.log("get num error");
          throw err;
        } else if (get_sell_num_res.length == 1) {
          console.log("sell num:" + Object.values(get_sell_num_res[0]));
          sell_own_now = Object.values(get_sell_num_res[0]);
        } else if (get_sell_num_res.length == 0) {
          console.log("num 0");
        }
      })
      let sell_own = "update Own set num=(" + sell_own_now + "-" + min + ") where Ouser_id=" + arr_element[2] + " and Ostock_id=" + data.stock_id + ";";
      await mysql.myFetch(sell_own, function (err, sell_own_res) {
        if (err) {
          console.log("sell own error");
          throw err;
        } else if (sell_own_res.affectedRows == 1) {
          console.log("updated");
        } else if (sell_own_res.length == 0) {
          console.log("not updated");
        }
      });

      // 更新賣方持有的錢
      let sell_money = 0;
      let get_sell_money = "select money from User where user_id=" + arr_element[2] + ";";
      await mysql.myFetch(get_sell_money, function (err, getSellMoney_res) {
        if (err) {
          throw err;
        } else if (getSellMoney_res.length == 1) {
          console.log(Object.values(getSellMoney_res[0]));
          sell_money = Object.values(getSellMoney_res[0]);
        }
      });
      let cfc_sell = "update User set money=(" + sell_money + "+" + cashflow + ") where user_id=" + arr_element[2] + ";";
      await mysql.myFetch(cfc_sell, function (err, cfc_sell_res) {
        if (err) {
          throw err;
        } else if (cfc_sell_res.affectedRows == 1) {
          console.log("update sell money");
        }
      });

      if (curBuyNum == 0) {
        response.status = 200;
        response.msg = 'cur buy num is 0';
        callback(null, response);
        throw 'stop';
      }


    })

  } catch (err) {
    if (err == 'stop') {
      console.log("catch stop");
    } else {
      console.log(err);
      callback(err, response);
    }

  }
}

exports.handle_request = handle_request;