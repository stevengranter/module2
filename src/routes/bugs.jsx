import styles from './bugs.module.css';
import BugCard from '../components/BugCard';
import Grid from '@mui/material/Unstable_Grid2';

import bugsArray from '../assets/data/bugs.js';

function Bugs() {
  console.dir(bugsArray);
  return (
    <div>
      <h1>Buggerz!</h1>
      <Grid container spacing={4}>

        {bugsArray.map((bug) => {

          <BugCard
            key={bug.id}
            name={bug.name}
            description={bug.description}
          />;

        })}
      </Grid>
    </div >
  );
}
export default Bugs;