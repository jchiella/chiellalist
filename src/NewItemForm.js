import React from 'react';
import { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';

export default function NewItemForm({ addItem }) {
  let nameField = null;
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setItemName('');
    setItemCategory('');
    nameField.focus();
    addItem({
      name: itemName,
      category: itemCategory,
      done: false,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Item"
        variant="outlined"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        inputProps={{
          ref: (textfield) => { nameField = textfield; },
        }}
      />
      <TextField
        label="Category"
        variant="outlined"
        value={itemCategory}
        onChange={(e) => setItemCategory(e.target.value)}
      />
      <Button
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