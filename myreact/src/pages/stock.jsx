import React from "react";
import Button from './component/Button';


const StockPage = () => {
    return (
        <div>
            <h3>StockPage</h3>
            <Button color='blue' text='get_stock' onClick = {getStock}/>
        </div>
    );
};

const getStock = async () => {

    const res = await fetch(
      'http://localhost:3000/getAllStock', {
      method: "GET",
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }
    ).then((response) => {
      console.log(response.status);
      return response.json();
    }).then((response_json) => {
        console.log(response_json);
    //   if (response_json.msg === 'no user found') {
    //     alert('帳號錯誤');
    //     return;
    //   }
    //   else if (response_json.msg === 'password error') {
    //     alert('密碼錯誤');
    //     return;
    //   }
    //   else if (response_json.msg === 'found user') {
    //     alert('登入成功');
    //     sessionStorage.setItem('user', acc.acc);
    //     return;
    //   }
  
    });
  }

export default StockPage;