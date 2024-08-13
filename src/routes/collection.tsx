// Mantine components
import { SimpleGrid, Group, Title, ThemeIcon } from '@mantine/core';

// Tabler Icons
import { IconCards } from '@tabler/icons-react';

// Custom components
import SpeciesCard from '../components/SpeciesCard.js';

// Data
import { speciesData, speciesType } from '../assets/data/speciesData.ts';
export default function CollectionRoute() {
  return (
    <div>
      <Group>
        <ThemeIcon
          variant='gradient'
          size='lg'
        >
          <IconCards />
        </ThemeIcon>
        <Title order={2}>Collection</Title>
      </Group>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
        {speciesData.map((species: speciesType) => {
          return (
            <SpeciesCard
              key={species.id}
              {...species}
            ></SpeciesCard>
          );
        })}
      </SimpleGrid>
    </div>
  );
}
