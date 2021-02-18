import React from 'react';
import { useState } from 'react';

import List from '@material-ui/core/List';

import GroceryListItem from './GroceryListItem';

export default function GroceryList() {
  const [items, setItems] = useState([
    {
      name: 'Apples',
      category: 'Produce',
      done: false,
    },
  ]);

  const makeToggleDone = (index) => {
    return (e) => {
      e.preventDefault();
      setItems(items.map((item, i) => i === index ? { name: item.name, category: item.category, done: !item.done }: item ));
    };
  }

  const makeDeleteSelf = (index) => {
    return (e) => {
      e.preventDefault();
      setItems(items.filter((item, i) => i !== index));
    };
  }

  return (
    <List>
      {
        items.map((item, index) => <GroceryListItem
          name={item.name}
          category={item.category}
          done={item.done}
          toggleDone={makeToggleDone(index)}
          deleteSelf={makeDeleteSelf(index)}
        />)
      }
    </List>
  );
}