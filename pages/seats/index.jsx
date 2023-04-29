/* eslint-disable react/jsx-key */
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import {
  ChevronRightIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

import FooterBar from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { axiosInstance } from "@/utils/config";
import { Loading } from "@/utils/spinner";
import {
  notifyError,
  notifyErrorMessage,
  notifySucces,
} from "@/components/notify";

export default function Seats() {
  // floor1
  const [l_seatmap, set_L_seatmap] = useState([]);
  const [ml_seatmap, set_ML_seatmap] = useState([]);
  const [mr_seatmap, set_MR_seatmap] = useState([]);
  const [r_seatmap, set_R_seatmap] = useState([]);
  // floor2
  const [l_seatmap_2, set_L_seatmap_2] = useState([]);
  const [ml_seatmap_2, set_ML_seatmap_2] = useState([]);
  const [m_seatmap_2, set_M_seatmap_2] = useState([]);
  const [mr_seatmap_2, set_MR_seatmap_2] = useState([]);
  const [r_seatmap_2, set_R_seatmap_2] = useState([]);
  // ---
  const [userSeats, setUserSeats] = useState([]);
  const [userSeatsPick, setUserSeatsPick] = useState([]);
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [curFloor, setCurFloor] = useState(1);
  const [seatHighlight, setSeatHighlight] = useState([]);
  const [seatHoverHighlight, setSeatHoverHighlight] = useState([]);
  const [scaleN, setScaleN] = useState(0);
  const [purchasedSeat, setPurchasedSeat] = useState(0);
  const [counter, setCounter] = useState(60 * 10);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [priceCategoryHighlight, setPriceCategoryHighlight] = useState([]);
  const [priceCategoryHoverHighlight, setPriceCategoryHoverHighlight] =
    useState([]);
  const [isReservedSeatLoaded, setReservedListLoaded] = useState(false);
  const [isLocalSeatLoaded, setLocalSeatLoaded] = useState(false);
  const [update, setUpdate] = useState("");
  const [isReservedByOthers, setIsReservedByOthers] = useState(false);
  // const [canWriteLocalSeat, setCanWriteLocalSeat] = useState(false);

  // floor 1
  const mappersFloor1 = [
    { A: [0, 8, 8, 0] },
    { B: [13, 9, 9, 13] },
    { C: [13, 9, 9, 15] },
    { D: [14, 11, 10, 15] },
    { E: [16, 11, 11, 16] },
    { F: [17, 12, 12, 17] },
    { G: [17, 12, 12, 17] },
    { H: [15, 13, 13, 16] },
    { I: [14, 14, 14, 15] },
    { J: [13, 14, 14, 14] },
    { K: [13, 15, 15, 13] },
    { L: [12, 15, 15, 12] },
    { M: [11, 16, 16, 11] },
    { N: [10, 16, 16, 10] },
    { O: [9, 17, 18, 10] },
    { P: [9, 17, 18, 9] },
    { Q: [8, 18, 18, 8] },
    { R: [7, 19, 19, 7] },
    { S: [7, 19, 19, 7] },
  ];
  const startMappersFloor1 = {
    A: [0, 1, 9, 0],
    B: [1, 14, 23, 32],
    C: [1, 14, 23, 32],
    D: [1, 15, 26, 36],
    E: [1, 17, 28, 39],
    F: [1, 18, 30, 42],
    G: [1, 18, 30, 42],
    H: [1, 16, 29, 42],
    I: [1, 15, 29, 43],
    J: [1, 14, 28, 42],
    K: [1, 14, 29, 44],
    L: [1, 13, 28, 43],
    M: [1, 12, 28, 44],
    N: [1, 11, 27, 43],
    O: [1, 10, 27, 45],
    P: [1, 10, 27, 45],
    Q: [1, 9, 27, 45],
    R: [1, 8, 27, 46],
    S: [1, 8, 27, 46],
  };
  const deg_rot = [
    "-translate-y-[20px]",
    "-translate-y-[18px]",
    "-translate-y-[16px]",
    "-translate-y-[14px]",
    "-translate-y-[12px]",
    "-translate-y-[10px]",
    "-translate-y-[8px]",
    "-translate-y-[6px]",
    "-translate-y-[4px]",
    "-translate-y-[2px]",
    "translate-y-[0px]",
    "translate-y-[2px]",
    "translate-y-[4px]",
    "translate-y-[6px]",
    "translate-y-[8px]",
    "translate-y-[10px]",
    "translate-y-[12px]",
    "translate-y-[14px]",
    "translate-y-[16px]",
    "translate-y-[18px]",
    "translate-y-[20px]",
  ];
  const row_width = [
    "w-[57.5%]",
    "w-[60%]",
    "w-[62.5%]",
    "w-[65%]",
    "w-[67.5%]",
    "w-[70%]",
    "w-[72.5%]",
    "w-[75%]",
    "w-[77.5%]",
    "w-[80%]",
    "w-[82.5%]",
    "w-[85%]",
    "w-[87.5%]",
    "w-[90%]",
    "w-[92.5%]",
    "w-[95%]",
    "w-[97.5%]",
    "w-[100%]",
    "w-[102.5%]",
  ];

  // floor2
  const mappersFloor2 = [
    { T: [12, 12, 14, 11, 13] },
    { U: [12, 13, 14, 11, 13] },
  ];
  const startMappersFloor2 = {
    T: [1, 13, 25, 39, 50],
    U: [1, 13, 26, 40, 51],
  };

  // universal
  const priceCategory = [
    { name: "Harmoni Rp170K", price: 170000, lantai: 1, isHover: 0 },
    { name: "Serenada Rp145K", price: 145000, lantai: 1, isHover: 0 },
    { name: "Irama Rp120K", price: 120000, lantai: 1, isHover: 0 },
    { name: "Tala Rp85K", price: 85000, lantai: 1, isHover: 0 },
    { name: "Sekar Rp65K", price: 65000, lantai: 1, isHover: 0 },
    { name: "Gita Rp50K", price: 50000, lantai: 2, isHover: 0 },
  ];
  const statusColor = {
    available: "bg-[#8EBFD0]",
    reserved_by_me: "bg-[#F5DB91]",
    purchased_by_me: "bg-[#7E7E7E]",
    reserved: "bg-[#C0925E]",
    purchased: "bg-[#7E7E7E]",
  };
  const scaleFactor = [
    "scale-[10%]",
    "scale-[20%]",
    "scale-[30%]",
    "scale-[40%]",
    "scale-[50%]",
    "scale-[60%]",
    "scale-[70%]",
    "scale-[80%]",
    "scale-[90%]",
    "scale-[100%]",
    "scale-[120%]",
    "scale-[130%]",
    "scale-[140%]",
    "scale-[150%]",
    "scale-[160%]",
    "scale-[170%]",
    "scale-[180%]",
    "scale-[190%]",
    "scale-[200%]",
  ];

  function rerender() {
    setUpdate(`update ${Math.random()}`);
  }

  // Counter 10 Minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((counter) => counter - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (counter === 0) {
      window.location.reload();
    } else if (counter === 3) {
      notifyErrorMessage("Refresh dalam 3..2..1..");
    }
  }, [counter]);

  // set Scale
  useEffect(() => {
    (() => {
      if (window.innerWidth >= 768) {
        setScaleN(8);
      } else {
        setScaleN(5);
      }
    })();
  }, []);

  // get kursi
  useEffect(() => {
    // get kursi from api
    (async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/api/v1/seat_map");
        // const res = await axiosInstance.get("seatmap.json");
        divideByFloor(res.data.data);
        setReservedListLoaded(true);
        // getReservedSeats(res.data.data);
        // seatMapping(res.data.data, mappersFloor1, startMappersFloor1);
      } catch (err) {
        // console.log(err);
        // notifyError(err);
        try {
          if (err.response.data.error === "the gate has not been opened") {
            notifyErrorMessage("Pemesanan belum dibuka");
            router.push("/closegate");
          }
        } catch (err) {
          notifyError(err);
        }
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    })();
  }, []);

  useEffect(() => {
    if (isReservedSeatLoaded === true && isLocalSeatLoaded === false) {
      //console.log("Get User Seats from Local Storage");
      const savedUserSeats = JSON.parse(localStorage.getItem("user_seats"));
      const savedUserSeatsPick = JSON.parse(
        localStorage.getItem("user_seats_pick")
      );
      let nonDuplicateSeats = [];
      let nonDuplicateSeatsPick = [];

      if (savedUserSeats !== null) {
        savedUserSeats.forEach((seat) => {
          if (userSeats.includes(seat) === false) {
            // console.log("Set User Seats:", seat);
            nonDuplicateSeats.push(seat);
          }
        });
      }
      if (savedUserSeatsPick !== null) {
        savedUserSeatsPick.forEach((seat) => {
          if (userSeatsPick.includes(seat) === false) {
            // console.log("Set User Seats Pick:", seat);
            nonDuplicateSeatsPick.push(seat);
          }
        });
      }
      if (nonDuplicateSeats.length > 0) {
        setUserSeats([...userSeats, ...nonDuplicateSeats]);
      }
      if (nonDuplicateSeatsPick.length > 0) {
        setUserSeatsPick([...userSeatsPick, ...nonDuplicateSeatsPick]);
      }
      setLocalSeatLoaded(true);
    }
  }, [isReservedSeatLoaded]);

  useEffect(() => {
    // console.log("Save User Seats to Local Storage: ", canWriteLocalSeat);
    if (isReservedSeatLoaded === true && isLocalSeatLoaded === true) {
      localStorage.setItem("user_seats", JSON.stringify(userSeats));
      localStorage.setItem("user_seats_pick", JSON.stringify(userSeatsPick));
    }
  }, [userSeats, userSeatsPick]);

  // Post data to cart
  async function postSeats(seatsArr) {
    console.log(seatsArr);
    var mySeatsTmp = seatsArr;
    const reservedByOthers = [];
    const res = await axiosInstance.get("/api/v1/seat_map");
    // console.log(res.length)
    for (let i = 0; i < res.data.data.length; i++) {
      // console.log(i)
      const obj = res.data.data[i];

      // untuk ambil kusi terpesan
      if (obj.status === "reserved") {
        reservedByOthers.push(obj);
      }
    }

    for (let j = 0; j < reservedByOthers.length; j++) {
      // console.log("Kursi sudah di pesan: ", reservedByOthers[j].seat_id)
      if (mySeatsTmp.includes(reservedByOthers[j].seat_id)) {
        setIsReservedByOthers(true);
        // notifyErrorMessage("Sebagian kursi sudah dipesan orang lain. Lanjut dengan kursi tersisa...");
        // console.log("Kursi sudah di pesan: ", reservedByOthers[j].seat_id)
        mySeatsTmp.splice(mySeatsTmp.indexOf(reservedByOthers[j].seat_id), 1);
        // console.log("Kursi tersisa:", mySeatsTmp)
      }
    }

    if (isReservedByOthers === true && mySeatsTmp.length !== 0) {
      notifyErrorMessage("Sebagian kursi sudah dipesan orang lain. Melanjutkan dengan kursi tersisa...");
    }

    if (mySeatsTmp.length === 0) {
      notifyErrorMessage("Semua kursi sudah dipesan orang lain. Silakan pilih kursi lain...");
      localStorage.removeItem("user_seats");
      localStorage.removeItem("user_seats_pick");
      window.location.reload();
    } else {
      try {
        await axiosInstance
          .post("/api/v1/seat_map", {
            data: mySeatsTmp,
          })
          .then(() => {
            notifySucces("Pesanan Ditambahkan, Mengalihkan...");
            localStorage.removeItem("user_seats");
            localStorage.removeItem("user_seats_pick");
            setTimeout(function () {
              router.push({
                pathname: "/seats/cart",
              });
            }, 1000);
          });
        // notifySucces("Pesanan Ditambahkan").then(router.push("/seats/cart"))
        // fungsi then route push
      } catch (err) {
        //console.log(err);
        if (err.response.data.error === "your credentials are invalid") {
          notifyErrorMessage("Silakan login terlebih dahulu");
          router.push({
            pathname: "/auth",
          });
        } else if (
          err.response.data.error ===
          "you are not authorized, please fill your name or phone number data"
        ) {
          notifyErrorMessage("Silakan lengkapi data profil Anda terlebih dahulu");
          router.push({
            pathname: "/profile",
          });
        } else {
          notifyError(err);
        }
      }
    } 
  }

  // clear all seats data
  function clearSeats() {
    setUserSeats([]);
    setUserSeatsPick([]);
    localStorage.removeItem("user_seats");
    localStorage.removeItem("user_seats_pick");
    window.location.reload();
  }

  //
  // fungsi utama mapper kursi
  //

  // misah 2 lantai
  function divideByFloor(data) {
    const floor1 = [];
    const floor2 = [];
    const reservedByMe = [];
    let purchased = 0;

    for (let i = 0; i < data.length; i++) {
      const obj = data[i];

      // untuk ambil kusi terpesan
      if (obj.status === "reserved_by_me") {
        reservedByMe.push(obj);
      } else if (obj.status === "purchased_by_me") {
        purchased += 1;
      }

      // untuk misah 2 lantai
      if (obj.row === "T" || obj.row === "U") {
        floor2.push(obj);
      } else {
        floor1.push(obj);
      }
    }

    // kursi yang sudah dipesan sebelumnya
    // console.log("Set User Seats from API (reserved_by_me)");
    if (
      userSeats.includes(reservedByMe.map((item) => item.seat_id)) === false
    ) {
      setUserSeats(reservedByMe.map((item) => item.seat_id));
    }
    if (userSeatsPick.includes(reservedByMe)) {
      setUserSeatsPick(reservedByMe);
    }
    setPurchasedSeat(purchased);

    // passing data lantai 1 dan 2
    const floor1Seat = seatMapping(
      floor1,
      mappersFloor1,
      startMappersFloor1,
      4
    );
    set_L_seatmap(floor1Seat[0]);
    set_ML_seatmap(floor1Seat[1]);
    set_MR_seatmap(floor1Seat[2]);
    set_R_seatmap(floor1Seat[3]);

    const floor2Seat = seatMapping(
      floor2,
      mappersFloor2,
      startMappersFloor2,
      5
    );
    set_L_seatmap_2(floor2Seat[0]);
    set_ML_seatmap_2(floor2Seat[1]);
    set_M_seatmap_2(floor2Seat[2]);
    set_MR_seatmap_2(floor2Seat[3]);
    set_R_seatmap_2(floor2Seat[4]);
  }

  // Mapping the data
  function seatMapping(value, mappers, startMappers, numSeats) {
    let seatArr = [];
    let arr = [];
    let seatDict = {};
    for (let i = 0; i < numSeats; i++) {
      seatDict[i] = [];
    }
    // Start mapping
    for (const mapper of mappers) {
      let row = Object.keys(mapper);
      let lengthsArr = Object.values(mapper);

      for (const lengths of lengthsArr) {
        for (const length of lengths.entries()) {
          let index = length[0];
          let value = length[1];
          seatDict[index][row] = new Array(value);
        }

        // Devide into 4 major area, l, ml, mr, r
        value.forEach((item) => {
          if (item.row == row) {
            for (let i = 0; i < lengths.length; i++) {
              const start = lengths
                .slice(0, i)
                .reduce((acc, val) => acc + val, 0);
              const end = start + lengths[i];
              if (item.column > start && item.column <= end) {
                if (seatArr[i]) {
                  seatArr[i].push(item);
                } else {
                  seatArr[i] = [item];
                }
                break;
              }
            }
          }
        });
      }
    }

    // for each major division, group the data into the coressponding row (row A, row B, etc)
    for (const entry of seatArr.entries()) {
      if (entry) {
        const datas = entry[1];
        const index = entry[0];
        for (const item of datas) {
          // Mapping the data into each corresponding key and value
          seatDict[index][item.row][
            item.column - startMappers[item.row][index]
          ] = item;
          // console.log(startMappers[item.row][index])
        }
        arr[index] = Object.values(seatDict[index]);
      }
    }

    // make into different variable
    return arr;
  }

  // Seat Clicking Behavior
  function onSeatPick(array, arrayUser) {
    if (arrayUser.includes(array.seat_id)) {
      setUserSeats(userSeats.filter((item) => item !== array.seat_id));
      setUserSeatsPick(
        userSeatsPick.filter((item) => item.name !== array.name)
      );
    } else if (userSeats.length < 5 - purchasedSeat) {
      setUserSeats([...userSeats, array.seat_id]);
      setUserSeatsPick([...userSeatsPick, array]);
    } else {
      notifyErrorMessage("Maksimal membeli 5 kursi per akun");
    }
  }

  // mapping lantai 1 sayap kiri
  function left_mapper(array, arrayUser) {
    let arr = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i]) {
        if (array[i].status === "available") {
          const isSelected = userSeats.includes(array[i].seat_id);
          const isHighlight = seatHighlight.includes(array[i].price);
          const isHoverHighlight = seatHoverHighlight.includes(array[i].price);
          arr.push(
            <div className={`duration-300 hover:scale-150 ${deg_rot[i]}`}>
              <div
                className={`rounded-base h-6 w-6 ${
                  statusColor[array[i].status]
                }  cursor-pointer text-center text-[0.7rem] 
                  ${
                    isHighlight
                      ? " bg-gmco-orange-secondarylight"
                      : isHoverHighlight
                      ? "bg-gmco-yellow-secondary"
                      : ""
                  } ${
                  isSelected
                    ? "scale-150 border-2 border-red-500 bg-opacity-50"
                    : ""
                }`}
                onClick={() => {
                  onSeatPick(array[i], arrayUser);
                }}
                onMouseEnter={() => {
                  setPriceCategoryHoverHighlight([array[i].price]);
                }}
                onMouseLeave={() => {
                  setPriceCategoryHoverHighlight([]);
                }}
              >
                {array[i].name}
              </div>
            </div>
          );
        } else {
          arr.push(
            <div
              className={`rounded-base h-6 w-6 cursor-not-allowed text-center text-[0.7rem] text-gmco-white opacity-80 ${
                statusColor[array[i].status]
              } ${deg_rot[i]}`}
            >
              {array[i].name}
            </div>
          );
        }
      } else {
        arr.push(
          <div className={`rounded-base h-6 w-6 bg-black ${deg_rot[i]}`} />
        );
      }
    }
    return arr;
  }

  // mapping lantai 2 sayap kanan
  function right_mapper(array, arrayUser) {
    let arr = [];
    for (let i = array.length; i > 0; i--) {
      let index = array.length - i;
      if (array[index]) {
        if (array[index].status == "available") {
          const isSelected = arrayUser.includes(array[index].seat_id);
          const isHighlight = seatHighlight.includes(array[index].price);
          const isHoverHighlight = seatHoverHighlight.includes(
            array[index].price
          );
          arr.push(
            <div className={`duration-300 hover:scale-150 ${deg_rot[i - 1]}`}>
              <div
                className={`rounded-base h-6 w-6 ${
                  statusColor[array[index].status]
                }  cursor-pointer text-center text-[0.7rem] ${
                  isHighlight
                    ? "bg-gmco-orange-secondarylight"
                    : isHoverHighlight
                    ? "bg-gmco-yellow-secondary"
                    : ""
                } ${
                  isSelected
                    ? "scale-150 border-2 border-red-500 bg-opacity-50"
                    : ""
                }`}
                onClick={() => onSeatPick(array[index], arrayUser)}
                onMouseEnter={() => {
                  setPriceCategoryHoverHighlight([array[index].price]);
                }}
                onMouseLeave={() => {
                  setPriceCategoryHoverHighlight([]);
                }}
              >
                {array[index].name}
              </div>
            </div>
          );
        } else {
          arr.push(
            <div
              className={`rounded-base h-6 w-6 cursor-not-allowed text-center text-[0.7rem] text-gmco-white opacity-80 ${
                statusColor[array[index].status]
              } ${deg_rot[i - 1]}`}
            >
              {array[index].name}
            </div>
          );
        }
      } else {
        arr.push(
          <div className={`rounded-base h-6 w-6 bg-black ${deg_rot[i - 1]}`} />
        );
      }
    }
    return arr;
  }

  // mapping lantai 2
  // still need rework
  // please change @akbar
  // not my job ps: weka
  function secondfloor_mapper(array, arrayUser) {
    let arr = [];
    for (let i = array.length; i > 0; i--) {
      const index = array.length - i;
      if (array[index]) {
        if (array[index].status == "available") {
          const isSelected = arrayUser.includes(array[index].seat_id);
          const isHighlight = seatHighlight.includes(array[index].price);
          const isHoverHighlight = seatHoverHighlight.includes(
            array[index].price
          );
          arr.push(
            <div
              className={`rounded-base h-6 w-6 duration-300 hover:scale-150 ${
                statusColor[array[index].status]
              }  cursor-pointer text-center text-[0.7rem] ${
                isHighlight
                  ? "bg-gmco-orange-secondarylight"
                  : isHoverHighlight
                  ? "bg-gmco-yellow-secondary"
                  : ""
              } ${
                isSelected
                  ? "scale-150 border-2 border-red-500 bg-opacity-50"
                  : ""
              }`}
              onClick={() => onSeatPick(array[index], arrayUser)}
              onMouseEnter={() => {
                setPriceCategoryHoverHighlight([array[index].price]);
              }}
              onMouseLeave={() => {
                setPriceCategoryHoverHighlight([]);
              }}
            >
              {array[index].name}
            </div>
          );
        } else {
          arr.push(
            <div
              className={`rounded-base h-6 w-6 cursor-not-allowed ${
                statusColor[array[index].status]
              }  text-center text-[0.7rem]`}
            >
              {array[index].name}
            </div>
          );
        }
      } else {
        arr.push(<div className={`rounded-base h-6 w-6 bg-black`}></div>);
      }
    }
    return arr;
  }
  // sidebar
  function hideSideBar(isOpen) {
    isOpen ? setSideBarOpen(false) : setSideBarOpen(true);
  }

  // for debugging
  // function cek(halo) {
  //   console.log(halo);
  // }

  // Display
  // =================================
  return (
    <>
      <Loading isLoading={loading} />
      <NavigationBar doUpdate={update} />

      <div className="max-w-screen relative h-max overflow-hidden bg-gmco-blue-main">
        <div className="absolute h-64 w-screen overflow-hidden bg-gmco-grey">
          <Image
            src="/seatmap/GMCO.webp"
            className="h-full w-full object-cover object-center opacity-50"
            alt="bg gmco concert"
            width={3000}
            height={3000}
          />
        </div>
        <div className="relative p-7 pt-20">
          <p className="text-xl font-semibold text-gmco-white md:text-2xl">
            Anjangsana Simfoni
          </p>
          <p className="text-3xl font-bold text-gmco-white md:text-5xl">
            GMCO Concert #10
          </p>
        </div>
      </div>

      {/* SIDE BAR START */}
      {/* ================== */}
      <div className="flex h-max w-full flex-col bg-gmco-white md:flex-row">
        {/* Left Bar */}

        <div
          className={`${
            sideBarOpen ? "inline" : "hidden"
          } order-last flex w-full flex-col bg-gray-100 bg-opacity-50 drop-shadow-lg backdrop-blur-sm backdrop-filter md:order-first md:w-1/5`}
        >
          {/* Minimize Button */}
          <div className="my-3 flex w-full items-center justify-between pr-2">
            <p
              className={`mb-2 flex items-center pl-4 text-lg ${
                counter <= 10
                  ? "text-red-600"
                  : counter <= 60
                  ? "text-yellow-400"
                  : "text-gmco-grey"
              }`}
            >
              Refresh in &nbsp;
              <b>
                {Math.floor(counter / 60)}:{counter % 60}
              </b>
              <span>
                <ExclamationTriangleIcon
                  className={`ml-2 h-8 w-8 ${
                    counter <= 60 ? "inline" : "hidden"
                  }`}
                />{" "}
              </span>
            </p>

            <button
              className="hidden p-2 text-lg text-gmco-grey hover:scale-105 md:inline"
              onClick={() => {
                hideSideBar(sideBarOpen);
              }}
            >
              <XMarkIcon className="h-7 w-7 stroke-2" />
            </button>
          </div>

          {/* Milih Lantai */}
          <div className="flex w-full justify-center">
            <button
              onClick={() => setCurFloor(1)}
              className={`w-[45%] rounded-md py-2 font-semibold drop-shadow-md duration-300 ease-in-out hover:scale-105 ${
                curFloor === 1
                  ? "bg-gmco-blue-main text-gmco-white"
                  : "bg-gmco-white text-gmco-grey"
              }`}
            >
              Lantai 1
            </button>
            <div className="w-[2%]" />
            <button
              onClick={() => setCurFloor(2)}
              className={`w-[45%] rounded-md py-2 font-semibold drop-shadow-md duration-300 ease-in-out hover:scale-105 ${
                curFloor === 2
                  ? "bg-gmco-blue-main text-gmco-white"
                  : "bg-gmco-white text-gmco-grey"
              }`}
            >
              Lantai 2
            </button>
          </div>

          {/* Jumlah Kursi */}
          <div className="flex justify-between px-5 pt-3 md:pt-6">
            <div className="text-xl font-semibold md:text-2xl">
              Jumlah Kursi
              <p className="text-base font-normal">
                <span className="text-red-500">*</span>Maximal pembelian 5 kursi
              </p>
            </div>
            <div className="self-center text-lg font-semibold md:text-xl">
              {userSeatsPick.length} kursi
              <p className="text-base font-normal">
                <span className="text-red-500">*</span>Sisa {5 - purchasedSeat}
              </p>
            </div>
          </div>

          {/* Kategori Kursi */}
          <div className="px-5 pt-6 text-black">
            <div className="pb-3 text-xl font-semibold md:text-2xl">
              Kategori
              <p className="text-base font-normal">
                <span className="text-red-500">*</span>klik untuk melihat
              </p>
            </div>
            <div className="space-y-4">
              {priceCategory.map((namePrice) => (
                <div className="group relative flex border-b-4 border-gmco-grey">
                  <button
                    className={`group relative inline-block w-48 px-4 py-2 font-medium`}
                    onClick={() => {
                      seatHighlight.includes(namePrice.price)
                        ? setSeatHighlight([])
                        : setSeatHighlight([namePrice.price]);
                      namePrice.lantai == 1 ? setCurFloor(1) : setCurFloor(2);
                      priceCategoryHighlight.includes(namePrice.price)
                        ? setPriceCategoryHighlight([])
                        : setPriceCategoryHighlight([namePrice.price]);
                    }}
                    onMouseEnter={() => {
                      seatHoverHighlight.includes(namePrice.price)
                        ? setSeatHoverHighlight([])
                        : setSeatHoverHighlight([namePrice.price]);
                      namePrice.lantai == 1 ? setCurFloor(1) : setCurFloor(2);
                    }}
                    onMouseLeave={() => {
                      seatHoverHighlight.includes(namePrice.price)
                        ? setSeatHoverHighlight([])
                        : setSeatHoverHighlight([namePrice.price]);
                      namePrice.lantai == 1 ? setCurFloor(1) : setCurFloor(2);
                    }}
                  >
                    <span
                      className={`absolute inset-0 w-full translate-x-1 translate-y-1 transform bg-black transition duration-200 ease-out group-hover:-translate-x-0 group-hover:-translate-y-0 ${
                        priceCategoryHighlight.includes(namePrice.price)
                          ? "-translate-x-0 -translate-y-0 bg-gmco-yellow-secondary"
                          : "bg-gmco-grey"
                      }`}
                    ></span>
                    <span
                      className={`absolute inset-0 w-full border-2 border-black transition duration-200 ease-out group-hover:bg-gmco-orange-secondarydark ${
                        priceCategoryHighlight.includes(namePrice.price)
                          ? "bg-gmco-orange-secondarydark"
                          : priceCategoryHoverHighlight.includes(
                              namePrice.price
                            )
                          ? "bg-gmco-yellow-secondary"
                          : "bg-gmco-blue-main"
                      }`}
                    ></span>
                    <span
                      className={`relative text-gmco-white transition duration-200 ease-out group-hover:text-gmco-yellow ${
                        priceCategoryHighlight.includes(namePrice.price)
                          ? "text-gmco-yellow"
                          : priceCategoryHoverHighlight.includes(
                              namePrice.price
                            )
                          ? "text-gmco-grey"
                          : "text-gmco-white"
                      }`}
                    >
                      {namePrice.name}
                    </span>
                  </button>

                  <div className="flex basis-1/2 flex-wrap justify-end">
                    {userSeatsPick.map((item) =>
                      item.price == namePrice.price ? (
                        <span className="self-center pl-2">
                          {item.name}
                          {","}{" "}
                        </span>
                      ) : (
                        <></>
                      )
                    )}
                  </div>
                </div>
              ))}

              {/* Pesan Button */}
              <button
                className={`w-full rounded-lg px-10 py-2 text-white drop-shadow-md transition duration-200 ease-out ${
                  userSeats.length
                    ? "bg-gmco-orange-secondarylight opacity-100 hover:scale-105"
                    : "pointer-events-none bg-gmco-grey opacity-50"
                }`}
                onClick={() => clearSeats()}
              >Hapus Semua Pilihan</button>
              <button
                className={`rounded-lg px-10 py-2 text-white drop-shadow-md transition duration-200 ease-out ${
                  userSeats.length
                    ? "bg-gmco-orange-secondarylight opacity-100 hover:scale-105"
                    : "pointer-events-none bg-gmco-grey opacity-50"
                }`}
                onClick={() => postSeats(userSeats)}
              >
                Masukkan ke Cart
              </button>
            </div>
          </div>

          {/* Keterangan Kursi */}
          <div className="p-5">
            <div className="text-black">
              <p className="pb-3 text-xl font-semibold md:text-2xl">
                Keterangan Warna
              </p>
              <div className="flex flex-col gap-2 text-lg font-semibold">
                <div className="flex content-center gap-2">
                  <div className="h-5 w-5 self-center rounded-md bg-gmco-blue" />
                  <p>Available Seat</p>
                </div>
                <div className="flex content-center gap-2">
                  <div className="h-5 w-5 self-center rounded-md bg-gmco-grey-secondary" />
                  <p>Purchased</p>
                </div>
                <div className="flex content-center gap-2">
                  <div className="h-5 w-5 min-w-[1.25rem] self-center rounded-md bg-gmco-yellow-secondary" />
                  <div>
                    <p>Reserved Seat</p>
                    <p className="text-base font-normal">
                      <span className="text-red-500">*</span>Setelah 15 menit
                      tidak dibayar, kursi dapat dibeli kembali
                    </p>
                  </div>
                </div>
                <div className="flex content-center gap-2">
                  <div className="h-5 w-5 self-center rounded-md bg-gmco-yellow" />
                  <p>Reserved by Me</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${
            sideBarOpen ? "w-full md:w-4/5" : "w-full"
          } relative min-h-[60vh] overflow-hidden md:min-h-screen`}
        >
          {/* Hide Sidebar dan Zoom */}
          <div
            className={`pointer-events-none absolute z-10 flex h-full flex-col ${
              sideBarOpen ? "justify-end" : "justify-between"
            }`}
          >
            <button
              className={`pointer-events-auto m-3 ml-0 flex items-center rounded-r-lg bg-gmco-grey p-2 text-lg text-white hover:scale-105 ${
                sideBarOpen ? "hidden" : "inline"
              }`}
              onClick={() => {
                hideSideBar(sideBarOpen);
              }}
            >
              Detail{" "}
              <span>
                <ChevronRightIcon className="h-5 w-5" />
              </span>
            </button>

            <div className="pointer-events-auto m-3 flex w-max flex-col rounded-lg border-2 border-gmco-grey-secondary bg-gmco-white text-xl font-bold text-gmco-grey ">
              <button
                className={`h-max px-4 py-2 duration-300 hover:scale-150`}
                onClick={() => {
                  setScaleN(Math.min(scaleN + 1, 18));
                }}
              >
                +
              </button>
              <button
                className={`h-max px-4 py-2 duration-300 hover:scale-150`}
                onClick={() => {
                  setScaleN(Math.max(scaleN - 1, 0));
                }}
              >
                -
              </button>
            </div>
          </div>

          {/* ============================ */}
          {/* SEAT MAP START */}
          <div className="no-select h-full cursor-move justify-start overflow-scroll">
            <div
              className={`flex h-full w-max origin-top-left ${scaleFactor[scaleN]} flex-col items-center justify-start p-6`}
            >
              <div className="relative flex h-max w-3/4 translate-y-[100px] items-center justify-center">
                <Image
                  src="/seatmap/stage.png"
                  className="h-full w-full object-cover object-center"
                  alt="bg gmco concert"
                  width={2000}
                  height={2000}
                />
                <p className="absolute z-20 text-6xl text-gmco-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
                  Stage
                </p>
              </div>

              {/* Floor1 */}
              {/* ============================ */}
              <div
                className={`flex h-max w-max cursor-move pt-8 duration-300 ease-in-out ${
                  curFloor === 1 ? "inline" : "hidden"
                }`}
              >
                {/* Left wing */}
                <div className="pointer-events-none flex translate-x-10">
                  {/* left */}
                  {/* row wise */}
                  <div className="flex translate-x-12 rotate-[24deg] flex-col gap-2 bg-[url('/seatmap/frameleft.png')] bg-cover pl-5">
                    {l_seatmap.map((seats) => (
                      // col wise
                      <div
                        className={`pointer-events-auto flex origin-top-right flex-row justify-end gap-2`}
                      >
                        {left_mapper(seats, userSeats, priceCategory)}
                      </div>
                    ))}
                  </div>

                  {/* middle left */}
                  {/* row wise */}
                  <div className="flex translate-y-44 rotate-[12deg] flex-col items-center gap-[0.45rem] bg-[url('/seatmap/framemiddleleft.png')] bg-cover pb-12">
                    {ml_seatmap.map((seats, index) => (
                      // col wise
                      // prin)
                      <div
                        className={`pointer-events-auto flex gap-2 ${row_width[index]} justify-between`}
                      >
                        {left_mapper(seats, userSeats)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Wing */}
                <div className="pointer-events-none flex -translate-x-10">
                  {/* middle right */}
                  {/* row wise */}
                  <div className="flex translate-y-44 -rotate-[12deg] flex-col items-center gap-[0.45rem] bg-[url('/seatmap/framemiddleright.png')] bg-cover">
                    {mr_seatmap.map((seats, index) => (
                      // col wise
                      <div
                        className={`pointer-events-auto flex gap-2 ${row_width[index]} justify-between`}
                      >
                        {right_mapper(seats, userSeats)}
                      </div>
                    ))}
                  </div>

                  {/* right */}
                  {/* row wise */}
                  <div className="flex -translate-x-12 -rotate-[24deg] flex-col gap-2 bg-[url('/seatmap/frameright.png')] bg-cover pr-5">
                    {r_seatmap.map((seats) => (
                      // col wise
                      <div
                        className={`pointer-events-auto flex origin-top-right flex-row justify-start gap-2`}
                      >
                        {right_mapper(seats, userSeats)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floor2 */}
              {/* ============================ */}
              <div
                className={`b-24 flex h-full w-max cursor-move flex-col items-center duration-300 ease-in-out ${
                  curFloor === 2 ? "inline" : "hidden"
                }`}
              >
                <div className="relative flex h-3/4 items-center justify-center">
                  <Image
                    src="/seatmap/shadow_floor1.webp"
                    alt="floor1"
                    className="h-full w-auto p-20 opacity-10"
                    width={1000}
                    height={1000}
                  />
                  <p className="absolute z-20 text-4xl text-gmco-white opacity-70 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
                    Lantai 1
                  </p>
                </div>

                <div className="mt-2 flex gap-6 ">
                  <div className="flex -translate-y-36 rotate-[16deg] flex-col gap-2 bg-[url('/seatmap/frametop.png')] bg-cover pt-10">
                    {l_seatmap_2.map((seats) => (
                      // col wise
                      <div
                        className={`pointer-events-auto flex origin-top-right flex-row justify-end gap-2`}
                      >
                        {secondfloor_mapper(seats, userSeats)}
                      </div>
                    ))}
                  </div>
                  {/* middle left */}
                  {/* row wise */}
                  <div className="flex -translate-y-10 rotate-[12deg] flex-col gap-2 bg-[url('/seatmap/frametop.png')] bg-cover pt-10">
                    {ml_seatmap_2.map((seats) => (
                      // col wise
                      <div
                        className={`pointer-events-auto flex origin-top-right flex-row justify-start gap-2`}
                      >
                        {secondfloor_mapper(seats, userSeats)}
                      </div>
                    ))}
                  </div>
                  {/* middle */}
                  {/* row wise */}
                  <div className="flex flex-col gap-2 bg-[url('/seatmap/frametop.png')] bg-cover pb-12 pt-10">
                    {m_seatmap_2.map((seats) => (
                      // col wise
                      <div
                        className={`pointer-events-auto flex origin-top-right flex-row justify-end gap-2`}
                      >
                        {secondfloor_mapper(seats, userSeats)}
                      </div>
                    ))}
                  </div>
                  {/* middle right */}
                  {/* row wise */}
                  <div className="flex -translate-y-10 -rotate-[12deg] flex-col gap-2 bg-[url('/seatmap/frametop.png')] bg-cover pt-10">
                    {mr_seatmap_2.map((seats) => (
                      // col wise
                      <div
                        className={`pointer-events-auto flex origin-top-right flex-row justify-end gap-2`}
                      >
                        {secondfloor_mapper(seats, userSeats)}
                      </div>
                    ))}
                  </div>
                  {/* right */}
                  {/* row wise */}
                  <div className="flex -translate-y-36 -rotate-[16deg] flex-col gap-2 bg-[url('/seatmap/frametop.png')] bg-cover pt-10">
                    {r_seatmap_2.map((seats) => (
                      // col wise
                      <div
                        className={`pointer-events-auto flex origin-top-right flex-row justify-end gap-2`}
                      >
                        {secondfloor_mapper(seats, userSeats)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterBar />
    </>
  );
}
