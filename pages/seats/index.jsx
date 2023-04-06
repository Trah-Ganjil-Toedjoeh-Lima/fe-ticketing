import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [seatmap, setSeatMap] = useState([]);
  const axiosInstance = axios.create({
    withCredentials: true,
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get("seatmap.json");
        setSeatMap(seatMapping(res.data.data));
        // setSeatMap(res.data.data);
      } catch (err) {
        // catch here
      }
    })();
  }, []);

  // useEffect(() => {
  //   setSeatMap(seatMapping(seatmap));
  // }, [seatmap]);

  function seatMapping(value) {
    // let contoh = value;
    let seatArr = [];
    let arr = [];
    const regex = /([a-zA-Z]+)(\d+)/;

    value.filter((item) => {
      const result = item.name.match(regex);
      if (result[2] >= 0 && result[2] <= 10) {
        if (seatArr[0]) {
          seatArr[0].push(item);
        } else {
          seatArr[0] = [item];
        }
      }
      if (result[2] >= 11 && result[2] <= 20) {
        if (seatArr[1]) {
          seatArr[1].push(item);
        } else {
          seatArr[1] = [item];
        }
      }
      if (result[2] >= 21 && result[2] <= 31) {
        if (seatArr[2]) {
          seatArr[2].push(item);
        } else {
          seatArr[2] = [item];
        }
      }
    });

    for (const [index, seats] of seatArr.entries()) {
      let seatDict = {};
      for (const seat of seats) {
        const result = seat.name.match(regex);
        if (seatDict[result[1]]) {
          seatDict[result[1]][result[2]] = seat;
        } else {
          seatDict[result[1]] = [seat];
        }
      }
      arr[index] = Object.values(seatDict);
    }

    // for (const seats of seatArr) {
    //   for (const seat of seats) {
    //     const result = seat.name.match(regex);
    //     if (seatDict[result[1]]) {
    //       seatDict[result[1]][result[2]] = seat;
    //     } else {
    //       seatDict[result[1]] = [seat];
    //     }
    //   }
    // }

    console.log(arr);

    return arr;
  }

  function print(halo) {
    console.log(halo);
  }

  return (
    <>
      <div className="h-40 bg-[#287D92] border-b-4 border-[#F6F7F1]">
        <div className="p-7">
          <p className="text-[#F6F7F1] text-2xl font-semibold">
            Season 3 • Concert
          </p>
          <p className="text-[#F6F7F1] text-5xl font-bold">GMCO best concert</p>
          <p className="text-[#F6F7F1] text-base font-bold mt-3">
            Yogyakarta, Gawk Gawk
          </p>
        </div>
      </div>

      <div className="flex flex-row h-screen">
        <div className="w-1/4 border-r-4 h-full ml-7">
          <img
            src="https://www.sso.org.sg/_next/image?url=https%3A%2F%2Fweb-assets.sso.org.sg%2Fimages%2FWinds-Above-The-Sea-1920x1080.jpg&w=1200&q=75"
            alt=""
          />
          <div className="text-[#2D2D2F] font-semibold">
            <p className="text-sm my-3">Season • 2022/2023</p>
            <p className="text-2xl mb-3 border-b-2">GMCGO - Trah Ganjil</p>
            <div className="flex flex-col gap-5">
              <div className="flex flex-row gap-2 content-center">
                <div className="h-3 w-3 rounded-md bg-red-600 self-center"></div>
                <p>Kursi Sudah Dibeli</p>
              </div>
              <div className="flex flex-row gap-2 content-center">
                <div className="h-3 w-3 rounded-md bg-green-600 self-center"></div>
                <p>Bisa Dibeli</p>
              </div>
              <div className="flex flex-row gap-2 content-center">
                <div className="h-3 w-3 rounded-md bg-yellow-600 self-center"></div>
                <p>Dibayar Dulu</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/4 p-5">
          <p className="text-[#2D2D2F] font-semibold text-xl">Lantai 1</p>
          <div>
            {/* {print(seatmap)} */}
            {/* {seatmap.map((item) => (
              <h1>{item}</h1>
            ))} */}
          </div>
        </div>
      </div>
      {/* {seatmap.map((item) => (
        <h1>{item.name}</h1>
      ))} */}
    </>
  );
}
