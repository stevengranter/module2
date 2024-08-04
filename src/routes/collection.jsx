// Mantine components
import { SimpleGrid } from '@mantine/core';

// Custom components
import CollectibleCard from '../components/CollectibleCard.jsx';

// Data
import { collectionData } from '../assets/data/data.js';
export default function Collection() {

  return (
    <div>
      <h1>Collection</h1>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
        {collectionData.map(species => {
          return (


            <CollectibleCard species={species} key={species.id}></CollectibleCard>


          );
        })}
      </SimpleGrid>
    </div >
  );
}