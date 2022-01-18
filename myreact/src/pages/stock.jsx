import { useState, useEffect } from 'react'
import React from "react";
import Button from './component/Button';
import EnhancedTable from "./test_table";

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
            <h3>StockPage</h3>
            {/* <Button color='blue' text='get_stock' onClick = {getStock}/> */}
            <EnhancedTable data={allStocks}/>
        </div>
    );
};

// const getStock = async () => {
//     const res = await fetch(
//       'http://localhost:3000/getAllStock', {
//       method: "GET",
//       headers: new Headers({
//         'Content-Type': 'application/json'
//       })
//     }
//     ).then((response) => {
//       console.log(response.status);
//       return response.json();
//     }).then((response_json) => {
//         console.log(response_json.name[0]);
//     });
// }



export default StockPage;