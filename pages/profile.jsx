import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { useEffect, useRef } from "react";

export default function Profile() {
  return (
    <div className="bg-gmco-grey min-h-screen">
      <div className="grid grid-rows-1 mx-16 md:grid-rows-2 lg:grid-rows-3">
        {/* This is the ticket */}
        <div className="bg-gray-200 flex flex-col rounded-lg p-4 mt-4">
          {/*Header: Event name */}
          <div className="flex flex-row">
            <Image src="/violin-picture.png" width={20} height={20} />
            <p className="text-gray-700 mx-2">Grand Concert GMCO 2023</p>
          </div>

          <hr class="h-px my-2 bg-gray-300 border-0"></hr>

          {/* Seat name and QR */}
          <div className="flex flex-row h-full items-center">
            <p className="text-black font-bold text-4xl w-1/2">Seat A6</p>
            <div className="flex flex-row w-1/2 justify-end">
              <Image src="/qris-reinhart.png" width={100} height={100}></Image>
            </div>
          </div>
          {/* Footer */}
          <div className="flex flex-col mt-2">
            {/*Location, Date, Time*/}
            <p className="text-gray-700">
              Auditorium Driyarkara | Sabtu, 27 Mei 2023 | Open Gate 17:00 WIB
            </p>

            {/*valid for 1 person */}
            <div className="bg-green-400 bg-opacity-25 w-fit">
              <p className="text-green-700 font-medium">Valid for 1 person</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
