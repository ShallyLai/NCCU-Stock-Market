var mysql = require('../mysql/mysql.js');

handle_request = ((data, callback) => {
    let response = {
        status: 400
    };

    try{
        var date=[];
        var time=[];
        var price=[];
        var dateandtime = [];
        
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

                    let fetchTime = fetch_res[i].Time_.split(':');
                    let fetchDate = fetch_res[i].Date_;
                    let myTime = fetchDate.getFullYear() + "-" + 
                    ((fetchDate.getMonth() + 1 >= 10) ? (fetchDate.getMonth() + 1) : ('0' + (fetchDate.getMonth() + 1).toString())) + "-" + 
                    (fetchDate.getDate() >= 10 ? fetchDate.getDate() : ('0' + fetchDate.getDate().toString())) + " " + 
                                    fetchTime[0] + ":" + fetchTime[1] + ":" + fetchTime[2];
                    
                    console.log("mytime " + myTime);
                    let timeObject = new Date(myTime);
                    console.log("timeobject: " + timeObject);
                    console.log(timeObject.getTime());

                    dateandtime.push(myTime);
                    price.push(fetch_res[i].price);
                }
                response.datetime = dateandtime;
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