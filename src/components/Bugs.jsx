// Mantine components
import { Grid } from '@mantine/core';

// Bugs component CSS module styles
import styles from './bugs.module.css';

// BugCard custom component
import BugCard from '../components/BugCard';

// Bugs data
import bugsArray from '../assets/data/bugs.js';
export default function Bugs() {
  console.dir(bugsArray);
  return (
    <div>
      <h1>Buggerz!</h1>
      <Grid>
        {bugsArray.map(bug => {
          return <BugCard bug={bug} key={bug.id}></BugCard>;
        }
        )
        }



      </Grid>
    </div >
  );
}