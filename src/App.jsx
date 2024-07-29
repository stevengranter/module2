import { useState } from 'react';
import reactLogo from './assets/react.svg';
import donutLogo from '/pink-donut.webp';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/listItem';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>

      <CssBaseline>
        <List>
          <ListItem>bugnet</ListItem>
          <ListItem>dōnut</ListItem>
          <ListItem>?</ListItem>
        </List>
      </CssBaseline>

    </>
  );
}

export default App;
