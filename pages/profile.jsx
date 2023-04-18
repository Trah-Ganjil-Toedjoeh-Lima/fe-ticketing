import Image from "next/image";
import { useRouter } from "next/router";
import { Inter, Rubik } from "next/font/google";
import Link from "next/link";

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
  const router = useRouter();
  const [token, setToken] = useState("");

  {
    /*
useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("auth_token")) {
        router.push("/auth");
      }
    }
  }, []);
*/
  }

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
      <div className='min-h-screen w-screen bg-gmco-white'>
        <div className='relative w-screen overflow-hidden'>
          <img
            className='h-64 w-full scale-105 object-cover object-top blur-[5px] brightness-75 '
            src='/GMCO_10.webp'
          ></img>
          <div className='absolute left-0 top-0 flex h-full w-full flex-col py-16 lg:flex-row'>
            <div className='flex h-full w-1/5 items-center px-16'>
              <h1 className='font-rubik text-5xl font-light text-white'>
                PROFIL
              </h1>
              <hr className='my-8 h-px border-0 bg-gmco-grey' />
            </div>

            <div className='flex w-4/5 flex-col items-start px-16 lg:items-end'>
              <h1 className='mt-8 font-rubik text-xl font-semibold text-[#F5DB91]'>
                Reinhart Timothy
              </h1>
              <p className='font-rubik font-normal text-[#F5DB91]'>
                reinhart.siregar@gmail.com
              </p>
              <p className='font-rubik font-normal text-[#F5DB91]'>
                1-800-273-8255
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className='flex w-full flex-col divide-x lg:flex-row'>
          {/* EDIT IDENTITY */}
          <div className='relative flex w-full flex-col items-start bg-[#C0925E] px-8 py-8 lg:w-1/3'>
            {/* Name */}
            <p className='font-rubik text-white'>Nama</p>

            <input
              className='mb-8 w-full rounded-lg border-transparent bg-white text-start text-lg focus:border-gmco-blue focus:ring-gmco-blue'
              type='text'
              value={name}
              onChange={(event) => handleInputChange(event, setName)}
              placeholder='Masukkan Nama Anda'
            />

            {/*Email*/}
            <div className='flex flex-row'>
              <p className='font-rubik text-white'>Email</p>
              <p className='text-red-700'>*</p>
            </div>
            <input
              className='mb-8 w-full rounded-lg border-transparent bg-white text-start text-lg focus:border-gmco-blue focus:ring-gmco-blue'
              type='text'
              value={email}
              onChange={(event) => handleInputChange(event, setEmail)}
              placeholder='Masukkan Email Anda'
            />

            {/* Phone Number */}

            <p className='font-rubik text-white'>Nomor WhatsApp</p>
            <input
              className='mb-8 w-full rounded-lg border-transparent bg-white text-start text-lg focus:border-gmco-blue focus:ring-gmco-blue'
              type='text'
              value={phoneNum}
              onChange={(event) => handleInputChange(event, setPhoneNum)}
              placeholder='Masukkan Nomor WhatsApp Anda'
            />
            <button className='mt-12 w-full rounded-lg bg-[#932F2F] p-2 text-center font-inter text-lg font-semibold text-white'>
              PERBARUI PROFIL
            </button>
          </div>

          {/* List of Tickets */}
          <div className="flex w-full flex-col gap-4 px-8 py-8 lg:w-2/3">
            <p className="text-start text-2xl font-medium text-gmco-grey">
              Pembelian Saya &#40;{tickets.length}&#41;
            </p>
            {/* TICKET */}

            {tickets.map((ticket, index) => (
              <div key={index} className="flex h-full w-full flex-row rounded-lg bg-white p-4">
                {/* Kursi dan Tipe */}
                <div className='flex w-1/5 flex-col justify-center text-center'>
                  <h1 className='font-rubik text-lg font-bold text-gmco-grey sm:text-xl lg:text-2xl'>
                    Seat A{ticket}
                  </h1>
                  <p className='w-full rounded-lg bg-[#F5DB91] text-center text-sm font-normal text-gmco-grey lg:text-base'>
                    RADIANT
                  </p>
                </div>

                {/* Waktu dan Tempat */}
                <div className='flex w-full items-center justify-end'>
                  <div className='flex h-full flex-col justify-center gap-2 text-end text-xs sm:text-sm lg:text-base'>
                    <p>Auditorium Driyarkara</p>
                    <p>Sabtu, 27 Mei 2023</p>
                    <p>Open Gate 18.00 WIB</p>
                  </div>
                  <div className='overflow-hidden'>
                    <Image src='/qris-reinhart.webp' width={100} height={100} />
                  </div>

                  {/* Nama Konser */}
                  <div className='flex w-1/2 items-center rounded-lg bg-gmco-grey py-4 pr-4'>
                    <div className='mx-2 overflow-hidden'>
                      <Image
                        src='/violin-picture.webp'
                        width={80}
                        height={80}
                      />
                    </div>

                    <div className='flex w-full flex-col text-start sm:text-end'>
                      <h1 className='font-inter text-sm font-bold text-white sm:text-lg lg:text-2xl'>
                        Grand Concert Vol.10
                      </h1>
                      <p className="font-inter text-sm font-light text-white lg:text-lg">
                        Anjangsana Simfoni
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FooterBar />
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { req } = ctx;
  let baseURL = "";
  if (`https://${req.headers.host}/` === process.env.NEXT_PUBLIC_BASE_URL) {
    baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  }
  return { props: {} };
}
