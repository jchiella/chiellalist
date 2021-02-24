import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  done: {
    textDecoration: 'line-through',
  },
  needed: {
    fontWeight: 'bolder',
  },
});

export default function GroceryListItem({
  name,
  done,
  needed,
  toggleDoneOrNeeded,
  deleteSelf,
  shopMode,
}) {
  const classes = useStyles();

  return (
    <ListItem button onClick={toggleDoneOrNeeded}>
      {
        shopMode ? <Checkbox checked={done} /> : <Checkbox color="primary" checked={needed} />
      }
      <ListItemText primary={name} classes={{
        primary: `${done && shopMode ? classes.done : ''} ${needed && !shopMode ? classes.needed : ''}`
      }} />
      {
        !shopMode && <ListItemSecondaryAction>
          <IconButton onClick={deleteSelf}>
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      }
    </ListItem>
  );
}