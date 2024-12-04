import { useState } from "react"
import { Link } from "react-router-dom"

import { publicLinks } from "./NavbarLinks.ts"
import classes from "./NavbarSimple.module.css"

type NavBarParams = {
  onClick?: () => void
}

export function NavbarSimple({ onClick }: NavBarParams) {
  const [active, setActive] = useState("")

  function handleClick(label: string) {
    if (!onClick) return
    setActive(label)
    setTimeout(onClick, 500)
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
  ))

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>
    </nav>
  )
}
