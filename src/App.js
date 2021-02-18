import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import GroceryList from './GroceryList';

export default function App() {
  return (
    <Container>
      <Typography variant="h1">
        ChiellaList
      </Typography>

      <GroceryList />

    </Container>
  );
}