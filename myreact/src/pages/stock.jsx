import { useState, useEffect } from 'react'
import React from "react";
import EnhancedTable from "./test_table";
import { CanvasJSChart } from 'canvasjs-react-charts'

const StockPage = () => {

    let my_options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2",
        title: {
        },
        axisY: {
            suffix: "%"
        },
        axisX: {
            prefix: "W",
            interval: 500
        },
        data: [{
            type: "line",
            toolTipContent: "Week {x}: {y}%",
            dataPoints: [
                { x: 500, y: 64 },
                { x: 1000, y: 61 },
                { x: 1500, y: 64 },
                { x: 2000, y: 60 }
            ]
        }]
    }

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
                console.log(response.status);
                return response.json();
            });
            setAllStocks(res)
        }
        getAllStocks()
    }, [])



    const [options, setOptions] = useState(my_options);
    const getClickId = async (id) => {
        console.log(id, "======")
        let payload = {company_id: id};
        const res = await fetch(
            'http://localhost:3000/getHistory', {
            method: "POST",
            body: JSON.stringify(payload),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }
        ).then((response) => {
            console.log(response.status);
            return response.json();
        });
        let myDataPoints = []

        let my_date_base = new Date(res.datetime[0]).getTime();
        for (var i = 0; i < res.datetime.length; i++) {
            let my_date = new Date(res.datetime[i]).getTime();
            console.log(my_date)
            // let myDataPoint = new Object();
            // myDataPoint.x = my_date;
            // myDataPoint.y = res.price[i];
            let xx = (my_date-my_date_base)/100000
            myDataPoints.push( {x: xx, y: res.price[i]} );
            //my_new_options.data[0].dataPoints.push(myDataPoint);
        }

        console.log(res)
        console.log(myDataPoints)
        setOptions( 
            {
                animationEnabled: true,
                exportEnabled: true,
                theme: "light2",
                title: {
                },
                axisY: {
                    suffix: "%"
                },
                axisX: {
                    prefix: "W",
                    interval: 500
                },
                data: [{
                    type: "line",
                    toolTipContent: "Week {x}: {y}%",
                    dataPoints: myDataPoints
                    // [
                    //     //`${myDataPoints}`
                    //     {x: 10000, y: 30},
                    //     {x: 15000, y: 20},
                    //     {x: 17281, y: 25}
                    //     // { x: 22, y: 2 },
                    //     // { x: 26, y: 100 },
                    //     // { x: 29, y: 100 }
                    // ]
                }]
            }

        )
    }


    return (
        <div>
            {console.log('render')}
            {/* <Button color='blue' text='get_stock' onClick = {getStock}/> */}
            <table>
                <tr>
                    <td>
                        <div align="center" >
                            <EnhancedTable data={allStocks} func={getClickId} />
                        </div>
                    </td>
                    <td>
                        <div align="right">
                            <CanvasJSChart options={options} />
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    );

};

export default StockPage;