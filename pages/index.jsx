import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { useEffect, useRef } from "react";
import { RevealWrapper } from "next-reveal";
import Navbar1 from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar1 />
      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative h-screen">
          <video
            preload="auto"
            playsInline
            autoPlay
            muted
            loop
            className="absolute w-full h-full -skew-y-2 object-cover"
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
          <RevealWrapper
            rotate={{ x: 10, y: 40, z: 0 }}
            origin="left"
            delay={100}
            duration={2000}
            distance="500px"
            reset={true}
          >
            <div className="relative flex items-center align-center h-screen bg-right bg-cover z-10">
              <div className="text-left pl-20">
                <p className="text-5xl text-white">WHAT ARE YOU WAITING FOR?</p>
                <h2 className="text-7xl text-white font-bold mb-6">
                  GMCO Live from the Living Room:
                  <br />
                  Indonesian Pop Now and Then
                </h2>
                <div className="flex w-max items-center gap-4 py-4 px-6 bg-white/50 rounded-xl">
                  <p className="py-2 px-4 text-black text-lg">Saturday</p>
                  <p className="py-2 px-4 text-black text-lg">12/11/2022</p>
                  <p className="py-2 px-4 text-black text-lg">
                    Auditorium MM FEB UGM
                  </p>
                  <button className="py-2 px-4 bg-gmco-blue-main rounded-xl transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 hover:bg-gmco-orange-secondarydark duration-300">
                    <Link href="/"> Buy Ticket Now! </Link>
                  </button>
                </div>
              </div>
            </div>
          </RevealWrapper>
        </div>

        {/* Home Content 1 */}
        <RevealWrapper origin="bottom" duration={1000} distance="500px">
          <div className="flex container items-center justify-between mx-auto px-10 py-20">
            <div className="w-full">
              <div className="w-3/4">
                <Image
                  src="/logo_gmco.webp"
                  alt="logo gmco.jpg"
                  className="w-full h-auto mx-auto"
                  width={500}
                  height={500}
                />
              </div>
            </div>
            <div className="w-full">
              <div className="py-12">
                <div className="uppercase tracking-wide text-xl font-bold text-red-400">
                  About
                </div>
                <h1 className="text-gray-900 mt-2 mb-4 text-4xl leading-tight font-semibold">
                  GMCO Live from the Living Room
                </h1>
                <p className="text-gray-900 mb-4 text-lg leading-normal">
                  GMCO Live from the Living Room merupakan sebuah intimate
                  orchestra concert yang dilaksanakan oleh Unit Kegiatan
                  Mahasiswa Gadjah Mada Chamber Orchestra (GMCO UGM). Konser
                  intim ini merupakan konser inovasi GMCO dengan nuansa santai
                  layaknya suasana ruang keluarga, tetapi tetap mempertahankan
                  esensi dan kualitas penampilan orkestra itu sendiri.
                </p>
                <p className="text-gray-900 mb-4 text-lg leading-normal">
                  Selain penampilan dari para pemain GMCO, konser ini akan
                  dimeriahkan oleh penampilan bintang tamu, penyanyi pria
                  nasional, yaitu Sal Priadi. GMCO Live from the Living Room
                  akan menjadi konser orkestra intim yang unik dan diminati
                  banyak penikmat musik Yogyakarta.
                </p>
                <a className="text-white" href="https://gmco.ukm.ugm.ac.id/">
                  <button className="py-3 px-6 bg-gmco-blue-main rounded-xl transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 hover:bg-gmco-orange-secondarydark duration-300">
                    More About GMCO
                  </button>
                </a>
              </div>
            </div>
          </div>
        </RevealWrapper>

        {/* Home Content 1 */}
      </div>
    </>
  );
}
