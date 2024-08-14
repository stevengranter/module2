import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { AppShell, Group, Burger, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { NavbarSimple } from '../components/NavbarSimple';

export const Route = createRootRoute({
  component: () => (
    <AppShell
      header={{ height: 150 }}
      navbar={{
        width: '200',
        breakpoint: 'xs',
        // collapsed: { mobile: !opened },
      }}
      padding='md'
    >
      <AppShell.Header>
        <Group
          h='100%'
          px='md'
        >
          <Burger
            // opened={opened}
            // onClick={toggle}
            hiddenFrom='xs'
            size='sm'
          />

          <Image
            // src={logo}
            alt='WilderNest Logo'
            h='100%'
            w='auto'
            fit='contain'
            py='lg'
            px='md'
          />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <NavbarSimple />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <TanStackRouterDevtools />
    </AppShell>
  ),
});
