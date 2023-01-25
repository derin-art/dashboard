import "../styles/globals.css";
import type { AppProps } from "next/app";
import Wrapper from "../components/display/Wrapper";
import { Inter } from "@next/font/google";
import Header from "../components/display/Header";
import { Provider } from "react-redux";
import { store } from "../store";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}
