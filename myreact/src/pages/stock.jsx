import { useState, useEffect } from 'react'
import React from "react";
import Header from './component/Header';
import EnhancedTable from "./test_table";
import { CanvasJSChart } from 'canvasjs-react-charts'
import Trade from './component/Trade';
import SelectGroup from "./component/SelectGroup";


const StockPage = () => {
    if (!sessionStorage.getItem("user_name")) {
        alert('您尚未登入！');
        window.location.href="./";
    }
    const user_name = sessionStorage.getItem("user_name");
    const user_id = sessionStorage.getItem("user_id");

    //Fetch first History
    const [options, setOptions] = useState([]);
    useEffect(() => {
        const getOptions = async () => {
            let payload = { company_id: 101 };
            const res = await fetch(
                'http://localhost:3000/getHistory', {
                method: "POST",
                body: JSON.stringify(payload),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then((response) => {
                //console.log(response.status);
                return response.json();
            });
            let myDataPoints = []
            //console.log(res);
            for (var i = 0; i < res.datetime.length; i++) {
                let my_date = new Date(res.datetime[i])
                //console.log(my_date)
                myDataPoints.push({ x: my_date, y: res.price[i] });
            }
            setOptions(
                {
                    theme: "light2",
                    title: {
                    },
                    subtitles: [{
                        text: "股價走勢圖"
                    }],
                    axisX: {
                        crosshair: {
                            enabled: true,
                            snapToDataPoint: true
                        },
                        valueFormatString: "YYYY/MM/DD "
                    },
                    axisY: {

                        prefix: "$"
                    },
                    data: [{
                        type: "spline",
                        xValueFormatString: "YYYY/MM/DD h:mm:ss",
                        toolTipContent: " {x}: ${y}",
                        dataPoints: myDataPoints
                    }]
                }
            );
        }
        getOptions();
    }, [])

    //Fetch All Stocks
    const [allStocks, setAllStocks] = useState([]);
    useEffect(() => {
        const getAllStocks = async () => {
            let payload = {
                group_id: "[000]"
            }
            const res = await fetch(
                'http://localhost:3000/getAllStock', {
                method: "POST",
                body: JSON.stringify(payload),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then((response) => {
                //console.log(response.status);
                return response.json();
            });
            setAllStocks(res)
        }
        getAllStocks()
    }, [])

    //Handle Transaction
    const [selected_data, setSelectedData] = useState({});
    const sellStocks = async (num, price, stock_id)=>{
        console.log(stock_id)
        console.log(num, price)
        let payload = { num:num, price:price, suser_id:user_id, stock_id:stock_id};
        const res = await fetch(
            'http://localhost:3000/sellOrder', {
            method: "POST",
            body: JSON.stringify(payload),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((response) => {
            //console.log(response.status);
            return response.json();
        });
        console.log(res)
    }


    //Handle Click
    const getClickId = async (data) => {
        //console.log(data.id, "======")
        //console.log(data.name)
       
        setSelectedData(data)
        //Fetch History by id
        let payload = { company_id: data.id };
        const res = await fetch(
            'http://localhost:3000/getHistory', {
            method: "POST",
            body: JSON.stringify(payload),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }
        ).then((response) => {
            //console.log(response.status);
            return response.json();
        });
        let myDataPoints = []
        //console.log(res);
        for (var i = 0; i < res.datetime.length; i++) {
            let my_date = new Date(res.datetime[i])
            //console.log(my_date)
            myDataPoints.push({ x: my_date, y: res.price[i] });
        }

        //console.log(res)
        //console.log(myDataPoints)
        setOptions(
            {
                theme: "light2",
                title: {
                },
                subtitles: [{
                    text: "股價走勢圖"
                }],
                axisX: {
                    crosshair: {
                        enabled: true,
                        snapToDataPoint: true
                    },
                    valueFormatString: "YYYY/MM/DD "
                },
                axisY: {

                    prefix: "$"
                },
                data: [{
                    type: "spline",
                    xValueFormatString: "YYYY/MM/DD h:mm:ss",
                    toolTipContent: " {x}: ${y}",
                    dataPoints: myDataPoints
                }]
            }
        )
    }

    

    return (
        <div className="container">
            <Header title='當前股市' />
             <SelectGroup apply={apply} />
            <EnhancedTable data={allStocks} func={getClickId} />
            <CanvasJSChart options={options} />
            <Trade data={selected_data} func={sellStocks}/>

        </div>
    );

};

const apply = async (data) => {
    console.log('套用 check box');
  //  console.log(data);
    
  let group_in_set = [];

    data['g100']&&(group_in_set.push('100'));
    data['g102']&&(group_in_set.push('102'));
    data['g200']&&(group_in_set.push('200'));
    data['g203']&&(group_in_set.push('203'));
    data['g300']&&(group_in_set.push('300'));
    data['g400']&&(group_in_set.push('400'));
    data['g500']&&(group_in_set.push('500'));
    data['g600']&&(group_in_set.push('600'));
    data['g700']&&(group_in_set.push('700'));
    data['g703']&&(group_in_set.push('703'));

    let group_set_str = "['"+group_in_set.join('\',\'')+"']";
    console.log(group_set_str);

}

export default StockPage;