import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const SelectGroup = (props) => {
    const [state, setState] = React.useState({
        g100: true,
        g102: true,
        g200: true,
        g203: true,
        g300: true,
        g400: true,
        g500: true,
        g600: true,
        g700: true,
        g703: true
    });

    const onClick = async () => {
        props.apply(state);
    }

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const { g100, g102, g200, g203, g300, g400, g500, g600, g700, g703 } = state;
    const error = [g100, g102, g200, g203, g300, g400, g500, g600, g700, g703].filter((v) => v).length < 1;

    return (
        <Box sx={{ display: 'flex',
                   flexDirection: 'column',
                   maxWidth: 250,
                   borderRadius: '12px',
                   boxShadow: 1,
                   padding:'10px',
                   margin: '5px' }}>
                <FormControl
                    required
                    error={error}
                    component="fieldset"
                    sx={{ m: 3 }}
                    variant="standard"
                >
                    <FormLabel component="legend">請選擇您想查看的學院</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={g100} onChange={handleChange} name="g100" size="small" />}
                            label="文學院"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={g102} onChange={handleChange} name="g102" size="small" />}
                            label="教育學院"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={g200} onChange={handleChange} name="g200" size="small" />}
                            label="社科院"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={g203} onChange={handleChange} name="g203" size="small" />}
                            label="國務院"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={g300} onChange={handleChange} name="g300" size="small" />}
                            label="商學院"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={g400} onChange={handleChange} name="g400" size="small" />}
                            label="傳院"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={g500} onChange={handleChange} name="g500" size="small" />}
                            label="外語學院"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={g600} onChange={handleChange} name="g600" size="small" />}
                            label="法學院"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={g700} onChange={handleChange} name="g700" size="small" />}
                            label="理學院"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={g703} onChange={handleChange} name="g703" size="small" />}
                            label="資訊學院"
                        />
                    </FormGroup>
                    <FormHelperText>請至少擇一</FormHelperText>
                </FormControl>
                <Button variant="contained" onClick={onClick}>套用</Button>
        </Box>

    );
}

export default SelectGroup
