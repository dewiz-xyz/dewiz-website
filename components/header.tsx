import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  getNextHeaderScrollState,
  type HeaderScrollState,
} from "./header-scroll-state.mjs";
import LogoHatM from "../public/logo-hat-m.svg";
import HatS from "../public/hat-s.svg";
import c from "./header.module.css";

const navLinks = [
  { href: "/dsolver", label: "dSolver" },
  { href: "/smart-contracts", label: "Smart Contracts" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const scrollState = useRef<HeaderScrollState>({ lastScrollY: 0, isHidden: false });

  useEffect(() => {
    let routeResetFrame: number | undefined;

    const resetHeader = () => {
      setIsHeaderHidden(false);
      scrollState.current = { lastScrollY: window.scrollY, isHidden: false };
    };
    const handleRouteStart = () => {
      setIsMenuOpen(false);
      resetHeader();
    };
    const handleRouteComplete = () => {
      if (routeResetFrame !== undefined) cancelAnimationFrame(routeResetFrame);
      routeResetFrame = requestAnimationFrame(resetHeader);
    };
    const closeMenuOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("keydown", closeMenuOnEscape);
    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteComplete);

    return () => {
      document.removeEventListener("keydown", closeMenuOnEscape);
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteComplete);
      if (routeResetFrame !== undefined) cancelAnimationFrame(routeResetFrame);
    };
  }, [router.events]);

  useEffect(() => {
    scrollState.current = { lastScrollY: window.scrollY, isHidden: false };
    setIsHeaderHidden(false);

    const handleScroll = () => {
      const nextState = getNextHeaderScrollState(
        scrollState.current,
        window.scrollY,
        isMenuOpen,
      );
      scrollState.current = nextState;
      setIsHeaderHidden(nextState.isHidden);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  const currentRoute = (href: string) => (router.pathname === href ? "page" : undefined);

  return (
    <header
      className={
        isHeaderHidden && !isMenuOpen ? `${c.header} ${c.header_hidden}` : c.header
      }
    >
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
