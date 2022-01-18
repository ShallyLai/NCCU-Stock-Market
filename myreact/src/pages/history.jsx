import React from "react";
import { useState, useEffect } from 'react'
import MyHistory from "./component/MyHistory";
import UserInfo from "./component/UserInfo";



const HistoryPage = () => {

    const user_name = sessionStorage.getItem("user_name")
    const user_id = sessionStorage.getItem("user_id")
    const [user_money, setUserMoney] = useState(0);
    const [user_history, setHistory] = useState("");

    // useEffect(() => {
    //     const getMoney = async () => {
    //         const userMoney = await fetchMoney(user_id)
    //         //    console.log(userMoney)
    //         setUserMoney(userMoney)
    //     }
    //     getMoney()
    // })
    useEffect(() => {
        const getHistory = async () => {
            console.log(user_id)
            const userHistory = await fetchHistory(user_id)
               
            setHistory(userHistory)
            console.log(userHistory)
        }
        getHistory()
    })
    //////////////////////////////////////////////
    // const fetchMoney = async (id) => {
    //     let user_money;
    //     let data = {
    //         user_id: id,
    //     }
    //     const res = await fetch(
    //         'http://localhost:3000/getMoney', {
    //         method: "POST",
    //         body: JSON.stringify(data),
    //         headers: new Headers({
    //             'Content-Type': 'application/json'
    //         })
    //     }
    //     ).then((response) => {
    //         console.log(response.status);
    //         return response.json();
    //     }).then((response_json) => {
    //         if (response_json.msg === 'get money error') {
    //             alert('無法取得存款');
    //             return;
    //         }
    //         else if (response_json.msg === 'get money') {
    //             // alert('取得存款');
    //             user_money = response_json.money;
    //             return user_money;
    //         }
    //     });
    //     return res;
    // }
    const fetchHistory = async (id) => {
        let row =[];
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
            console.log(response.status);
            return response.json();
        }).then((response_json) => {
            if (response_json.msg === 'catch error') {
                alert('無法取得歷史資料');
                return;
            }
            else if (response_json.msg === 'get transaction') {
               // alert('取得存款');
                row = response_json.stock_name;
                console.log(response_json);
                return row;
            }
        });
        return res2;
    }
    //////////////////////////////////////////
    return (
        <div className="container">
            <UserInfo
                user_name={user_name}
                user_id={user_id}
                user_money={user_money}
                store_value={store_Value} />
            
        </div>
    );
};
//  <MyHistory            data={user_history} />
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
    //  console.log(res);
    window.location.reload();
    return;
}


export default HistoryPage;