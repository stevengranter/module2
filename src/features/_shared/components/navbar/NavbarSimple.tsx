import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { RoleContext } from "~/features/_shared/contexts/RoleContextProvider.tsx";
import StartEndGuestSessionButton from "~/features/guest-session/components/ToggleGuestSessionButton.tsx";
import LoginLogoutButton from "~/features/local-user/components/LoginLogoutButton.tsx";

import { publicLinks, userLinks } from "./NavbarLinks.ts";
import classes from "./NavbarSimple.module.css";

type NavBarParams = {
  onClick: () => void;
};

export function NavbarSimple({ onClick }: NavBarParams) {
  const [active, setActive] = useState("");

  function handleClick(label: string) {
    setActive(label);
    setTimeout(onClick, 500);
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
  // const { user } = useContext(RoleContext);
  return (
    <div className={classes.footer}>
      {userLinks.map((userLink) => {
        return (
          <Link className={classes.link} to={userLink.to} key={userLink.label}>
            <userLink.icon className={classes.linkIcon} stroke={1.5} />
            <span>{userLink.label}</span>
          </Link>
        );
      })}

      <StartEndGuestSessionButton />
    </div>
  );
}
