import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/wilderkind/')({
  component: WilderKindIndexComponent,
});

function WilderKindIndexComponent() {
  return <h2>Welcome to the WilderKind Index</h2>;
}
