var mysql = require('../mysql/mysql.js');

let handle_request = ((data, callback) => {
    let response = { status: 400 };

    try{

        var stock_name = [];
        var stock_num = [];
        var cur_price = [];
        // var buy_price = [];
        // var income = [];
        // var ROI = [];

        let MyStockQuery = "select company_name, Own.num, Stock.price from Stock, Company, Own" + 
        " where Stock.stock_id=Company.company_id and Ostock_id=Stock.stock_id and Ouser_id=" + data.user_id + ";";

        mysql.fetchData(MyStockQuery, function(err, fetch_my_stock){
            if(err){
                console.log("err");
                response.status = 400;
                response.msg = "fetch my stock error";
                callback(err, response);
            }
            else if(fetch_my_stock.length == 0){
                console.log("no stock");
                response.status = 204;
                response.msg = "no stock found";
                callback(null, response);
            }
            else{
                console.log("find my stock");
                response.status = 204;
                for(var i=0;i<fetch_my_stock.length;i++){
                    stock_name.push(fetch_my_stock[i].company_name);
                    stock_num.push(fetch_my_stock[i].num);
                    cur_price.push(fetch_my_stock[i].price);
                }
                response.stock_name = stock_name;
                response.stock_num = stock_num;
                response.cur_price = cur_price;

                callback(null, response);
            }
        });


    } catch(e){
        console.log("catch");
        response.status = 400;
        response.msg = "catch error";
        callback(e, response);
    }
});

exports.handle_request = handle_request;