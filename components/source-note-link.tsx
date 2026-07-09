import type { MouseEvent, ReactNode } from "react";

interface Props {
  sourceId: string;
  className: string;
  ariaLabel: string;
  children: ReactNode;
}

export default function SourceNoteLink({ sourceId, className, ariaLabel, children }: Props) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById(sourceId);

    if (!target) {
      return;
    }

    event.preventDefault();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
    window.history.pushState(null, "", `#${sourceId}`);
  }

  return (
    <a
      className={className}
      href={`#${sourceId}`}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
