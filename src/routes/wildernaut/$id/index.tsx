import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/wildernaut/$id/')({
  component: WilderNautComponent,
});

function WilderNautComponent() {
  return <h2>Welcome WilderNaut!</h2>;
}
