import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/collection')({
  component: () => <div>Hello /collection!</div>,
});
