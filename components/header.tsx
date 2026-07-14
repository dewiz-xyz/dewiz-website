import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import LogoHatM from "../public/logo-hat-m.svg";
import HatS from "../public/hat-s.svg";
import c from "./header.module.css";

const navLinks = [
  { href: "/dsolver", label: "dSolver" },
  { href: "/smart-contract-development", label: "Smart Contracts & Consulting" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const closeMenu = () => setIsMenuOpen(false);
    const closeMenuOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", closeMenuOnEscape);
    router.events.on("routeChangeStart", closeMenu);

    return () => {
      document.removeEventListener("keydown", closeMenuOnEscape);
      router.events.off("routeChangeStart", closeMenu);
    };
  }, [router.events]);

  const currentRoute = (href: string) => (router.pathname === href ? "page" : undefined);

  return (
    <header className={c.header}>
      <div className={c.header__content}>
        <picture className={c.logo}>
          <Link href="/" className={c.logo__full} aria-current={currentRoute("/")}>
            <LogoHatM aria-label="Dewiz home" role="img" />
          </Link>
          <Link href="/" className={c.logo__hat_s} aria-current={currentRoute("/")}>
            <HatS aria-label="Dewiz home" role="img" />
          </Link>
        </picture>
        <nav className={c.nav} aria-label="Main navigation">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} aria-current={currentRoute(link.href)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className={c.mobile_nav} aria-label="Mobile navigation">
          <button
            type="button"
            className={`${c.hamburger_button} ${isMenuOpen ? c.hamburger_button_open : ""}`}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className={c.hamburger_line}></span>
            <span className={c.hamburger_line}></span>
            <span className={c.hamburger_line}></span>
            <span className="srOnly">Toggle menu</span>
          </button>
          <button
            type="button"
            className={`${c.overlay} ${isMenuOpen ? c.overlay_open : ""}`}
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
          />
          <div
            className={`${c.menu} ${isMenuOpen ? c.menu_open : ""}`}
            id="mobile-nav-menu"
          >
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} aria-current={currentRoute(link.href)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
