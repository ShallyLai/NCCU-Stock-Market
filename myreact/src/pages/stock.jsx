import { useState, useEffect } from 'react'
import React from "react";
import Header from './component/Header';
import EnhancedTable from "./test_table";
import { CanvasJSChart } from 'canvasjs-react-charts'
import Trade from './component/Trade';
import SelectGroup from "./component/SelectGroup";
import TabStocks from "./component/TabStocks";
import Box from '@mui/material/Box';
import UserInfo from "./component/UserInfo";
import Stack from '@mui/material/Stack';



const StockPage = () => {
    if (!sessionStorage.getItem("user_name")) {
        alert('您尚未登入！');
        window.location.href = "./";
    }
    const user_name = sessionStorage.getItem("user_name");
    const user_id = sessionStorage.getItem("user_id");

    const [selected_data, setSelectedData] = useState({});
    //Filter
    const apply = async (data) => {
        console.log('套用 check box');
        //  console.log(data);

        let group_in_set = [];

        data['g100'] && (group_in_set.push(100));
        data['g102'] && (group_in_set.push(102));
        data['g200'] && (group_in_set.push(200));
        data['g203'] && (group_in_set.push(203));
        data['g300'] && (group_in_set.push(300));
        data['g400'] && (group_in_set.push(400));
        data['g500'] && (group_in_set.push(500));
        data['g600'] && (group_in_set.push(600));
        data['g700'] && (group_in_set.push(700));
        data['g703'] && (group_in_set.push(703));

        //let group_set_str = "['"+group_in_set.join('\',\'')+"']";
        let group_set_str = "[" + group_in_set.toString() + "]";
        console.log(group_set_str);
        console.log(typeof (group_set_str));

        let payload = { group_id: group_set_str };
        const res = await fetch(
            'http://localhost:3000/getAllStock', {
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
        console.log(res);
        setAllStocks(res);
        setMyStocks(res)

    }

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

    //Fetch My Stocks
    const [myStocks, setMyStocks] = useState([]);
    useEffect(() => {
        const getMyStocks = async () => {
            let payload = {
                user_id: user_id
            }
            const res = await fetch(
                'http://localhost:3000/getMyStock', {
                method: "POST",
                body: JSON.stringify(payload),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then((response) => {
                //console.log(response.status);
                return response.json();
            });
            setMyStocks(res)
            //console.log(res.name)
            setSelectedData({ name: res.name[0], price: res.price[0], id: res.id[0], high: res.high[0], low: res.low[0] })
        }
        getMyStocks()
    }, [])

    const [user_money, setUserMoney] = useState(0);
    useEffect(() => {
        const getMoney = async () => {
            const userMoney = await fetchMoney(user_id);
            setUserMoney(userMoney);
        }
        getMoney()
    }, [])
    const fetchMoney = async (id) => {
        let user_money;
        let data = {
            user_id: id,
        }
        const res = await fetch(
            'http://localhost:3000/getMoney', {
            method: "POST",
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }
        ).then((response) => {
            //    console.log("response status: " + response.status);
            return response.json();
        }).then((response_json) => {
            if (response_json.msg === 'get money error') {
                alert('無法取得存款');
                return;
            }
            else if (response_json.msg === 'get money') {
                console.log('取得存款');
                user_money = response_json.money;
                return user_money;
            }
        });
        return res;
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
                //console.log(response.status);
                return response.json();
            });
            setAllStocks(res)
            //  console.log(res.name)
            setSelectedData({ name: res.name[0], price: res.price[0], id: res.id[0], high: res.high[0], low: res.low[0] })
        }
        getAllStocks()
    }, [])

    //Handle Transaction

    const sellStocks = async (num, price, stock_id) => {
        console.log(stock_id)
        console.log(num, price)
        let payload = { num: num, price: price, suser_id: user_id, stock_id: stock_id };
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
        console.log(res.status)
        if (res.status === 404) {
            alert("掛單成功");
        }
        else if (res.status === 201) {
            alert("販賣股數超過持有股數，請重新掛單");
        }
        else if (res.status === 200) {
            alert("掛單成功")
        }
        else {
            alert("??")
        }
    }

    const buyStocks = async (num, price, stock_id) => {
        console.log(stock_id)
        console.log(num, price)
        let payload = { num: num, price: price, buser_id: user_id, stock_id: stock_id };
        const res = await fetch(
            'http://localhost:3000/buyOrder', {
            method: "POST",
            body: JSON.stringify(payload),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((response) => {
            //console.log(response.status);
            return response.json();
        });
        console.log(res.status)
        if (res.status === 404) {
            alert("掛單成功");
        }
        else if (res.status === 201) {
            alert("餘額不足");
        }
        else if (res.status === 200) {
            alert("掛單成功")
        }
        else {
            alert("??")
        }
    }

    //Handle Click
    const getClickId = async (data) => {
        //console.log(data.id, "======")
        //console.log(data.name)

        setSelectedData(data)
        console.log(data);
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
    const getMyStockClickId = async (data) => {
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
        console.log(res);
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


        <div className="container" >
            <Header title='當前股市' />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    bgcolor: 'background.paper',
                    overflow: 'hidden',
                    borderRadius: '12px',
                    boxShadow: 1,
                    fontWeight: 'bold',
                    margin: '5px',
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                >
                    <Box>
                        <UserInfo
                            user_name={user_name}
                            user_id={user_id}
                            user_money={user_money}
                            store_value={store_Value} />

                        <SelectGroup apply={apply} />
                    </Box>
                    <Box >
                        <TabStocks data1={allStocks} func1={getClickId} data2={myStocks} func2={getMyStockClickId} />
                        {/* <EnhancedTable data={allStocks} func={getClickId} /> */}
                    </Box>
                    <Box sx={{
                        width: 500,
                        backgroundColor: '#f4f9fd',
                        padding: '30px 20px 10px',
                        margin: '10px',
                        borderRadius: '12px',
                        boxShadow: 1,
                    }}>
                        <CanvasJSChart options={options} />
                        <Trade data={selected_data} funcs={sellStocks} funcb={buyStocks} />
                    </Box>
                </Stack>
            </Box>
        </div>
    );

};

const store_Value = async (id) => {
    let data = {
        user_id: id,
    }
    const res = await fetch(
        'http://localhost:3000/storeValue', {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }
    ).then((response) => {
        //   console.log(response.status);
        return response.json();
    }).then((response_json) => {
        if (response_json.msg === 'money error') {
            console.log('儲值失敗');
            return;
        }
        else if (response_json.msg === 'store successsful') {
            alert('儲值成功！\n增加 500 元。');
            return
        }
    });
    window.location.reload();
    return;
}

export default StockPage;

