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
import AddIcon from '@mui/icons-material/AddShoppingCart';
import SellIcon from '@mui/icons-material/RequestQuote';
import TextField from '@mui/material/TextField';


const Trade = (props) => {
    console.log(props.data)

    const [sellPrice, setSellPrice] = useState(props.data.price);
    const [sellNum, setSellNum] = useState(1);

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
        <Card sx={{ maxWidth: 600, padding: '10px', }}>
            <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                    {props.data.name}
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Chip icon={<MoneyIcon />} label={"當前：" + props.data.price} color="primary" />
                    <Chip icon={<UpIcon />} label={"最高：" + props.data.high} color="error" />
                    <Chip icon={<DownIcon />} label={"最低：" + props.data.low} color="success" />
                </Stack>
                <Card sx={{ maxWidth: 500, padding: '5px 10px',  margin: '10px 0px',}}>
                        <form className='sell_form' onSubmit={SellSubmit}>
                            <div className='form-control'>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary"> 掛單： </Typography>
                                <Stack direction="row" spacing={2}>
                                    <TextField label="金額" type="number" style={{ width: "160px", }} size="small"
                                        InputLabelProps={{ shrink: true, }} value={sellPrice} onChange={(e) => setSellPrice(e.target.value)}
                                    />
                                    <TextField label="股數" type="number" style={{ width: "160px", }} size="small"
                                        InputLabelProps={{ shrink: true, }} value={sellNum} onChange={(e) => setSellNum(e.target.value)}
                                    />
                                </Stack>
                                <br />
                                <CardActions>
                                    <Chip icon={<SellIcon />} label="售出" style={{ width: "160px" }} onClick={SellSubmit} />
                                    <Chip icon={<AddIcon />} label="買入" style={{ width: "160px" }} onClick={BuySubmit} />
                                </CardActions>
                            </div>
                        </form>
                </Card>
            </CardContent>
        </Card>
    )
}

export default Trade
