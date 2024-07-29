import { Outlet, Link } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/listItem';


import './root.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function Root() {

  return (
    <CssBaseline>
      <List>
        <ListItem><Link to={'bugs'}>buggerz!</Link></ListItem>
        <ListItem><Link to={'donuts'}>dōnutsy</Link></ListItem>
        <ListItem>?</ListItem>
      </List>
      <div id='outlet'>
        <Outlet />
      </div>
    </CssBaseline>
  );
}

export default Root;
