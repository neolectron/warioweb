import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: () => {
    return <h1>About page!</h1>;
  },
});
