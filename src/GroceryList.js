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
    socket.current = io('https://valinor.tk:3003');
    socket.current.emit('hello');

    socket.current.on('update', (arg) => {
      setItems(arg);
    });
  }, []);

  const makeToggleDone = (index) => {
    return (e) => {
      e.preventDefault();
      socket.current.emit('patch', {
        name: items[index].name,
        category: items[index].category,
        done: !items[index].done
      });
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