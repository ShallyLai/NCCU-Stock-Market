var mysql = require('../mysql/mysql.js');

handle_request = (async(data, callback) => {
  let response = {status: 400};
  
  try{
		var stock_name = []; 
		var BuyOrSell = [];
		var TransactionPrice = [];
		var num = [];
		var TransactionTime = [];

  	let get_Buy_trans = "select company_name, MyTransaction.price, MyTransaction.num, finish_time from User, BuyOrder, MyTransaction, Company " + 
  	"where " + data.user_id + " = user_id AND "+ "user_id = buser_id AND order_id = tbuy_order_id AND tstock_id = company_id;";
			let get_Sell_trans = "select company_name, MyTransaction.price, MyTransaction.num, finish_time from User, SellOrder, MyTransaction, Company " + 
  	"where " + data.user_id + " = user_id AND "+ "user_id = suser_id AND order_id = tsell_order_id AND tstock_id = company_id;";

    await mysql.myFetch(get_Buy_trans, function(err, result){
	  	if(err){
  			console.log("error");
  			throw(err);
  		} else {
  			console.log("Buy Transaction Get ");
  			for(a=0;a<result.length;a++){
  				stock_name.push(result[a][0]);
  				BuyOrSell.push("TRUE");
  				TransactionPrice.push(result[a][1]);
  				num.push(result[a][2]);
  				TransactionTime.push((result[a][3]));
  			}
  		}	

  	});
  	await mysql.myFetch(get_Sell_trans, function(err, result){
	  	if(err){
  			console.log("error");
  			throw(err);
  		} else {
  			console.log("Sell Transaction Get ");
  			for(a=0;a<result.length;a++){
  				stock_name.push(result[a][0]);
  				BuyOrSell.push("FALSE");
  				TransactionPrice.push(result[a][1]);
  				num.push(result[a][2]);
  				TransactionTime.push(result[a][3]);
  			}
  		}	

  	});
		if(TransactionPrice.length == 0){
			response.msg = 'no transaction';
			response.status = 204;
		} else {
			response.msg = "get transaction";
			response.status = 200;
		}
  	response.stock_name = stock_name;
  	response.BuyOrSell = BuyOrSell;
  	response.TransactionPrice = TransactionPrice;
  	response.num = num;
  	response.TransactionTime = TransactionTime;

		console.log("callback response");
		console.log(response);

  	callback(null, response);
  } catch(err){
  	console.log("catch");
  	response.status = 400;
  	response.msg = "catch error";
  	console.log (err);
  	callback(err, response);
  }
    
 });

exports.handle_request = handle_request;