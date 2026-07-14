import "normalize.css/normalize.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Barlow, Press_Start_2P } from "next/font/google";

const ps2p = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--press-start-2p-font",
});

const barlow = Barlow({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--barlow-font",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
      :root {
        --press-start-2p-font: ${ps2p.style.fontFamily};
        --barlow-font: ${barlow.style.fontFamily};
      }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
