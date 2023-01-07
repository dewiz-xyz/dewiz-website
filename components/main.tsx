import { HTMLProps, ReactNode } from "react";
import clsx from "clsx";
import c from "./main.module.css";

interface Props extends HTMLProps<HTMLElement> {
  children?: ReactNode;
}

export default function Main({ className, children, ...props }: Props) {
  return (
    <main {...props} className={clsx(className, c.main)}>
      {children}
    </main>
  );
}
