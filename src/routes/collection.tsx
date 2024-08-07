// Mantine components
import { SimpleGrid } from '@mantine/core';

// Custom components
import SpeciesCard from '../components/SpeciesCard.js';

// Data
import { speciesData, speciesType } from '../assets/data/speciesData.ts';
export default function Collection() {
  return (
    <div>
      <h1>Collection</h1>
      <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 3 }}>
        {speciesData.map((species: speciesType) => {
          return (
            <SpeciesCard
            key={species.id}
            {...species}></SpeciesCard>
          );
        })}
      </SimpleGrid>
    </div >
  );
}