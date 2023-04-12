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
  const [ml_seatmap, set_ML_seatmap] = useState([]);
  const [mr_seatmap, set_MR_seatmap] = useState([]);
  const [r_seatmap, set_R_seatmap] = useState([]);

  const mappers = [
    { A: [0, 8, 8, 0] },
    { B: [13, 9, 9, 13] },
    { C: [13, 9, 9, 13] },
    { D: [15, 10, 11, 14] },
    { E: [16, 11, 11, 14] },
    { F: [17, 12, 12, 17] },
    { G: [17, 12, 12, 17] },
    { H: [16, 13, 13, 15] },
    { I: [15, 14, 14, 14] },
    { J: [14, 14, 14, 13] },
    { K: [13, 15, 15, 13] },
    { L: [12, 15, 15, 12] },
    { M: [11, 16, 16, 11] },
    { N: [10, 16, 16, 10] },
    { O: [10, 18, 17, 9] },
    { P: [9, 18, 17, 9] },
    { Q: [8, 18, 18, 8] },
    { R: [7, 19, 19, 7] },
    { S: [7, 19, 19, 7] },
  ];

  const m_deg_rot = [
    "-translate-y-[11px]",
    "-translate-y-[12px]",
    "-translate-y-[13px]",
    "-translate-y-[14px]",
    "-translate-y-[15px]",
    "-translate-y-[16px]",
    "-translate-y-[17px]",
    "-translate-y-[18px]",
    "-translate-y-[17px]",
    "translate-y-[16px]",
    "translate-y-[15px]",
    "translate-y-[14px]",
    "translate-y-[13px]",
    "translate-y-[12px]",
    "translate-y-[11px]",
    "translate-y-[9px]",
    "translate-y-[8px]",
  ];
  const lr_deg_rot = [
    "-translate-y-[11px]",
    "-translate-y-[12px]",
    "-translate-y-[13px]",
    "-translate-y-[14px]",
    "-translate-y-[15px]",
    "-translate-y-[16px]",
    "-translate-y-[17px]",
    "-translate-y-[18px]",
    "-translate-y-[17px]",
    "translate-y-[16px]",
    "translate-y-[15px]",
    "translate-y-[14px]",
    "translate-y-[13px]",
    "translate-y-[12px]",
    "translate-y-[11px]",
    "translate-y-[9px]",
    "translate-y-[8px]",
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
    let seatDict = {
      0: [],
      1: [],
      2: [],
      3: [],
    };

    for (const mapper of mappers) {
      let row = Object.keys(mapper);
      let lengths = Object.values(mapper);
      // console.log(lengths);
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
          // Middle left
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
          // Middle right
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

          // Right
          else if (
            item.column > length[0] + length[1] + length[2] &&
            item.column <= length[0] + length[1] + length[2] + length[3] &&
            item.row == row
          ) {
            if (seatArr[3]) {
              seatArr[3].push(item);
            } else {
              seatArr[3] = [item];
            }
          }
        });
      }
    }

    // console.log(seatArr);
    // Initiate seatdict array
    for (const mapper of mappers) {
      let row = Object.keys(mapper);
      let lengthsArr = Object.values(mapper);

      // Divide into 3 major alligment = left, middle, and right area of seats
      for (const lengths of lengthsArr) {
        for (const length_ent of lengths.entries()) {
          let index = length_ent[0];
          let length = length_ent[1];
          seatDict[index][row] = new Array(length);
        }
      }
    }
    // console.log(seatDict);

    // for each major division, group the data into the coressponding row (row A, row B, etc)
    for (const entry of seatArr.entries()) {
      // console.log(entry);
      let start = [1, 11, 21, 31];
      if (entry) {
        const datas = entry[1];
        const index = entry[0];
        // seatDict[index] = new Array();
        for (const item of datas) {
          seatDict[index][item.row][item.column - start[index]] = item;
        }
        arr[index] = Object.values(seatDict[index]);
      }
    }

    console.log(seatDict);

    // make into different variable
    set_L_seatmap(arr[0]);
    set_ML_seatmap(arr[1]);
    set_MR_seatmap(arr[2]);
    set_R_seatmap(arr[3]);

    return arr;
  }

  function print(halo) {
    console.log(halo);
  }

  // display the data
  function lr_mapper(array) {
    // console.log(index);
    // console.log(array);
    let arr = [];
    for (let i = 0; i < array.length; i++) {
      console.log(i);
      if (array[i]) {
        arr.push(
          <div
            className={`w-5 h-5 text-[0.7rem] bg-slate-400 text-center ${lr_deg_rot[i]}`}
          >
            {array[i].name}
          </div>
        );
      }
      // If the data is empty, then display blackbox
      else {
        arr.push(<div className={`w-5 h-5 bg-black ${lr_deg_rot[i]}`}></div>);
      }
    }
    return arr;
  }

  function m_mapper(array) {
    let arr = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i]) {
        arr.push(
          <div
            className={`w-5 h-5 text-[0.7rem] bg-slate-400 text-center ${m_deg_rot[i]}`}
          >
            {array[i].name}
          </div>
        );
      }
      // If the data is empty, then display blackbox
      else {
        arr.push(<div className={`w-5 h-5 bg-black ${m_deg_rot[i]}`}></div>);
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
        <div className="w-1/5 border-r-4 h-full ml-7">
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
        <div className="w-4/5 p-5">
          <p className="text-[#2D2D2F] font-semibold text-xl">Lantai 1</p>
          {/* {print(l_seatmap)} */}

          <div className="flex flex-row gap-10">
            {/* left */}
            {/* row wise */}
            <div className="flex flex-col gap-2">
              {l_seatmap.map((seats) => (
                // col wise
                <div
                  className={`flex flex-row gap-4 origin-top-right rotate-[10deg] justify-end`}
                >
                  {lr_mapper(seats)}
                </div>
              ))}
            </div>

            {/* middle left */}
            {/* row wise */}
            <div className="flex flex-col gap-2">
              {ml_seatmap.map((seats) => (
                // col wise
                // prin)
                <div className="flex flex-row gap-4 justify-center">
                  {m_mapper(seats)}
                </div>
              ))}
            </div>

            {/* middle right */}
            {/* row wise */}
            <div className="flex flex-col gap-2">
              {mr_seatmap.map((seats) => (
                // col wise
                <div className="flex flex-row gap-4 justify-center">
                  {m_mapper(seats)}
                </div>
              ))}
            </div>

            {/* right */}
            {/* row wise */}
            <div className="flex flex-col gap-2">
              {r_seatmap.map((seats, index) => (
                // col wise
                <div
                  className={`flex flex-row gap-4 origin-top-left -rotate-[10deg]`}
                >
                  {lr_mapper(seats, index)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <FooterBar />
    </>
  );
}
