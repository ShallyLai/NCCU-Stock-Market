import PropTypes from 'prop-types'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const HistoryTable = ({data}) => {

    // const onClick = async () => {
    //     console.log('儲值');
    //     props.store_value(props.user_id)
    // }\
   console.log(typeof(data));
    return (
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" >
        <TableHead>
          <TableRow align="center">
            <TableCell><b>股票名稱</b></TableCell>
            <TableCell><b>買/賣</b></TableCell>
            <TableCell><b>價格</b></TableCell>
            <TableCell><b>股數</b></TableCell>
            <TableCell ><b>交易時間</b></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow  align="center"
              key={row["stock_name"]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row["stock_name"]}
              </TableCell>
              <TableCell>{row["BuyOrSell"]}</TableCell>
              <TableCell>{row["TransactionPrice"]}</TableCell>
              <TableCell>{row["num"]}</TableCell>
              <TableCell>{row["TransactionTime"]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

HistoryTable.defaultProps = {
    data: [{
      "BuyOrSell": " ",
      "TransactionPrice": " ",
      "TransactionTime": " ",
      "num": " ",
      "stock_name": " "}
    ],
}

HistoryTable.protoType = {
     data: PropTypes.object,
}


export default HistoryTable
