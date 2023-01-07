import { HTMLProps, ReactNode } from "react";
import clsx from "clsx";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import amusingAxlAvatar from "../public/avatar-amusingaxl.png";
import c from "./contact-card.module.css";

interface Props extends HTMLProps<HTMLDivElement> {
  logo: ReactNode;
  url: string;
  title: string;
}

export default function ContactCard({
  logo,
  url,
  title,
  className,
  ...props
}: Props) {
  return (
    <div {...props} className={clsx(c.card, className)}>
      <picture className={c.avatar}>
        {logo}
        <Link href={url} className={c.title} target="_blank" rel="noreferrer noopener">{title}</Link>
      </picture>
    </div>
  );
}
