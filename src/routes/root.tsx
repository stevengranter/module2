// React Router components
import { Outlet } from 'react-router-dom';

// Mantine components
import { AppShell, Burger, Image, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { NavbarSimple} from '../components/NavbarSimple';

// Images
import logo from '/images/logo.png'


export default function Root() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 120 }}
      navbar={{
        width: '200',
        breakpoint: 'xs',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="xs"
          size="sm"
        />

          <Image
          src={logo}
          alt="WilderNest Logo"
          h="100%"
          w="auto"
        fit="contain"
        py="lg"
        px="md"/>

      </Group>
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