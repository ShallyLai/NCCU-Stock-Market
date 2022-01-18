var mysql = require('../mysql/mysql.js');

let handle_request = async (group, callback) => {
  let response = { status: 400 };

  try {

    var price = [];
    var name = [];
    var id = [];
    var high = [];
    var low = [];
    var global_result;
    var length;

    let data_id = [101, 102, 103, 104, 202, 203, 204, 205, 206, 207, 208, 209, 301, 302, 303, 304, 305, 306, 307, 308, 401, 402, 403, 405, 501, 502, 504, 506, 507, 508, 509, 510, 601, 701, 702, 703];

    let query = "select price, company_name, company_id from Stock, Company where Stock.scompany_id=Company.company_id;";

    await mysql.myFetch(query, function (err, result) {
      if (err) {
        console.log(err);
        throw "get cur price error";
      } else {
        let i;
        for (i = 0; i < result.length; i++) {
          price.push(result[i][0]);
          name.push(result[i][1]);
          //id.push(result[i].company_id);
        }

      }
    });

    let subGroup = "select company_id from Company where cgroup_id = " + group.group_id + ";";
    mysql.fetchData(subGroup, function(error, fetch_subGroup_res){
      if(error){
        response.status = 400;
        console.log("fetch subGroup error");
        response.msg = "fetch subGroup error";
        callback(error, response);
      } else if(fetch_subGroup_res.length == 0){
        console.log("No Company");
        response.status = 400;
        response.msg = "No company found";
        callback(null, response);
      } else{
        console.log("Find Companies");
        response.status = 204;
      }
    });
    
    console.log("data id length:" + data_id.length);
    let i = 0;
    for (i = 0; i < data_id.length; i++) {

      let table_name = "History_" + data_id[i];
      let max_min_query = "select price from " + table_name +
        " where Date_=curDate() union select price from Stock where stock_id='" +
        data_id[i] + "';";

      await mysql.myFetch(max_min_query, async function (err, result) {
        if (err) {
          console.log(err);
          throw "get high low error";
        } else if (result.length == 0) {
          console.log("no data");
        } else {
          console.log("\n" + data_id[i]);
          console.log(result.length);

          let max = 0;
          let min = 1000;
          let j;
          for (j = 0; j < result.length; j++) {
            if (result[j][0] < min) {
              min = result[j][0];
            }
            if (result[j][0] > max) {
              max = result[j][0];
            }
            if (j == result.length - 1) {
              high.push(max);
              low.push(min);
              id.push(data_id[i]);
            }
          }

        }
      });

    }

    console.log("awaited all promises");
    response.status = 200;
    response.price = price;
    response.name = name;
    response.id = id;
    response.high = high;
    response.low = low;
    console.log("\n---callback---\n");
    callback(null, response);

  } catch (err) {
    console.log("catch error");
    console.log(err);
    callback(err, response);
  }
};

exports.handle_request = handle_request;