import Image from "next/image";
import { Inter, Rubik } from "next/font/google";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

import { useEffect, useRef } from "react";
import { useState } from "react";

import NavigationBar from "@/components/navbar";
import FooterBar from "@/components/footer";

export default function Profile() {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhoneNum, setIsEditingPhoneNum] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const tickets = [6, 7, 8, 9, 10, 11, 12];

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
    <>
      {/* HEADER */}
      <NavigationBar />
      <div className="bg-gmco-white min-h-screen">
        {/* PREFVIOUS HEADER JUST IN CASE I BUTUH LAGI
                <div className="flex flex-row w-full bg-[#932F2F] py-16 items-center">
          <div className="w-1/2 h-full mx-16 text-start">
            <h1 className="text-[#F5DB91] font-bold font-rubik text-5xl">
              PROFILE
            </h1>
          </div>

          <div className="w-1/2 mx-16 flex flex-col items-end">
            <h1 className="text-white font-rubik font-semibold text-xl mt-8">
              Reinhart Timothy
            </h1>
            <p className="text-white font-rubik font-normal">
              reinhart.siregar@gmail.com
            </p>
            <p className="text-white font-rubik font-normal">1-800-273-8255</p>
          </div>
        </div>
        */}

        {/* PROFIL DAN HEADER */}

        <div className="relative">
          <img
            className="h-64 w-full object-cover object-top blur-[3px]"
            src="GMCO-10.jpg"
          ></img>
          <div className="absolute top-0 left-0 w-full h-full flex flex-row py-16 ">
            <div className="w-1/2 h-full mx-16 text-start">
              <h1 className="text-[#F5DB91] font-bold font-rubik text-5xl">
                PROFILE
              </h1>
            </div>

            <div className="w-1/2 mx-16 flex flex-col items-end">
              <h1 className="text-white font-rubik font-semibold text-xl mt-8">
                Reinhart Timothy
              </h1>
              <p className="text-white font-rubik font-normal">
                reinhart.siregar@gmail.com
              </p>
              <p className="text-white font-rubik font-normal">
                1-800-273-8255
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="w-full flex flex-row divide-x">
          {/* EDIT IDENTITY */}
          <div className="w-1/3 pt-16 px-8 flex flex-col items-start bg-[#C0925E]">
            {/* Name */}
            <p className="text-white font-rubik">Nama</p>

            <input
              className="my-2 w-full text-xl text-start border-transparent focus:ring-gmco-blue focus:border-gmco-blue bg-white rounded-lg"
              type="text"
              value={name}
              onChange={(event) => handleInputChange(event, setName)}
              placeholder="Masukkan Nama Anda"
            />

            {/*Email*/}
            <div className="flex flex-row">
              <p className="text-white font-rubik">Email</p>
              <p className="text-red-700">*</p>
            </div>
            <input
              className="my-2 w-full text-xl text-start border-transparent focus:ring-gmco-blue focus:border-gmco-blue bg-white rounded-lg"
              type="text"
              value={email}
              onChange={(event) => handleInputChange(event, setEmail)}
              placeholder="Masukkan Email Anda"
            />

            {/* Phone Number */}

            <p className="text-white font-rubik">Nomor WhatsApp</p>
            <input
              className="my-2 w-full text-xl border-transparent text-start focus:ring-gmco-blue focus:border-gmco-blue bg-white rounded-lg"
              type="text"
              value={phoneNum}
              onChange={(event) => handleInputChange(event, setPhoneNum)}
              placeholder="Masukkan Nomor WhatsApp Anda"
            />
            <button className="w-full rounded-lg bg-[#932F2F] text-center text-white font-inter font-semibold text-xl p-4 mt-16">
              PERBARUI PROFIL
            </button>
          </div>

          {/* List of Tickets */}
          <div className="w-3/5 flex flex-col gap-4 py-12 pl-8">
            <p className="text-center text-gmco-grey text-2xl font-medium text-start">
              My Tickets &#40;{tickets.length}&#41;
            </p>
            {/* TICKET */}

            {tickets.map((ticket) => (
              <div className="w-full h-full bg-white flex flex-row rounded-lg p-4">
                {/* Kursi dan Tipe */}
                <div className="w-1/5 flex flex-col h-full justify-center text-center">
                  <h1 className="text-gmco-grey font-rubik font-bold text-4xl inline-block">
                    Seat A{ticket}
                  </h1>
                  <p className="bg-[#F5DB91] text-center text-gmco-grey font-normal inline-block w-full rounded-lg">
                    RADIANT
                  </p>
                </div>

                {/* Waktu dan Tempat */}
                <div className="w-full flex flex-row justify-end">
                  <div className="flex flex-col h-full justify-center text-end text-lg">
                    <p>Auditorium Driyarkara</p>
                    <p>Sabtu, 27 Mei 2023</p>
                    <p>Open Gate 18.00 WIB</p>
                  </div>
                  <Image
                    src="/qris-reinhart.png"
                    width={100}
                    height={100}
                  ></Image>
                  {/* Nama Konser */}
                  <div className="w-1/2 flex flex-row bg-gmco-grey rounded-lg items-center p-4">
                    <Image
                      src="/violin-picture.png"
                      width={80}
                      height={80}
                      className="2-1/2 justify-start"
                    />
                    <div className="w-full flex flex-col text-end">
                      <h1 className="font-inter font-bold text-white font-semibold text-4xl">
                        Grand Concert Vol.10
                      </h1>
                      <p className="font-inter text-white font-light text-xl">
                        'Anjangsana Simfoni'
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* This is the ticket */}
          </div>
        </div>
      </div>

      <FooterBar />
    </>
  );
}
