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
});

export default function GroceryListItem({
  name,
  category,
  done,
  toggleDone,
  deleteSelf,
}) {
  const classes = useStyles();

  return (
    <ListItem button onClick={toggleDone}>
      <Checkbox checked={done} />
      <ListItemText primary={name} className={done ? classes.done : ''} />
      <ListItemSecondaryAction>
        <IconButton onClick={deleteSelf}>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}