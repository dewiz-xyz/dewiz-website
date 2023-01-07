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
              <LogoHatM />
            </Link>
            <Link href="/" className={c.logo__hat_s}>
              <HatS />
            </Link>
          </picture>
          <nav className={c.nav}>
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
          <nav className={c.mobile_nav}>
            <input id="toggle-nav" type="checkbox" className={c.toggle} />
            <label htmlFor="toggle-nav" className={c.toggle_label} tabIndex={0}>
              Menu
            </label>
            <div className={c.toggle_content}>
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
            </div>
          </nav>
        </div>
      </header>
      <div className={c.header__bg}></div>
    </>
  );
}
