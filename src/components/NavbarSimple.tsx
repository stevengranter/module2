import { useState } from 'react';
import {
  IconCards,
  IconHome,
  IconUserCircle,
  IconInfoCircle,
  IconLogout,
  IconRainbow,
  IconSeeding,
  IconHorseToy,
} from '@tabler/icons-react';

import classes from './NavbarSimple.module.css';
import { Link } from '@tanstack/react-router';

const data = [
  { link: '/home', label: 'Home', icon: IconHome },
  { link: '/collection', label: 'Collection', icon: IconCards },
  { link: '/nest', label: 'myNEST', icon: IconRainbow },
  { link: '/nursery', label: 'Nursery', icon: IconSeeding },
  { link: '/playroom', label: 'Playroom', icon: IconHorseToy },
];

export function NavbarSimple() {
  const [active, setActive] = useState('Billing');

  function handleClick(label: string) {
    setActive(label);
  }

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={() => handleClick(item.label)}
    >
      <item.icon
        className={classes.linkIcon}
        stroke={1.5}
      />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <Link
          to='/profile'
          className={classes.link}
        >
          <IconUserCircle
            className={classes.linkIcon}
            stroke={1.5}
          />
          <span>Profile</span>
        </Link>

        <Link
          to='/logout'
          className={classes.link}
        >
          <IconLogout
            className={classes.linkIcon}
            stroke={1.5}
          />
          <span>Logout</span>
        </Link>

        <Link
          to='/about'
          className={classes.link}
        >
          <IconInfoCircle
            className={classes.linkIcon}
            stroke={1.5}
          />
          <span>About</span>
        </Link>
      </div>
    </nav>
  );
}
