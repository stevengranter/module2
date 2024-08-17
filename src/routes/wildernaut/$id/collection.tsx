import { createFileRoute } from '@tanstack/react-router';

// import fetchData from '../../../utils/iNaturalist.org.js';

export const Route = createFileRoute('/wildernaut/$id/collection')({
  component: CollectionComponent,
});

function CollectionComponent() {
  return (
    <>
      <h2>WilderKindComponent</h2>

      <ul></ul>
    </>
  );
}
