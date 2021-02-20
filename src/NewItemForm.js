import React from 'react';
import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '70%',
    margin: 'auto',
    flexWrap: 'wrap',
  },
  formCtrl: {
    margin: '0.5rem',
  }
});

export default function NewItemForm({ addItem, items, categories }) {
  const classes = useStyles();

  let nameField = null;
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setItemName('');
    nameField.focus();
    if (!items.map((item) => item.name).includes(itemName)) {
      addItem({
        name: itemName,
        category: itemCategory,
        done: false,
        needed: false,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <TextField
        className={classes.formCtrl}
        label="Item"
        variant="outlined"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        inputProps={{
          ref: (textfield) => { nameField = textfield; },
        }}
      />
      
      <FormControl style={{ minWidth: '10rem' }}>
        <InputLabel>Category</InputLabel>
        <Select className={classes.formCtrl} value={itemCategory} onChange={(e) => setItemCategory(e.target.value)}>
          {
            categories.map((cat, i) => <MenuItem key={i} value={cat}>{cat}</MenuItem>)
          }
        </Select>
      </FormControl>
      
      <Button
        className={classes.formCtrl}
        type="submit"
        variant="contained"
        color="primary"
        startIcon={<Add />}
        disabled={itemName === '' || itemCategory === ''}
      >
        Add Item
      </Button>
    </form>
  );
}