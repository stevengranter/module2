import { useState } from 'react';
import {
  IconCards,
  IconHome,
  IconUserCircle,
  IconHelp,
  IconInfoCircle,
  IconLogout,
  IconRainbow,
  IconSeeding,
  IconHorseToy
} from '@tabler/icons-react';

import classes from './NavbarSimple.module.css';
import { Link } from 'react-router-dom';

const data = [
  { link: '/', label: 'Home', icon: IconHome },
  { link: '/collection', label: 'Collection', icon: IconCards },
  { link: '/dome', label: 'myDOME', icon: IconRainbow },
  { link: '/nursery', label: 'Nursery', icon: IconSeeding},
  { link: '/playroom', label: 'Playroom', icon: IconHorseToy}
];

export function NavbarSimple() {
  const [active, setActive] = useState('Billing');

  function handleClick(label: string) {
    setActive(label)
  }

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={() => handleClick(item.label)}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconUserCircle className={classes.linkIcon} stroke={1.5} />
          <span>Profile</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconHelp className={classes.linkIcon} stroke={1.5} />
          <span>Help</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconInfoCircle className={classes.linkIcon} stroke={1.5} />
          <span>About</span>
        </a>
      </div>
    </nav>
  );
}