import { Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2 (Ensure this is the intended version)
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem'; // Corrected casing
import BugCard from '../components/BugCard';
import bugsArray from '../assets/data/bugs';
import './root.css';

function Root() {
  return (
    <CssBaseline>
      <List>
        {bugsArray.map((bug) => (
          <ListItem key={bug.id}>
            <BugCard bug={bug} />
          </ListItem>
        ))}
      </List>
      <div id='outlet'>
        <Outlet />
      </div>
    </CssBaseline>
  );
}

export default Root;
