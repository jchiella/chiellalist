import React from 'react';
import { useState, useEffect, useRef } from 'react';

import List from '@material-ui/core/List';

import GroceryListItem from './GroceryListItem';
import NewItemForm from './NewItemForm';

import { io } from 'socket.io-client';

export default function GroceryList() {
  const [items, setItems] = useState();

  const socket = useRef(null);

  useEffect(() => {
    socket.current = io('http://localhost:3003');
    socket.current.emit('hello');

    socket.current.on('update', (arg) => {
      setItems(arg);
    });
  }, []);

  const makeToggleDone = (index) => {
    return (e) => {
      e.preventDefault();
      setItems(items.map((item, i) => i === index ? { name: item.name, category: item.category, done: !item.done }: item ));
    };
  }

  const makeDeleteSelf = (index) => {
    return (e) => {
      e.preventDefault();
      socket.current.emit('delete', items[index]);
    };
  }

  const addItem = (item) => {
    socket.current.emit('put', item);
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