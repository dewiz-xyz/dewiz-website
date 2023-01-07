import c from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={c.footer}>
      © {new Date().getFullYear()}  All rights reserved to Dewiz
    </footer>
  );
}

