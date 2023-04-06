import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [seatmap, setSeatMap] = useState();
  const axiosInstance = axios.create({
    withCredentials: true,
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get("seatmap.json");
        setSeatMap(res.data.data);
      } catch (err) {
        // catch here
      }
    })();
  }, []);

  function print(value) {
    console.log(value);
  }

  return (
    <>
      {/* {seatmap.map((item) => (
        <p>{item.name}</p>
      ))} */}
      {print(seatmap)}
      <h1>Hello</h1>
    </>
  );
}
