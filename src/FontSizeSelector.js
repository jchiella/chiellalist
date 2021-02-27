import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  fontSizeSel: {
    margin: 'auto',
    width: 'fit-content',
  },
  select: {
    marginTop: '0.5rem',
  },
})

export default function FontSizeSelector({ fontSize, setFontSize }) {
  const classes = useStyles();

  return (
    <div className={classes.fontSizeSel}>
      <FormControl variant="outlined">
        <InputLabel>Font Size</InputLabel>
        <Select value={fontSize} onChange={(e) => setFontSize(e.target.value)}  className={classes.select}>
          <MenuItem value={0}>small</MenuItem>
          <MenuItem value={1}>large</MenuItem>
          <MenuItem value={2}>larger</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}