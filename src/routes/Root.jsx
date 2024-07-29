import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/listItem';
import './Root.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function Root() {

  return (
    <CssBaseline>
      <List>
        <ListItem>bugnet</ListItem>
        <ListItem>dōnut</ListItem>
        <ListItem>?</ListItem>
      </List>
    </CssBaseline>
  );
}

export default Root;
