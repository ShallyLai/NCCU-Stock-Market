var mysql = require('../mysql/mysql.js');

handle_request = ((data, callback) => {
    let response = {
        status: 400
    };

    try{
        var date=[];
        var time=[];
        var price=[];
        
        let getHistory = "select * from History_" + data.company_id + ";";
        mysql.fetchData(getHistory, function(err, fetch_res) {
            if (err) {
                console.log("err");
                response.status = 400;
                response.msg = 'fetch error';
                callback(err, response);
            }
            else if(fetch_res.length==0){
                console.log("no history");
                response.status = 204;
                response.msg = "no history found";
                callback(null, response);
            }
            else{
                console.log(data.company_id + "'s history")
                response.status = 204;
                let i;
                for(i=0; i<fetch_res.length; i++){
                    // console.log(fetchTime.getFullYear());
                    // console.log(fetchTime.getMonth() + 1);
                    // console.log(fetchTime.getDate());

                    date.push(fetchTime[i].Date_);
                    time.push(fetch_res[i].Time_);
                    price.push(fetch_res[i].price);
                }
                response.date = date;
                response.time = time;
                response.price = price;

                callback(null, response)
            }
        });

    } catch(e) {
        console.log("catch");
        response.status = 400;
        response.msg = 'catch error';
        callback(e, response);
    }

});

exports.handle_request = handle_request;