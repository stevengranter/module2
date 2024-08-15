import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/wildernaut/')({
  component: () => <div>Hello /wildernaut/!</div>
})