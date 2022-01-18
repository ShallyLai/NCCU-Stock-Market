var mysql = require('../mysql/mysql.js');

let handle_request = async (data, callback) => {
  let response = { status: 400 };

  try {

    var price = [];
    var name = [];
    var id = [];
    var high = [];
    var low = [];
    var length;

    let query = "select price, company_name, company_id from Stock, Company where Stock.scompany_id=Company.company_id;";

    mysql.fetchData(query, function (err, result) {
      if (err) {
        console.log(err);
        throw "get cur price error";
      } else {
        length = result.length;
        for (i = 0; i < result.length; i++) {
          price.push(result[i].price);
          name.push(result[i].company_name);
          id.push(result[i].company_id);
        }

      }
    });

    let data_id = [101, 102, 103, 104, 202, 203, 204, 205, 206, 207, 208, 209, 301, 302, 303, 304, 305, 306, 307, 308, 401, 402, 403, 405, 501, 502, 504, 506, 507, 508, 509, 510, 601, 701, 702, 703];

    const high_low = data_id.map(async (element, index) => {
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
          console.log("\n" + element);
          console.log(result.length);

          let max = 0;
          let min = 1000;
          let i;
          for (i = 0; i < result.length; i++) {
            if (result[i][0] < min) {
              min = result[i][0];
            }
            if (result[i][0] > max) {
              max = result[i][0];
            }
            if (i == result.length - 1) {
              high.push(max);
              low.push(min);
              id.push(element);
            }
          }

          return '1';
        }
      });

      return '2';
    });
    await Promise.all(high_low).then((num) => {
      console.log("num: ", num)
      console.log("awaited all promises");
      response.status = 200;
      response.price = price;
      response.name = name;
      response.id = id;
      response.high = high;
      response.low = low;
      console.log("\n---callback---\n");
      callback(null, response);

    });

    console.log(response);


  } catch (err) {
    console.log("catch error");
    console.log(err);
    callback(err, response);
  }
};

exports.handle_request = handle_request;