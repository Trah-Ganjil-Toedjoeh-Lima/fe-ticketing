import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { useEffect, useRef } from "react";
import { useState } from "react";

export default function Profile() {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhoneNum, setIsEditingPhoneNum] = useState(false);
  const [name, setName] = useState("Reinhart Timothy");
  const [email, setEmail] = useState("reinhart.siregar@gmail.com");
  const [phoneNum, setPhoneNum] = useState("085155438410");

  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  const handleInputKeyDown = (event, setIsEditing) => {
    if (event.keyCode === 13) {
      setIsEditing(false);
    }
  };

  const handleInputBlur = (setIsEditing) => {
    setIsEditing(false);
  };

  const handleNameClick = () => {
    setIsEditingName(true);
  };

  const handleEmailClick = () => {
    setIsEditingEmail(true);
  };

  const handlePhoneNumClick = () => {
    setIsEditingPhoneNum(true);
  };

  return (
    <div className="bg-gmco-blue min-h-screen">
      <div className="flex flex-col mx-16">
        <div className="my-8 flex flex-col items-center">
          {isEditingName ? (
            <input
              className="my-2 text-center text-gmco-grey bg-transparent font-bold text-3xl"
              type="text"
              value={name}
              onChange={(event) => handleInputChange(event, setName)}
              onBlur={() => handleInputBlur(setIsEditingName)}
              onKeyDown={(event) => handleInputKeyDown(event, setIsEditingName)}
              disabled={!isEditingName}
              autoFocus
            />
          ) : (
            <h1
              className="text-gmco-grey font-bold text-3xl text-center"
              onClick={handleNameClick}
            >
              {name}
            </h1>
          )}

          {isEditingEmail ? (
            <input
              className="my-2 text-center text-gmco-grey bg-transparent text-xl"
              type="text"
              value={email}
              onChange={(event) => handleInputChange(event, setEmail)}
              onBlur={() => handleInputBlur(setIsEditingEmail)}
              onKeyDown={(event) =>
                handleInputKeyDown(event, setIsEditingEmail)
              }
              disabled={!isEditingEmail}
              autoFocus
            />
          ) : (
            <p
              className="text-center text-gmco-grey text-xl"
              onClick={handleEmailClick}
            >
              {email}
            </p>
          )}

          {isEditingPhoneNum ? (
            <input
              className="my-2 text-center text-gmco-grey bg-transparent text-xl"
              type="text"
              value={phoneNum}
              onChange={(event) => handleInputChange(event, setPhoneNum)}
              onBlur={() => handleInputBlur(setIsEditingPhoneNum)}
              onKeyDown={(event) =>
                handleInputKeyDown(event, setIsEditingPhoneNum)
              }
              disabled={!isEditingPhoneNum}
              autoFocus
            />
          ) : (
            <p
              className="text-center text-gmco-grey text-xl"
              onClick={handlePhoneNumClick}
            >
              {phoneNum}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-center text-gmco-grey text-2xl font-medium text-start">
            My Tickets
          </p>
          {/* This is the ticket */}
          <div className="bg-white grid grid-col rounded-lg p-4">
            {/*Header: Event name */}
            <div className="flex flex-row">
              <Image src="/violin-picture.png" width={20} height={20} />
              <p className="text-gray-700 mx-2">Grand Concert GMCO 2023</p>
            </div>

            <hr class="h-px my-2 bg-gray-300 border-0"></hr>

            {/* Seat name and QR */}
            <div className="flex flex-row h-full items-center">
              <h2 className="text-gmco-grey font-bold text-4xl w-1/2">
                Seat A6
              </h2>
              <div className="flex flex-row w-1/2 justify-end">
                <Image
                  src="/qris-reinhart.png"
                  width={100}
                  height={100}
                ></Image>
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

          {/* This is the ticket */}
          <div className="bg-white grid grid-col rounded-lg p-4">
            {/*Header: Event name */}
            <div className="flex flex-row">
              <Image src="/violin-picture.png" width={20} height={20} />
              <p className="text-gray-700 mx-2">Grand Concert GMCO 2023</p>
            </div>

            <hr class="h-px my-2 bg-gray-300 border-0"></hr>

            {/* Seat name and QR */}
            <div className="flex flex-row h-full items-center">
              <h2 className="text-gmco-grey font-bold text-4xl w-1/2">
                Seat A7
              </h2>
              <div className="flex flex-row w-1/2 justify-end">
                <Image
                  src="/qris-reinhart.png"
                  width={100}
                  height={100}
                ></Image>
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

          {/* This is the ticket */}
          <div className="bg-white grid grid-col rounded-lg p-4 ">
            {/*Header: Event name */}
            <div className="flex flex-row">
              <Image src="/violin-picture.png" width={20} height={20} />
              <p className="text-gray-700 mx-2">Grand Concert GMCO 2023</p>
            </div>

            <hr class="h-px my-2 bg-gray-300 border-0"></hr>

            {/* Seat name and QR */}
            <div className="flex flex-row h-full items-center">
              <h2 className="text-gmco-grey font-bold text-4xl w-1/2">
                Seat A8
              </h2>
              <div className="flex flex-row w-1/2 justify-end">
                <Image
                  src="/qris-reinhart.png"
                  width={100}
                  height={100}
                ></Image>
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
    </div>
  );
}
