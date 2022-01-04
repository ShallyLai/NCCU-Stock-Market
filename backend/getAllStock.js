// 這裡的路徑每個人可能不太一樣
// 看你接SQL的檔案在哪裡
var mysql = require('../my/mysql.js');
const { handle_request } = require('./login.js');

handle_request = ((callback) => {
    let response = { status:400};

    try{
        let query = "select price, company_name, company_id from Stock, Company where Stock.scompany_id=Company.company_id;";

        mysql.fetchData(query, function(err, result){
            if(err){
                throw(err);
            } else {
                // result: price, name, id
                var price = [];
                var name = [];
                var id = [];
                var high = [];
                var low = [];

                console.log(result);

                for (i = 0; i<result.length; i++){
                  price.push(result[i].price);
                  name.push(result[i].company_name);
                  id.push(result[i].company_id);
                }


                for (i = 0; i < result.length; i++){

                    let table_name = "History_" + result[i].company_id;
                    let query2 = "select price from" + table_name +  "where Date_=curDate();";
                    // select * from History_101 order by Date_ DESC, Time_ DESC limit 1;
                    // if query2.length >= 1, find high low

                    // not query2.length == 0, get current price
                    mysql.fetchData(query2, function(err2, result2){
                      if(err2){
                        throw(err2);
                      } else if(result2.length == 0){
                        high.push(result[i].price);
                        low.push(result[i].price);
                      } else{
                        //let maxQuery = "select max(price) from " + table_name + " where Date_=curDate();";
                        //let minQuery = "select min(price) from " + table_name + " where Date_=curDate();";
                        high.push(Math.max(...result2));
                        low.push(Math.min(...result2));
                      }
                    });

                }

                response.status = 200;
                response.price = price;
                response.name = name;
                response.id = id;
                response.high = high;
                response.low = low;

                callback(null, response);

            }
        })
    } catch(err) {
        console.log("catch error");
        callback(err, response);
    }
});

exports.handle_request = handle_request;