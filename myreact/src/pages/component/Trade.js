import { useState } from 'react'

const Trade = (props) => {
    console.log(props.data)

    const [sellPrice, setSellPrice] = useState('')
    const [sellNum, setSellNum] = useState('')
    const [buyPrice, setBuyPrice] = useState('')
    const [buyNum, setBuyNum] = useState('')

    const SellSubmit = (e) =>{
        e.preventDefault()
        props.func(sellNum, sellPrice, props.data.id);
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
                     <input type='submit' value='售出' style={{width: "60px"}}/>
                </div>
            </form>
            
            

        </div>
        // <div>
        //     <form className='trade_form'>
        //         <div className='form-control'>
        //             <label>帳號：</label>
        //             <input type='text' placeholder='輸入帳號'
        //                 value={acc} onChange={(e) => setAcc(e.target.value)} />
        //         </div>
        //         <div className='form-control'>
        //             <label>密碼：</label>
        //             <input type='text' placeholder='輸入密碼'
        //                 value={pwd} onChange={(e) => setPwd(e.target.value)} />
        //         </div>
        //         <input type='submit' value='登入' />
        //     </form>
        // </div>
    )
}

export default Trade
