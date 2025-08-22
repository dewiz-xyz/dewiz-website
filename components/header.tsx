import Link from "next/link";
import LogoHatM from "../public/logo-hat-m.svg";
import HatM from "../public/hat-m.svg";
import HatS from "../public/hat-s.svg";
import c from "./header.module.css";

export default function Header() {
  return (
    <>
      <header className={c.header}>
        <div className={c.header__content}>
          <picture className={c.logo}>
            <Link href="/" className={c.logo__full}>
              <LogoHatM aria-label="Dewiz home" role="img" />
            </Link>
            <Link href="/" className={c.logo__hat_s}>
              <HatS aria-label="Dewiz home" role="img" />
            </Link>
          </picture>
          <nav className={c.nav} aria-label="Main navigation">
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about-us">About Us</a>
              </li>
              <li>
                <a href="#social">Social</a>
              </li>
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
                <li>
                  <label htmlFor="menu-toggle">
                    <a href="#home">Home</a>
                  </label>
                </li>
                <li>
                  <label htmlFor="menu-toggle">
                    <a href="#about-us">About Us</a>
                  </label>
                </li>
                <li>
                  <label htmlFor="menu-toggle">
                    <a href="#social">Social</a>
                  </label>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
      <div className={c.header__bg}></div>
    </>
  );
}
