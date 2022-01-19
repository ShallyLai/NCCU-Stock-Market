import { useState } from 'react'

const Trade = (props) => {
    console.log(props.data)

    const [sellPrice, setSellPrice] = useState('')
    const [sellNum, setSellNum] = useState('')
    const [buyPrice, setBuyPrice] = useState('')
    const [buyNum, setBuyNum] = useState('')

    const SellSubmit = (e) =>{
        
        e.preventDefault()
        props.funcs(sellNum, sellPrice, props.data.id);
        console.log("SELL: ",sellNum, sellPrice, props.data.id);
    }
    const BuySubmit = (e) =>{
       
        e.preventDefault()
        props.funcb(sellNum, sellPrice, props.data.id);
         console.log("BUY: ",sellNum, sellPrice, props.data.id);
    }

    return (

        <div style={{width: "500px"}}>
            <form className='sell_form' onSubmit={SellSubmit}>
                <div className='form-control'>
                     <font>金額：</font>
                     <input type='number' placeholder='$$' style={{width: "60px"}}
                     value={sellPrice} onChange={(e) =>setSellPrice(e.target.value)}/>
                     
                     <font>張數：</font>
                     <input type='number' placeholder='' style={{width: "60px"}}
                     value={sellNum} onChange={(e) =>setSellNum(e.target.value)}/>
                     <br/>
                     <button type='submit' style={{width: "60px"}}>售出</button>
                     <button type="button" style={{width: "60px"}} onClick={BuySubmit}>買入</button>
                </div>
            </form>
            
            

        </div>
        
    )
}

export default Trade
