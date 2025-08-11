import { HTMLProps } from "react";
import clsx from "clsx";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import c from "./team-member-card.module.css";

interface PropsBase extends HTMLProps<HTMLDivElement> {
  url: string;
  name: string;
  companyRole: string;
  description: string;
}

type ImgProps =
  | {
      img: StaticImageData;
    }
  | {
      img: string;
      width: number;
      height: number;
    };

type Props = PropsBase & ImgProps;

export default function TeamMemberCard({
  img,
  url,
  name,
  companyRole,
  description,
  className,
  ...props
}: Props) {
  return (
    <div {...props} className={clsx(c.card, className)}>
      <div className={c.avatar}>
        <Image src={img} alt={name} />
        <h3 className={c.name}>
          <Link href={url} target="_blank" rel="noreferrer noopener">{name}</Link>
        </h3>
      </div>
      <div className={c.content}>
        <h4 className={c.role}>{companyRole}</h4>
        <p className={c.description}>
          {description}
        </p>
      </div>
    </div>
  );
}
