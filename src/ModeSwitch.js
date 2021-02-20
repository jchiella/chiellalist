import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  modeSwitch: {
    width: 'fit-content',
    margin: 'auto',
  },
})

export default function ModeSwitch({ shopMode, handleModeChange }) {
  const classes = useStyles();

  return (
    <Typography component="div">
      <Grid container alignItems="center" spacing={1} className={classes.modeSwitch}>
        <Grid item>Plan Mode</Grid>
        <Grid item>
          <Switch checked={shopMode} onChange={handleModeChange} />
        </Grid>
        <Grid item>Shop Mode</Grid>
      </Grid>
    </Typography>
  );
}