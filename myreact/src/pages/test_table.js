import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import {CanvasJSChart} from 'canvasjs-react-charts'


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: '股票編號',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: '股票名稱',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: '當前價格',
  },
  {
    id: 'high',
    numeric: true,
    disablePadding: false,
    label: '最高',
  },
  {
    id: 'low',
    numeric: true,
    disablePadding: false,
    label: '最低',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            //align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable(props) {

  function createData(name, price, id, high, low) {
    return { name, price, id, high, low};
  }
  const rows = [];
  if(props.data.name!== undefined) {
    for ( var i=0; i<props.data.name.length; i++){
      rows.push(createData(props.data.name[i], props.data.price[i], props.data.id[i], props.data.high[i], props.data.low[i]) )
    }
  }
  //console.log(rows)
  
  
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleClick = (event, data) => {
    const selectedIndex = selected.indexOf(data.name);
    let newSelected = [];
    newSelected = (selected, data.name);
    console.log(data)
    setSelected(newSelected);
    //console.log( name);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    /////////
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", // "light1", "dark1", "dark2"
      title:{
          text: "Bounce Rate by Week of Year"
      },
      axisY: {
          title: "Bounce Rate",
          suffix: "%"
      },
      axisX: {
          title: "Week of Year",
          prefix: "W",
          interval: 2
      },
      data: [{
          type: "line",
          toolTipContent: "Week {x}: {y}%",
          dataPoints: [
              { x: 1, y: 64 },
              { x: 2, y: 61 },
              { x: 3, y: 64 },
              { x: 4, y: 62 },
              { x: 5, y: 64 },
              { x: 6, y: 60 },
              { x: 7, y: 58 },
              { x: 8, y: 59 },
              { x: 9, y: 53 },
              { x: 10, y: 54 },
              { x: 11, y: 61 },
              { x: 12, y: 60 },
              { x: 13, y: 55 },
              { x: 14, y: 60 },
              { x: 15, y: 56 },
              { x: 16, y: 60 },
              { x: 17, y: 59.5 },
              { x: 18, y: 63 },
              { x: 19, y: 58 },
              { x: 20, y: 54 },
              { x: 21, y: 59 },
              { x: 22, y: 64 },
              { x: 23, y: 59 }
          ]
      }]
  }




  return (
    <Box sx={{ width: '500px' }}>
      <CanvasJSChart options = {options}/>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table
            sx={{ minWidth: 300 }}
            aria-labelledby="tableTitle"
            //size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              //onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell></TableCell>
                      <TableCell>{row.id}</TableCell>
                      <TableCell
                        //component="th"
                        id={labelId}
                        scope="row"
                        //padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell>{row.price}</TableCell>
                      <TableCell>{row.high}</TableCell>
                      <TableCell>{row.low}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                //   style={{
                //     height: (dense ? 33 : 53) * emptyRows,
                //   }}
                    style = {{height : 53 * emptyRows}}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

