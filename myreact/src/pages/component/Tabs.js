import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HistoryTable from "./HistoryTable";

function TabPanel(props) {
  const { children, value, index, data, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  data: PropTypes.object,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '1000px', padding: '10px 20px', }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', margin: '0px 25px' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="交易紀錄" {...a11yProps(0)} />
          <Tab label="掛單紀錄" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
          <HistoryTable
            data={props.dataT} />
      </TabPanel>
      <TabPanel value={value} index={1}>
          <HistoryTable
            data={props.dataO} />
          <br />
          <p>* 僅顯示本日掛單</p>
      </TabPanel>

    </Box >
  );
}


