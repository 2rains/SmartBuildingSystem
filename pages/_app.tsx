import type { AppProps } from "next/app";
import "../styles/globals.css"; // tailwindCSS import 시켜야 사용 가능! _app에 import
import React, { PureComponent } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
