import { useState } from 'react';
import {
  IconCards,
  IconHome,
  IconUserCircle,
  IconInfoCircle,
  IconLogout,
  IconArchive,
  // IconRainbow,
  // IconSeeding,
  // IconHorseToy,
} from '@tabler/icons-react';

import classes from './NavbarSimple.module.css';
import { Link } from 'react-router-dom';

const data = [
  { link: '/', label: 'Home', icon: IconHome },
  { link: '/users/1/collection', label: 'Collection', icon: IconCards },
  { link: '/cards', label: 'WilderKind Index', icon: IconArchive },
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
          to=''
          className={classes.link}
        >
          <IconUserCircle
            className={classes.linkIcon}
            stroke={1.5}
          />
          <span>Profile</span>
        </Link>

        <Link
          to=''
          className={classes.link}
        >
          <IconLogout
            className={classes.linkIcon}
            stroke={1.5}
          />
          <span>Logout</span>
        </Link>

        <Link
          to=''
          className={classes.link}
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
