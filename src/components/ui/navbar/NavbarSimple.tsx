import { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@mantine/core";
import { IconLogin, IconLogout } from "@tabler/icons-react";

import useAuth from "../../../hooks/useAuth.ts";
import { publicLinks, userLinks } from "./NavbarLinks.ts";
import classes from "./NavbarSimple.module.css";

export function NavbarSimple() {
  const [active, setActive] = useState("");

  function handleClick(label: string) {
    setActive(label);
  }

  const links = publicLinks.map((item) => (
    <Link
      data-active={item.label === active || undefined}
      onClick={() => handleClick(item.label)}
      className={classes.link}
      key={item.label}
      to={item.to}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>
      <NavbarUserFooter />
    </nav>
  );
}

function NavbarUserFooter() {
  const { user, logout, login } = useAuth();
  return (
    <div className={classes.footer}>
      {user
        ? userLinks.map((userLink) => {
            return (
              <Link
                className={classes.link}
                to={userLink.to}
                key={userLink.label}
              >
                <userLink.icon className={classes.linkIcon} stroke={1.5} />
                <span>{userLink.label}</span>
              </Link>
            );
          })
        : null}

      {user ? (
        <Button
          onClick={logout}
          variant="transparent"
          leftSection={<IconLogout />}
          color="gray"
        >
          Logout
        </Button>
      ) : (
        <Button
          onClick={login}
          variant="outline"
          leftSection={<IconLogin />}
          // color="gray"
          fullWidth
        >
          Login
        </Button>
      )}
    </div>
  );
}
