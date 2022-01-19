import { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import UpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import DownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import MoneyIcon from '@mui/icons-material/AttachMoney';


const Trade = (props) => {
    console.log(props.data)

    const [sellPrice, setSellPrice] = useState('')
    const [sellNum, setSellNum] = useState('')
    const [buyPrice, setBuyPrice] = useState('')
    const [buyNum, setBuyNum] = useState('')

    const SellSubmit = (e) => {

        e.preventDefault()
        props.funcs(sellNum, sellPrice, props.data.id);
        console.log("SELL: ", sellNum, sellPrice, props.data.id);
    }
    const BuySubmit = (e) => {

        e.preventDefault()
        props.funcb(sellNum, sellPrice, props.data.id);
        console.log("BUY: ", sellNum, sellPrice, props.data.id);
    }

    return (
        <Card sx={{ maxWidth: 400 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.data.name}
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Chip icon={<MoneyIcon />} label={"當前："+props.data.price} variant="outlined" color="primary" />
                    <Chip icon={<UpIcon />} label={"最高："+props.data.high} variant="outlined" color="success" />
                    <Chip icon={<DownIcon />} label={"最低："+props.data.low} variant="outlined" color="success" />
                </Stack>
            </CardContent>

            <div style={{ width: "500px" }}>
                <form className='sell_form' onSubmit={SellSubmit}>
                    <div className='form-control'>
                        <font>金額：</font>
                        <input type='number' placeholder='$$' style={{ width: "60px" }}
                            value={sellPrice} onChange={(e) => setSellPrice(e.target.value)} />

                        <font>張數：</font>
                        <input type='number' placeholder='' style={{ width: "60px" }}
                            value={sellNum} onChange={(e) => setSellNum(e.target.value)} />
                        <br /> <CardActions>
                            <Button type='submit' >售出</Button>
                            <Button type="button"  onClick={BuySubmit}>買入</Button>
                        </CardActions>
                    </div>
                </form>

            </div>
        </Card>
    )
}

export default Trade
