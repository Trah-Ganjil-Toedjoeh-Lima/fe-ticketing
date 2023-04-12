/* eslint-disable react/jsx-key */
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import NavigationBar from "@/components/navbar";
import FooterBar from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [seatmap, setSeatMap] = useState([]);
  const [l_seatmap, set_L_seatmap] = useState([]);
  const [m_seatmap, set_M_seatmap] = useState([]);
  const [r_seatmap, set_R_seatmap] = useState([]);

  const mappers = [
    { A: [10, 10, 10] },
    { B: [10, 10, 10] },
    { C: [10, 10, 10] },
    { D: [10, 10, 10] },
    { E: [10, 10, 10] },
    { F: [10, 10, 15] },
    { G: [10, 10, 15] },
    { H: [10, 10, 10] },
    { I: [10, 10, 10] },
    { J: [10, 10, 10] },
    { K: [10, 10, 10] },
    { L: [10, 10, 10] },
    { M: [10, 10, 10] },
    { N: [10, 10, 10] },
    { O: [10, 10, 10] },
    { P: [10, 10, 10] },
  ];

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

  // Mapping the data
  function seatMapping(value) {
    let seatArr = [];
    let arr = [];
    let seatDict = {};

    for (const mapper of mappers) {
      let row = Object.keys(mapper);
      let lengths = Object.values(mapper);

      // Divide into 3 major alligment = left, middle, and right area of seats
      for (const length of lengths) {
        value.map((item) => {
          // Left
          if (item.column >= 0 && item.column <= length[0] && item.row == row) {
            if (seatArr[0]) {
              seatArr[0].push(item);
            } else {
              seatArr[0] = [item];
            }
          }
          // Middle
          else if (
            item.column > length[0] &&
            item.column <= length[0] + length[1] &&
            item.row == row
          ) {
            if (seatArr[1]) {
              seatArr[1].push(item);
            } else {
              seatArr[1] = [item];
            }
          }
          // Right
          else if (
            item.column > length[0] + length[1] &&
            item.column <= length[0] + length[1] + length[2] &&
            item.row == row
          ) {
            if (seatArr[2]) {
              seatArr[2].push(item);
            } else {
              seatArr[2] = [item];
            }
          }
        });
      }
    }

    // for each major division, group the data into the coressponding row (row A, row B, etc)
    for (const entry of seatArr.entries()) {
      let start = [1, 11, 20];
      if (entry) {
        const datas = entry[1];
        const index = entry[0];
        seatDict[index] = new Array();
        for (const item of datas) {
          if (seatDict[index][item.row]) {
            seatDict[index][item.row][item.column - start[index]] = item;
          } else {
            seatDict[index][item.row] = new Array();
            seatDict[index][item.row][item.column - start[index]] = item;
          }
        }
        arr[index] = Object.values(seatDict[index]);
      }
    }

    console.log(seatDict);

    // make into different variable
    set_L_seatmap(arr[0]);
    set_M_seatmap(arr[1]);
    set_R_seatmap(arr[2]);

    return arr;
  }

  function print(halo) {
    console.log(halo);
  }

  // display the data
  function mapper(array) {
    console.log(array[0]);
    let arr = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i]) {
        arr.push(<div className="">{array[i].name}</div>);
      }
      // If the data is empty, then display blackbox
      else {
        arr.push(<div className="h-3 w-3 bg-black"></div>);
      }
    }
    return arr;
  }

  return (
    <>
      <NavigationBar />
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
          {/* {print(l_seatmap)} */}

          <div className="flex flex-row gap-10">
            {/* row wise */}
            <div className="flex flex-col gap-2">
              {l_seatmap.map((seats) => (
                // col wise
                <div className="flex flex-row gap-4">{mapper(seats)}</div>
              ))}
            </div>

            {/* row wise */}
            <div className="flex flex-col gap-2">
              {m_seatmap.map((seats) => (
                // col wise
                <div className="flex flex-row gap-4">{mapper(seats)}</div>
              ))}
            </div>
            {/* row wise
            <div className="flex flex-col gap-2">
              {m_seatmap.map((seats) => (
                // col wise
                <div className="flex flex-row gap-4">
                  {seats.map((seat) => (
                    // TODO - BUAT BUTTON INPUT
                    <div className="">{seat.name}</div>
                  ))}
                </div>
              ))}
            </div> */}
            <div className="flex flex-col gap-2">
              {r_seatmap.map((seats) => (
                <div className="flex flex-row gap-4">
                  {seats.map((seat) => (
                    <div className="">{seat.name}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <FooterBar/>
    </>
  );
}
