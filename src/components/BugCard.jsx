
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';

function BugCard({ bug }) {
  return (
    <Card key={bug.id}>
      <CardMedia component="img" sx={{ height: 200 }} image="https://picsum.photos/300/300"></CardMedia>
      <CardContent>
        <h3>{bug.commonName}</h3>
        <h4>{bug.scientificName}</h4>
        <p>{bug.description}</p>
        <p>Habitat: {bug.habitat}</p>
        <p>Diet: {bug.diet}</p>

      </CardContent>
    </Card>
  );
}
export default BugCard;