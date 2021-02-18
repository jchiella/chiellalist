import React from 'react';
import { useState } from 'react';

import List from '@material-ui/core/List';

import GroceryListItem from './GroceryListItem';
import NewItemForm from './NewItemForm';

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

  const addItem = (item) => {
    setItems([...items, item]);
  };

  return (<>
    <NewItemForm addItem={addItem} />
    <List>
      {
        items.map((item, index) => <GroceryListItem
          key={index}
          name={item.name}
          category={item.category}
          done={item.done}
          toggleDone={makeToggleDone(index)}
          deleteSelf={makeDeleteSelf(index)}
        />)
      }
    </List>
  </>);
}