import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  IconUserCircle,
  IconInfoCircle,
  IconUsersGroup,
  IconBinoculars,
  IconArchive,
  IconLogout,
  IconHome,
  // IconRainbow,
  // IconSeeding,
  // IconHorseToy,
} from '@tabler/icons-react';

import classes from './NavbarSimple.module.css';

const data = [
  { icon: IconHome, label: 'Home', link: '/' },
  { icon: IconUsersGroup, label: 'Users', link: 'users' },
  { label: 'WilderKind Index', icon: IconArchive, link: '/cards' },
  { icon: IconBinoculars, label: 'Search', link: '/search' },
  // { link: '/nursery', label: 'Nursery', icon: IconSeeding },
  // { link: '/playroom', label: 'Playroom', icon: IconHorseToy },
];

export function NavbarSimple() {
  const [active, setActive] = useState('Billing');

  function handleClick(label: string) {
    setActive(label);
  }

  const links = data.map((item) => (
    <Link
      data-active={item.label === active || undefined}
      onClick={() => handleClick(item.label)}
      className={classes.link}
      key={item.label}
      to={item.link}
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
          className={classes.link}
          to=''
        >
          <IconUserCircle
            className={classes.linkIcon}
            stroke={1.5}
          />
          <span>Profile</span>
        </Link>

        <Link
          className={classes.link}
          to=''
        >
          <IconLogout
            className={classes.linkIcon}
            stroke={1.5}
          />
          <span>Logout</span>
        </Link>

        <Link
          className={classes.link}
          to=''
        >
          <IconInfoCircle
            className={classes.linkIcon}
            stroke={1.5}
          />
          <span>
            <span>TestAPI</span>
          </span>
        </Link>
      </div>
    </nav>
  );
}
