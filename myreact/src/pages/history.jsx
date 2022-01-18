import React from "react";
import { useState, useEffect } from 'react'
import MyHistory from "./component/MyHistory";
import UserInfo from "./component/UserInfo";

const HistoryPage = () => {

    const user_name = sessionStorage.getItem("user_name")
    const user_id = sessionStorage.getItem("user_id")
    const [user_money, setUserMoney] = useState(0);

    useEffect(() => {
        const getMoney = async () => {
            const userMoney = await fetchMoney(user_id)
            //    console.log(userMoney)
            setUserMoney(userMoney)
        }
        getMoney()
    })
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
            console.log(response.status);
            return response.json();
        }).then((response_json) => {
            if (response_json.msg === 'get money error') {
                alert('無法取得存款');
                return;
            }
            else if (response_json.msg === 'get money') {
                // alert('取得存款');
                user_money = response_json.money;
                return user_money;
            }
        });
        //  console.log(res);
        return res;
    }
    return (
        <div className="container">
            <UserInfo
                user_name={user_name}
                user_id={user_id}
                user_money={user_money}
                store_value={store_Value} />
            <MyHistory
                user_id={user_id} />
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
    //  console.log(res);
    window.location.reload();
    return;
}


export default HistoryPage;