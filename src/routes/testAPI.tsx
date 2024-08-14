import { createFileRoute } from '@tanstack/react-router';

import { fetchData as queryiNatAPI } from '../api/iNaturalist.org.js';

export const Route = createFileRoute('/testAPI')({
  component: () => <div>Hello /testAPI!</div>,
});
