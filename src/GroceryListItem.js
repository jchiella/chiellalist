import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';

export default function GroceryListItem({
  name,
  category,
  done,
  toggleDone,
  deleteSelf,
}) {
  return (
    <ListItem button onClick={toggleDone}>
      <Checkbox checked={done} />
      <ListItemText primary={name} secondary={category} />
      <ListItemSecondaryAction>
        <IconButton onClick={deleteSelf}>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}