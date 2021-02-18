import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

export default function GroceryListItem({
  name,
  category,
  done,
  toggleDone,
}) {
  return (
    <ListItem button onClick={toggleDone}>
      <Checkbox checked={done} />
      <ListItemText primary={name} secondary={category} />
    </ListItem>
  );
}