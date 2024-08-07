// React Router components
import { Outlet } from 'react-router-dom';

// Mantine components
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { NavbarSimple} from '../components/NavbarSimple';

export default function Root() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: '200',
        breakpoint: 'xs',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="xs"
          size="sm"
        />
        WilderNest
      </AppShell.Header>

      <AppShell.Navbar>
       <NavbarSimple />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}