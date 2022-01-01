// 這裡的路徑每個人可能不太一樣
// 看你接SQL的檔案在哪裡
var mysql = require('../my/mysql.js');

handle_request = ((callback) => {
    let response = { status:400};

    try{
        let query = "select price, company_name, company_id from Stock, Company where Stock.scompany_id=Company.company_id;";

        mysql.fetchData(query, function(err, result){
            if(err){
                throw(err);
            } else {
                

                for (i = 0; i < result.length; i++){

                    let table_name = "History_" + result[i].company_id;
                    let query2 = "select * from" + table_name +  "where Date_=curDate();";
                    // select * from History_101 order by Date_ DESC, Time_ DESC limit 1;
                    // if query2.length >= 1, find high low

                    // not query2.length == 0, get current price
                }
                

            }
        })
    } catch(err) {
        console.log("catch error");
    }
})