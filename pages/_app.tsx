import "normalize.css/normalize.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Press_Start_2P } from "next/font/google";

const ps2p = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--press-start-2p-font",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
      :root {
        --press-start-2p-font: ${ps2p.style.fontFamily};
      }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
