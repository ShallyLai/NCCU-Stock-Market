import { useState, useEffect } from 'react'
import React from "react";
import EnhancedTable from "./test_table";
import { CanvasJSChart } from 'canvasjs-react-charts'


const StockPage = () => {

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
                console.log(response.status);
                return response.json();
            });
            let myDataPoints = []
            console.log(res);
            for (var i = 0; i < res.datetime.length; i++) {
                let my_date = new Date(res.datetime[i])
                console.log(my_date)
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
                console.log(response.status);
                return response.json();
            });
            setAllStocks(res)
        }
        getAllStocks()
    }, [])

    const getClickId = async (id) => {
        console.log(id, "======")
        //Fetch History by id
        let payload = { company_id: id };
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
        console.log(res);
        for (var i = 0; i < res.datetime.length; i++) {
            let my_date = new Date(res.datetime[i])
            console.log(my_date)
            myDataPoints.push({ x: my_date, y: res.price[i] });
        }

        console.log(res)
        console.log(myDataPoints)
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