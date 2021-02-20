import React from 'react';
import { useState, useEffect, useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import GroceryListItem from './GroceryListItem';
import NewItemForm from './NewItemForm';

import { io } from 'socket.io-client';

const useStyles = makeStyles({
  subheading: {
    fontSize: 'x-large',
    color: 'black',
  },
});

export default function GroceryList() {
  const classes = useStyles();

  const [items, setItems] = useState([]);

  const categories = [
    'Produce',
    'Meat & Deli',
    'Cleaning Products',
    'Dairy',
    'Bakery',
    'Personal Care',
  ];

  const socket = useRef(null);

  useEffect(() => {
    socket.current = io('https://valinor.tk:3003');
    socket.current.emit('hello');

    socket.current.on('update', (arg) => {
      setItems(arg);
    });
  }, []);

  const makeToggleDone = (name) => {
    const index = items.findIndex((item) => item.name === name);
    return (e) => {
      e.preventDefault();
      socket.current.emit('patch', {
        name: items[index].name,
        category: items[index].category,
        done: !items[index].done
      });
    };
  }

  const makeDeleteSelf = (name) => {
    const index = items.findIndex((item) => item.name === name);
    return (e) => {
      e.preventDefault();
      socket.current.emit('delete', items[index]);
    };
  }

  const addItem = (item) => {
    socket.current.emit('put', item);
  };

  return (<>
    <NewItemForm addItem={addItem} items={items} categories={categories} />
    <List>
      {
        categories.map((cat, i) => {
          const filteredItems = items.filter((item) => item.category === cat);
          if (filteredItems.length) {
            return (
              <div key={i}>
                <ListSubheader className={classes.subheading}>{cat}</ListSubheader>
                {
                  items && filteredItems.map((item, index) => <GroceryListItem
                    key={index}
                    name={item.name}
                    category={item.category}
                    done={item.done}
                    toggleDone={makeToggleDone(item.name)}
                    deleteSelf={makeDeleteSelf(item.name)}
                  />)
                }
              </div>
            );
          }
          return undefined;
        })
      }
    </List>
  </>);
}