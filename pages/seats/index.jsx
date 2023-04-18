/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import NavigationBar from "@/components/navbar";
import FooterBar from "@/components/footer";
import { axiosInstance } from "@/atoms/config";
import { notifyError } from "@/components/notify";

export default function Seats() {
  const [l_seatmap, set_L_seatmap] = useState([]);
  const [ml_seatmap, set_ML_seatmap] = useState([]);
  const [mr_seatmap, set_MR_seatmap] = useState([]);
  const [r_seatmap, set_R_seatmap] = useState([]);
  const [userSeats, setUserSeats] = useState([]);
  const [userSeatsPick, setUserSeatsPick] = useState([]);
  const [sideBarOpen, setSideBarOpen] = useState(true);

  const mappers = [
    { A: [0, 8, 8, 0] },
    { B: [13, 9, 9, 13] },
    { C: [15, 9, 9, 13] },
    { D: [15, 10, 11, 14] },
    { E: [16, 11, 11, 16] },
    { F: [17, 12, 12, 17] },
    { G: [17, 12, 12, 17] },
    { H: [16, 13, 13, 15] },
    { I: [15, 14, 14, 13] },
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
    { T: [0, 0, 0, 7] },
  ];
  const start_mappers = {
    A: [0, 1, 9, 0],
    B: [1, 14, 23, 32],
    C: [1, 16, 25, 34],
    D: [1, 16, 26, 37],
    E: [1, 17, 28, 39],
    F: [1, 18, 30, 42],
    G: [1, 18, 30, 42],
    H: [1, 17, 30, 43],
    I: [1, 16, 30, 44],
    J: [1, 15, 29, 43],
    K: [1, 14, 29, 44],
    L: [1, 13, 28, 43],
    M: [1, 12, 28, 44],
    N: [1, 11, 27, 43],
    O: [1, 11, 29, 46],
    P: [1, 10, 28, 45],
    Q: [1, 9, 27, 45],
    R: [1, 8, 27, 46],
    S: [1, 8, 27, 46],
    T: [0, 0, 0, 1],
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

  const priceColor = {
    120000: "bg-opacity-100",
    170000: "bg-opacity-60",
    145000: "bg-opacity-40",
    85000: "bg-opacity-20",
    60000: "bg-opacity-0",
  };

  const statusColor = {
    available: "bg-[#5C9E82]",
    reserved_by_me: "bg-[#F5DB91]",
    purchased_by_me: "bg-[#5C9E82]",
    reserved: "bg-[#C0925E]",
    purchased: "bg-[#7E7E7E]",
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get("/v1/seat_map");
        // const res = await axiosInstance.get("seatmap.json");
        seatMapping(res.data.data);
      } catch (err) {
        notifyError(err);
      }
    })();
  }, []);

  function circle(x, r) {
    return;
  }

  async function postSeats(seatsArr) {
    try {
      await axiosInstance.post("/v1/seat_map", {
        data: seatsArr,
      });
    } catch (err) {
      notifyError(err);
    }
  }

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
      let lengthsArr = Object.values(mapper);

      for (const lengths of lengthsArr) {
        for (const length of lengths.entries()) {
          let index = length[0];
          let value = length[1];
          seatDict[index][row] = new Array(value);
        }

        value.forEach((item) => {
          if (
            item.column >= 0 &&
            item.column <= lengths[0] &&
            item.row == row
          ) {
            if (seatArr[0]) {
              seatArr[0].push(item);
            } else {
              seatArr[0] = [item];
            }
          } else if (
            item.column > lengths[0] &&
            item.column <= lengths[0] + lengths[1] &&
            item.row == row
          ) {
            if (seatArr[1]) {
              seatArr[1].push(item);
            } else {
              seatArr[1] = [item];
            }
          } else if (
            item.column > lengths[0] + lengths[1] &&
            item.column <= lengths[0] + lengths[1] + lengths[2] &&
            item.row == row
          ) {
            if (seatArr[2]) {
              seatArr[2].push(item);
            } else {
              seatArr[2] = [item];
            }
          } else if (
            item.column > lengths[0] + lengths[1] + lengths[2] &&
            item.column <= lengths[0] + lengths[1] + lengths[2] + lengths[3] &&
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

    // for each major division, group the data into the coressponding row (row A, row B, etc)
    for (const entry of seatArr.entries()) {
      // console.log(entry)
      if (entry) {
        const datas = entry[1];
        const index = entry[0];
        for (const item of datas) {
          seatDict[index][item.row][
            item.column - start_mappers[item.row][index]
          ] = item;
          // console.log(start_mappers[item.row][index])
        }
        arr[index] = Object.values(seatDict[index]);
      }
    }

    // make into different variable
    set_L_seatmap(arr[0]);
    set_ML_seatmap(arr[1]);
    set_MR_seatmap(arr[2]);
    set_R_seatmap(arr[3]);

    return arr;
  }

  // Seat Clicking Behavior
  // arrayUser.includes(array.seat_id)
  //   ? (setUserSeats(userSeats.filter((item) => item !== array.seat_id)),
  //     setUserSeatsPick(
  //       userSeatsPick.filter((item) => item.name !== array.name)
  //     ))
  //   : arrayUser.length < 5
  //   ? (setUserSeats([...userSeats, array.seat_id]),
  //     setUserSeatsPick([...userSeatsPick, array]))
  //   : notifyError({
  //       response: { data: { error: "Maksimum pembelian kursi adalah 5" } },
  //     });
  function onSeatPick(array, arrayUser) {
    if (arrayUser.includes(array.seat_id)) {
      setUserSeats(userSeats.filter((item) => item !== array.seat_id));
      setUserSeatsPick(
        userSeatsPick.filter((item) => item.name !== array.name)
      );
    } else if (userSeats.length < 5) {
      setUserSeats([...userSeats, array.seat_id]);
      setUserSeatsPick([...userSeatsPick, array]);
    } else {
      notifyError({
        response: { data: { error: "Maksimum pembelian kursi adalah 5" } },
      });
    }
  }

  function left_mapper(array, arrayUser) {
    let arr = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i]) {
        if (array[i].status === "available") {
          const isSelected = userSeats.includes(array[i].seat_id);
          arr.push(
            <div
              className={`bg-gmco-yellow duration-300 hover:scale-150 ${deg_rot[i]}`}
            >
              <div
                className={`h-6 w-6 rounded-sm ${
                  statusColor[array[i].status]
                } ${
                  priceColor[array[i].price]
                } cursor-pointer text-center text-[0.7rem] ${
                  isSelected ? "border-2 border-red-500" : ""
                }`}
                onClick={() => {
                  onSeatPick(array[i], arrayUser);
                  array[i].isSelected = isSelected;
                }}
              >
                {array[i].name}
              </div>
            </div>
          );
        } else {
          arr.push(
            <div
              className={`h-6 w-6 cursor-not-allowed rounded-sm ${
                statusColor[array[i].status]
              }  text-center text-[0.7rem] ${deg_rot[i]}`}
            >
              {array[i].name}
            </div>
          );
        }
      } else {
        arr.push(
          <div className={`h-6 w-6 rounded-sm bg-black ${deg_rot[i]}`}></div>
        );
      }
    }
    return arr;
  }

  function right_mapper(array, arrayUser) {
    let arr = [];
    for (let i = array.length; i > 0; i--) {
      if (array[array.length - i]) {
        if (array[array.length - i].status == "available") {
          const isSelected = arrayUser.includes(
            array[array.length - i].seat_id
          );
          arr.push(
            <div
              className={`bg-gmco-yellow duration-300 hover:scale-150 ${
                deg_rot[i-1]
              }`}
            >
              <div
                className={`h-6 w-6 rounded-sm ${
                  statusColor[array[array.length - i].status]
                } ${
                  priceColor[array[array.length - i].price]
                } cursor-pointer text-center text-[0.7rem]  ${
                  isSelected ? "border-2 border-red-500" : ""
                }`}
                onClick={() => onSeatPick(array[array.length - i], arrayUser)}
              >
                {array[array.length - i].name}
              </div>
            </div>
          );
        } else {
          arr.push(
            <div
              className={`h-6 w-6 cursor-not-allowed rounded-sm ${
                statusColor[array[array.length - i].status]
              }  text-center text-[0.7rem] ${deg_rot[i - 1]}`}
            >
              {array[array.length - i].name}
            </div>
          );
        }
      } else {
        arr.push(
          <div
            className={`h-6 w-6 rounded-sm bg-black ${deg_rot[i - 1]}`}
          ></div>
        );
      }
    }
    return arr;
  }

  function hideSideBar(isOpen) {
    isOpen ? setSideBarOpen(false) : setSideBarOpen(true);
  }

  function cek(halo) {
    console.log(halo);
  }

  // Display
  // =================================
  return (
    <>
      <NavigationBar />
      <div className="h-40 bg-gmco-blue-main">
        <div className="p-7">
          <p className="text-2xl font-semibold text-gmco-white">
            Season 3 • Concert
          </p>
          <p className="text-5xl font-bold text-gmco-white">
            GMCO best concert
          </p>
          <p className="mt-3 text-base font-bold text-gmco-white">
            Yogyakarta, Gawk Gawk
          </p>
        </div>
      </div>

      <div className="grid h-screen grid-cols-5 ">
        {/* Sementara Hidden */}
        {/* Left Bar */}

        <div
          className={`${
            sideBarOpen ? "inline" : "hidden"
          } col-span-1 border-r-4`}
        >
          {/* Minimize Button */}
          <div className="mt-3 flex w-full justify-end">
            <button
              className=" rounded-lg bg-[#C76734] p-2 text-lg text-white"
              onClick={() => {
                hideSideBar(sideBarOpen);
              }}
            >
              Hide Details {sideBarOpen ? <span>&gt;</span> : <span>&lt;</span>}
            </button>
          </div>
          {/* Jumlah Kursi */}
          <div className="my-3 flex flex-row gap-2 bg-[#F5DB91] p-5 py-9">
            <div
              className="flex basis-1/2 text-3xl font-semibold
            "
            >
              Jumlah Kursi
            </div>
            <div className="basis-1/2 self-center text-2xl">
              {userSeatsPick.length} kursi
            </div>
          </div>
          {/* Kategori Kursi */}
          <div className="my-3 bg-[#287D92] p-5 py-9 text-white">
            <div className="pb-3 text-3xl font-semibold">Kategori</div>
            <div className="flex flex-col text-xl">
              <div className="flex flex-row">
                <div className="basis-1/2">Radiant</div>
                <div className="basis-1/2">
                  {userSeatsPick.map((item) =>
                    item.price == 120000 ? (
                      <span>
                        {item.name}
                        {","}{" "}
                      </span>
                    ) : (
                      <></>
                    )
                  )}
                </div>
              </div>

              <div className="flex flex-row">
                <div className="basis-1/2">Immortal</div>
                <div className="basis-1/2">
                  {userSeatsPick.map((item) =>
                    item.price == 170000 ? (
                      <span>
                        {item.name}
                        {","}{" "}
                      </span>
                    ) : (
                      <></>
                    )
                  )}
                </div>
              </div>

              <div className="flex flex-row">
                <div className="basis-1/2">Ascendant</div>
                <div className="basis-1/2">
                  {userSeatsPick.map((item) =>
                    item.price == 145000 ? (
                      <span>
                        {item.name}
                        {","}{" "}
                      </span>
                    ) : (
                      <></>
                    )
                  )}
                </div>
              </div>
              <div className="flex flex-row">
                <div className="basis-1/2">Diamond</div>
                <div className="basis-1/2">
                  {userSeatsPick.map((item) =>
                    item.price == 85000 ? (
                      <span>
                        {item.name}
                        {","}{" "}
                      </span>
                    ) : (
                      <></>
                    )
                  )}
                </div>
              </div>
              <div className="flex flex-row">
                <div className="basis-1/2">Platinum</div>
                <div className="basis-1/2">
                  {userSeatsPick.map((item) =>
                    item.price == 60000 ? (
                      <span>
                        {item.name}
                        {","}{" "}
                      </span>
                    ) : (
                      <></>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Keterangan Kursi */}
          <div className="my-3 bg-[#8EBFD0] p-5 ">
            <div className=" text-gmco-grey">
              <p className="pb-3 text-3xl font-semibold">Keterangan</p>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row content-center gap-2">
                  <div className="h-4 w-4 self-center rounded-md bg-[#5C9E82]"></div>
                  <p>Kursi Kosong</p>
                </div>
                <div className="flex flex-row content-center gap-2">
                  <div className="h-4 w-4 self-center rounded-md bg-[#B8DEE9]"></div>
                  <p>Kursi Terbeli Oleh Saya</p>
                </div>
                <div className="flex flex-row content-center gap-2">
                  <div className="h-4 w-4 self-center rounded-md bg-[#C0925E]"></div>
                  <p>Kursi Dipesan</p>
                </div>
                <div className="flex flex-row content-center gap-2">
                  <div className="h-4 w-4 self-center rounded-md bg-[#F5DB91]"></div>
                  <p>Kursi Dipilih Oleh Saya</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SeatMap
        {sideBarOpen ? <></> : (<div className="mt-3 flex w-full justify-end">
            <button className=" rounded-lg bg-[#C76734] p-2 text-lg text-white" onClick={() => {
              hideSideBar(sideBarOpen);
            }}>
              Hide Details {sideBarOpen ? <span>&gt;</span> : <span>&lt;</span>}
            </button>
          </div>)} */}

        <div
          className={`${
            sideBarOpen ? "col-span-4" : "col-span-full"
          } overflow-auto overflow-x-scroll p-4`}
        >
          <a
            onClick={() => {
              cek(userSeats), postSeats(userSeats);
            }}
            className="flex justify-center text-2xl font-semibold text-gmco-grey"
          >
            Lantai 1
          </a>

          {/* Ideku ini scale di 95% aja nanti dikasi tombol + sama - */}
          <div className="flex scale-[75%] justify-center pt-8">
            {/* Left wing */}
            <div className="pointer-events-none flex translate-x-10">
              {/* left */}
              {/* row wise */}
              <div className="flex translate-x-12 rotate-[24deg] flex-col gap-2">
                {l_seatmap.map((seats) => (
                  // col wise
                  <div
                    className={`pointer-events-auto flex origin-top-right flex-row justify-end gap-2`}
                  >
                    {left_mapper(seats, userSeats)}
                  </div>
                ))}
              </div>

              {/* middle left */}
              {/* row wise */}
              <div className="flex translate-y-40 rotate-[12deg] flex-col items-center gap-[0.45rem]">
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
              <div className="pointer-events-none flex translate-y-40 -rotate-[12deg] flex-col items-center gap-[0.45rem]">
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
              <div className="pointer-events-none flex -translate-x-12 -rotate-[24deg] flex-col gap-2">
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
        </div>
      </div>
      <FooterBar />
    </>
  );
}
