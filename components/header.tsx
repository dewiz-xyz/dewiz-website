import Link from "next/link";
import LogoHatM from "../public/logo-hat-m.svg";
import HatM from "../public/hat-m.svg";
import HatS from "../public/hat-s.svg";
import c from "./header.module.css";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
            <button
              className={`${c.hamburger_button} ${isMenuOpen ? c.open : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav-menu"
            >
              <span className={c.hamburger_line}></span>
              <span className={c.hamburger_line}></span>
              <span className={c.hamburger_line}></span>
              <span className="srOnly">Toggle Menu</span>
            </button>
            {isMenuOpen && (
              <>
                <div className={c.overlay} onClick={() => setIsMenuOpen(false)}></div>
                <div className={c.menu} id="mobile-nav-menu">
                  <ul>
                    <li>
                      <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
                    </li>
                    <li>
                      <a href="#about-us" onClick={() => setIsMenuOpen(false)}>About Us</a>
                    </li>
                    <li>
                      <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </nav>
        </div>
      </header>
      <div className={c.header__bg}></div>
    </>
  );
}
