import "../styles/globals.css";
import type { AppProps } from "next/app";
import Wrapper from "../components/display/Wrapper";
import { Inter } from "@next/font/google";
import Header from "../components/display/Header";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Wrapper>
      <Component {...pageProps} />
      <style jsx global>
        {`
          :root {
            --inter-font: ${inter.style.fontFamily};
          }
        `}
      </style>
    </Wrapper>
  );
}
