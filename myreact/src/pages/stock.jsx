import { useState, useEffect } from 'react'
import React from "react";
//import Button from './component/Button';
import EnhancedTable from "./test_table";
import { CanvasJSChart } from 'canvasjs-react-charts'

let options = {
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
        interval: 2
    },
    data: [{
        type: "line",
        toolTipContent: "Week {x}: {y}%",
        dataPoints: [
            { x: 1, y: 64 },
            { x: 2, y: 61 },
            { x: 3, y: 64 },
            { x: 16, y: 60 }
        ]
    }]
}

const StockPage = () => {
    const [allStocks, setAllStocks] = useState([]);
    useEffect(() => {
        const getAllStocks = async () => {
            const allStocksFromServer = await fetchAllStocks()
            setAllStocks(allStocksFromServer)
        }
        getAllStocks()
    }, [])

    //Fetch All Stocks
    const fetchAllStocks = async () => {
        const res = await fetch('http://localhost:3000/getAllStock')
        const data = await res.json()
        console.log(data)
        return data
    }

    return (
        <div>
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

const getClickId = async (id) =>{
    console.log(id, "======")
    let payload = {
        company_id : id
    }
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
    console.log(res)
    for( var i =0; i< res.date.length; i++){
        let my_date = new Date(res.date[i]).getTime()
        console.log(my_date)
    }
    
    //console.log(my_date)
    //console.log(my_date.getFullYear())

    console.log(options.data[0].dataPoints[0].x)
    console.log(options.data[0].dataPoints[0].y)
    console.log(options.data[0].dataPoints)

    //let data = 
}

export default StockPage;