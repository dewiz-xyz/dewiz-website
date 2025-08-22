import { HTMLProps, ReactNode } from "react";
import clsx from "clsx";
import Link from "next/link";
import c from "./social-card.module.css";

interface Props extends HTMLProps<HTMLDivElement> {
  logo: ReactNode;
  url: string;
  text: string;
}

export default function SocialCard({
  logo,
  url,
  text,
  className,
  ...props
}: Props) {
  return (
    <div {...props} className={clsx(c.card, className)}>
      <div className={c.avatar}>
        {logo}
        <Link href={url} className={c.text} target="_blank" rel="noreferrer noopener">{text}</Link>
      </div>
    </div>
  );
}
