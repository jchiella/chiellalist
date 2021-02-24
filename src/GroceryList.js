import React from 'react';
import { useState, useEffect, useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';


import GroceryListItem from './GroceryListItem';
import NewItemForm from './NewItemForm';
import ModeSwitch from './ModeSwitch';

import { io } from 'socket.io-client';

const useStyles = makeStyles({
  subheading: {
    fontSize: 'x-large',
    color: 'black',
    cursor: 'pointer',
  },
});

export default function GroceryList() {
  const classes = useStyles();

  const [items, setItems] = useState([]);
  const [shopMode, setShopMode] = useState(false);

  const categories = [
    'Produce',
    'Dairy',
    'Groceries',
    'Personal Care',
    'Cleaning Products',
    'Meat & Deli',
    'Bakery',
  ];

  const [shownCategories, setShownCategories] = useState(categories);

  const socket = useRef(null);

  useEffect(() => {
    socket.current = io('https://valinor.tk:3003');
    socket.current.emit('hello');

    socket.current.on('update', (arg) => {
      setItems(arg);
    });
  }, []);

  const makeToggleDoneOrNeeded = (name) => {
    const index = items.findIndex((item) => item.name === name);
    return (e) => {
      e.preventDefault();
      if (shopMode) {
        socket.current.emit('patch', {
          name: items[index].name,
          category: items[index].category,
          done: !items[index].done,
          needed: items[index].needed,
        });
      } else {
        socket.current.emit('patch', {
          name: items[index].name,
          category: items[index].category,
          done: items[index].done,
          needed: !items[index].needed,
        });
      }

    };
  }

  const makeDeleteSelf = (name) => {
    const index = items.findIndex((item) => item.name === name);
    return (e) => {
      e.preventDefault();
      socket.current.emit('delete', items[index]);
    };
  };

  const makeToggleCategory = (category) => {
    return (e) => {
      e.preventDefault();
      if (shownCategories.includes(category)) {
        setShownCategories(shownCategories.filter((cat) => cat !== category));
      } else {
        setShownCategories([...shownCategories, category]);
      }
    };
  };

  const addItem = (item) => {
    socket.current.emit('put', item);
  };

  const handleModeChange = (e) => {
    setShopMode(e.target.checked);
  };

  return (<>
    <NewItemForm addItem={addItem} items={items} categories={categories} />
    <ModeSwitch shopMode={shopMode} handleModeChange={handleModeChange} />
    <List>
      {
        categories.map((cat, i) => {
          let filteredItems;
          if (shopMode) {
            filteredItems = items.filter((item) => item.category === cat && item.needed);
          } else {
            filteredItems = items.filter((item) => item.category === cat);
          }
          if (filteredItems.length) {
            return (
              <div key={i}>
                <ListSubheader className={classes.subheading} onClick={makeToggleCategory(cat)}>
                  {cat}<ArrowDropDown />
                </ListSubheader>
                {
                  items && shownCategories.includes(cat) && 
                  filteredItems.sort((a, b) => a.name.localeCompare(b.name)).map((item, index) => <GroceryListItem
                    key={index}
                    name={item.name}
                    category={item.category}
                    done={item.done}
                    needed={item.needed}
                    toggleDoneOrNeeded={makeToggleDoneOrNeeded(item.name)}
                    deleteSelf={makeDeleteSelf(item.name)}
                    shopMode={shopMode}
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