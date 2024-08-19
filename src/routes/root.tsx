import { AppShell, Group, Burger, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Outlet } from 'react-router-dom';

import { NavbarSimple } from '../components/NavbarSimple';

import logo from '/images/logo2.png';

export default function Root() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 150 }}
      navbar={{
        width: '200',
        breakpoint: 'xs',
        collapsed: { mobile: !opened },
      }}
      padding='md'
    >
      <AppShell.Header>
        <Group
          h='100%'
          px='md'
        >
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom='xs'
            size='sm'
          />

          <Image
            src={logo}
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
    </AppShell>
  );
}
