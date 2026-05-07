import Link from "next/link";
import HatS from "../public/hat-s.svg";
import c from "./header.module.css";

const navLinks = [
  { href: "/dsolver", label: "dSolver" },
  { href: "/smart-contract-development", label: "Smart Contracts & Consulting" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className={c.header}>
      <div className={c.header__content}>
        <picture className={c.logo}>
          <Link href="/" className={c.logo__full}>
            <HatS aria-label="Dewiz home" role="img" />
          </Link>
          <Link href="/" className={c.logo__hat_s}>
            <HatS aria-label="Dewiz home" role="img" />
          </Link>
        </picture>
        <nav className={c.nav} aria-label="Main navigation">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className={c.mobile_nav} aria-label="Mobile navigation">
          <input type="checkbox" id="menu-toggle" className={c.menu_toggle} aria-hidden="true" />
          <label htmlFor="menu-toggle" className={c.hamburger_button} role="button" aria-controls="mobile-nav-menu">
            <span className={c.hamburger_line}></span>
            <span className={c.hamburger_line}></span>
            <span className={c.hamburger_line}></span>
            <span className="srOnly">Toggle Menu</span>
          </label>
          <label htmlFor="menu-toggle" className={c.overlay}></label>
          <div className={c.menu} id="mobile-nav-menu">
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <label htmlFor="menu-toggle">
                    <Link href={link.href}>{link.label}</Link>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
