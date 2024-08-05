// React Router components
import { Outlet, Link } from 'react-router-dom';

// Mantine components
import { AppShell, Burger, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function Root() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        Logo
      </AppShell.Header>

      <AppShell.Navbar p="md">
        Navbar
        <Link to="/">Home</Link>
        <Link to="/collection">Collection</Link>
        <Link to="/about">About</Link>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}