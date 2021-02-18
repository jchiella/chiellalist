import React from 'react';
import { useState } from 'react';

import List from '@material-ui/core/List';

import GroceryListItem from './GroceryListItem';

export default function GroceryList() {
  const [itemStatuses, setItemStatuses] = useState([false]);

  const makeToggleDone = (index) => {
    return (e) => {
      e.preventDefault();
      setItemStatuses(itemStatuses.map((status, i) => i === index ? !status : status));
    };
  }

  return (
    <List>
      <GroceryListItem
        name="Apples"
        category="Produce"
        done={itemStatuses[0]}
        toggleDone={makeToggleDone(0)}
      />
    </List>
  );
}