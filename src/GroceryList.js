import React from 'react';
import { useState, useEffect } from 'react';

import List from '@material-ui/core/List';

import GroceryListItem from './GroceryListItem';
import NewItemForm from './NewItemForm';

export default function GroceryList() {
  const [items, setItems] = useState();

  useEffect(() => {
    fetch('http://localhost:3003/item')
      .then((res) => res.json())
      .then((items) => setItems(items));
  }, [items]);

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
      fetch('http://localhost:3003/item', {
        method: 'delete',
        body: JSON.stringify(items[index]),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
    };
  }

  const addItem = (item) => {
    setItems([...items, item]);
    fetch('http://localhost:3003/item', {
      method: 'put',
      body: JSON.stringify(item),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
  };

  return (<>
    <NewItemForm addItem={addItem} />
    <List>
      {
        items && items.map((item, index) => <GroceryListItem
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