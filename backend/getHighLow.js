// 這裡的路徑每個人可能不太一樣
// 看你接SQL的檔案在哪裡
var mysql = require('../mysql/mysql.js');

let handle_request = async (data, callback) => {

  let response = { status: 400 };
  // assume data is company_id
  console.log(data);
  var id = [];
  var high = [];
  var low = [];

  try {
    const high_low = data.map(async (element, index) => {
      console.log("index:", index);
      console.log("element:", element);

      let table_name = "History_" + element;
      let max_min_query = "select price from " + table_name +
                          " where Date_=curDate() union select price from Stock where stock_id='" +
                          element + "';";

      await mysql.myFetch(max_min_query, async function (err, result) {
        if (err) {
          console.log(err);
          throw "get high low error";
        } else if (result.length == 0) {
          console.log("no data");
        } else {
          console.log(result.length);

          console.log("result[]");
          console.log(result[0].price);
          
          if(result[1]) console.log(result[1].price);
          
          let max = 0;
          let min = 1000;
          let i;
          for(i = 0; i < result.length; i++){
            if(result[i].price < min){
              min = result[i].price;
            }
            if(result[i].price > max){
              max = result[i].price;
            }

          }
          high.push(max);
          low.push(min);
          id.push(element);
          return '1';
        }
      });
    });
    await Promise.all(high_low).then((num) => {
        console.log("num: ", num)
        console.log("awaited all promises");
        response.status = 200;
        response.id = id;
        response.high = high;
        response.low = low;
        console.log("\n---callback---\n");
        callback(null, response);

      
    });

  } catch (error) {
    console.log("catch error");
    console.log(error);
    callback(error, response);
  }

}

exports.handle_request = handle_request;