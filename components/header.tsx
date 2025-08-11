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
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </nav>
          <nav className={c.mobile_nav} aria-label="Mobile navigation">
            <input id="toggle-nav" name="nav-state" type="radio" className={c.toggle} aria-hidden="true" />
            <input id="close-nav-home" name="nav-state" type="radio" className={c.close_toggle} aria-hidden="true" />
            <input id="close-nav-about" name="nav-state" type="radio" className={c.close_toggle} aria-hidden="true" />
            <input id="close-nav-contact" name="nav-state" type="radio" className={c.close_toggle} aria-hidden="true" />
            
            <label htmlFor="toggle-nav" className={c.toggle_label} role="button" aria-expanded="false" aria-controls="mobile-nav-menu">
              <span className={c.hamburger}>
                <span className={c.hamburger_line}></span>
                <span className={c.hamburger_line}></span>
                <span className={c.hamburger_line}></span>
              </span>
              <span className="srOnly">Menu</span>
            </label>
            <div className={c.toggle_content} id="mobile-nav-menu">
            <ul>
              <li>
                <a href="#home" onClick={(e) => {
                  const checkbox = document.getElementById('close-nav-home') as HTMLInputElement;
                  if (checkbox) checkbox.checked = true;
                }}>Home</a>
              </li>
              <li>
                <a href="#about-us" onClick={(e) => {
                  const checkbox = document.getElementById('close-nav-about') as HTMLInputElement;
                  if (checkbox) checkbox.checked = true;
                }}>About Us</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => {
                  const checkbox = document.getElementById('close-nav-contact') as HTMLInputElement;
                  if (checkbox) checkbox.checked = true;
                }}>Contact</a>
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
