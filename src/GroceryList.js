import React from 'react';
import { useState, useEffect, useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import Checkbox from '@material-ui/core/Checkbox';


import GroceryListItem from './GroceryListItem';
import NewItemForm from './NewItemForm';
import ModeSwitch from './ModeSwitch';
import FontSizeSelector from './FontSizeSelector';

import { io } from 'socket.io-client';
import { ListItemText } from '@material-ui/core';

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

  const [allDone, setAllDone] = useState(false);
  const [allNeeded, setAllNeeded] = useState(false);

  const [fontSize, setFontSize] = useState(0);

  const fontSizes = ['body1', 'h5', 'h4'];

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
        socket.current.emit('patch', name, { done: !items[index].done });
      } else {
        socket.current.emit('patch', name, { needed: !items[index].needed });
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

  const toggleAll = (e) => {
    if (shopMode) {
      socket.current.emit('patchAll', { done: !allDone });
      setAllDone(!allDone);
    } else {
      socket.current.emit('patchAll', { needed : !allNeeded });
      setAllNeeded(!allNeeded);
    }
  };

  return (<>
    <NewItemForm addItem={addItem} items={items} categories={categories} />
    <ModeSwitch shopMode={shopMode} handleModeChange={handleModeChange} />
    <FontSizeSelector fontSize={fontSize} setFontSize={setFontSize} />
    <List>
      <ListItem button onClick={toggleAll}>
        {
          shopMode ? <Checkbox checked={allDone} /> : <Checkbox color="primary" checked={allNeeded} />
        }
        <ListItemText  primaryTypographyProps={{ variant: fontSizes[fontSize] }} >
          <strong>Select All</strong>
        </ListItemText>
      </ListItem>
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
                    fontSize={fontSize}
                    fontSizes={fontSizes}
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