import PropTypes from 'prop-types'
import Button from './Button'
import Button2 from '@mui/material/Button';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [];

const MyHistory = (props) => {

    // const onClick = async () => {
    //     console.log('儲值');
    //     props.store_value(props.user_id)
    // }
    return (
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>股票名稱</TableCell>
            <TableCell align="right">買/賣</TableCell>
            <TableCell align="right">價格</TableCell>
            <TableCell align="right">股數</TableCell>
            <TableCell align="right">交易時間</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

MyHistory.defaultProps = {
    user_name: '使用者名稱',
    user_money: '0',
}

MyHistory.protoType = {
    user_name: PropTypes.string.isRequired,
    user_money: PropTypes.string.isRequired,
}


export default MyHistory
