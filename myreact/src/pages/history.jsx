import React from "react";
import { useState, useEffect } from 'react'
import HistoryTable from "./component/HistoryTable";
import Header from './component/Header';
import UserInfo from "./component/UserInfo";
import Tabs from "./component/Tabs";

const HistoryPage = () => {

    const user_name = sessionStorage.getItem("user_name")
    const user_id = sessionStorage.getItem("user_id")
    const [user_money, setUserMoney] = useState(0);
    const [trans_history, setHistory] = useState([]);
    const [order_history, setOrderHistory] = useState([]);


    useEffect(() => {
        const getMoney = async () => {
            const userMoney = await fetchMoney(user_id);
            console.log("userMoney: " + userMoney);
            setUserMoney(userMoney);
        }
        getMoney()
    }, [])

    useEffect(() => {
        const getHistory = async () => {
            const userHistory_dct = await fetchHistory(user_id);
            let trans_history = [];
            for (var i = 0; i < userHistory_dct['BuyOrSell'].length; i++) {
                trans_history.push({
                    "BuyOrSell": "",
                    "TransactionPrice": userHistory_dct['TransactionPrice'][i],
                    "TransactionTime": userHistory_dct['TransactionTime'][i].substr(0, 10)
                        + " " + userHistory_dct['TransactionTime'][i].substr(11, 5),
                    "num": userHistory_dct['num'][i],
                    "stock_name": userHistory_dct['stock_name'][i],
                });
                if (userHistory_dct['BuyOrSell'][i] === "TRUE") {
                    trans_history[i]['BuyOrSell'] = "買";
                }
                else {
                    trans_history[i]['BuyOrSell'] = "賣";
                }
            }
            console.log(trans_history);
            setHistory(trans_history);
        }
        getHistory()
    }, [])

    useEffect(() => {
        const getOrder = async () => {
            const userHistory_dct = await fetchOrder(user_id);

            let order_history = [];
            for (let i = 0; i < userHistory_dct['buy_num'].length; i++) {
                order_history.push({
                    "BuyOrSell": "買",
                    "TransactionPrice": userHistory_dct['buy_price'][i],
                    "TransactionTime": userHistory_dct['buy_time'][i].substr(0, 10)
                        + " " + userHistory_dct['buy_time'][i].substr(11, 5),
                    "num": userHistory_dct['buy_num'][i],
                    "stock_name": userHistory_dct['buy_stock_id'][i],
                });
            }
            for (let i = 0; i < userHistory_dct['sell_num'].length; i++) {
                order_history.push({
                    "BuyOrSell": "賣",
                    "TransactionPrice": userHistory_dct['sell_price'][i],
                    "TransactionTime": userHistory_dct['sell_time'][i].substr(0, 10)
                        + " " + userHistory_dct['sell_time'][i].substr(11, 5),
                    "num": userHistory_dct['sell_num'][i],
                    "stock_name": userHistory_dct['sell_stock_id'][i],
                });
            }
            console.log(order_history);
            setOrderHistory(order_history);
        }
        getOrder()
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
            console.log("response status: " + response.status);
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
    const fetchHistory = async (id) => {
        let row = [];
        let data = {
            user_id: id,
        };
        const res2 = await fetch(
            'http://localhost:3000/getMyTransaction', {
            method: "POST",
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }
        ).then((response) => {
            console.log("response status: " + response.status);
            return response.json();
        }).then((response_json) => {
            if (response_json.msg === 'catch error') {
                alert('無法取得歷史資料');
                return;
            }
            else if (response_json.msg === 'get transaction') {
                console.log('取得交易紀錄');
                row = response_json;
                //   console.log(row);
                return row;
            } else if (response_json.msg === 'no transaction') {
                alert('沒有交易紀錄');
            }
        });
        return res2;
    }
    const fetchOrder = async (id) => {
        let row = [];
        let data = {
            user_id: id,
        };
        const res3 = await fetch(
            'http://localhost:3000/getMyOrder', {
            method: "POST",
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }
        ).then((response) => {
            console.log("response status: " + response.status);
            return response.json();
        }).then((response_json) => {
            if (response_json.msg === 'catch error') {
                alert('無法取得掛單資料');
                return;
            }
            else if (response_json.msg === 'get order') {
                console.log('取得掛單紀錄');
                row = response_json;
                console.log(row);
                return row;
            } else if (response_json.msg === 'no order') {
                alert('沒有掛單紀錄');
            }
        });
        return res3;
    }

    return (
        <div className="container">
            <Header title='歷史紀錄' />
            <UserInfo
                user_name={user_name}
                user_id={user_id}
                user_money={user_money}
                store_value={store_Value} />
            <Tabs dataT={trans_history} dataO={order_history} />
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
        console.log(response.status);
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


export default HistoryPage;