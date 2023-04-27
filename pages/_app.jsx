import React from "react";
import Head from "next/head";

import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Grand Concert GMCO</title>
      </Head>
      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
}
