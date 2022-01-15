var mysql = require('../mysql/mysql.js');

handle_request = async(data, callback) => {

  console.log("buyOrder handle request");
  console.log(data);

  let response = { status: 400 };

  try {
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
        oldprice = get_res.price;
      }
    });

    let newprice = oldprice + priceChange;
    let updatepriceQ = "update Stock set price=" + newprice + 
                        " where stock_id=" + data.stock_id + ";";
    await mysql.myFetch(updatepriceQ, function(err, update_res){
      if(err){
        console.log("update price err");
        throw err;
      } else if(update_res.length == 1){
        console.log("update price:");
      }
    })

  } catch (err) {
    console.log(err);
    callbacl(err, response);
  }
}