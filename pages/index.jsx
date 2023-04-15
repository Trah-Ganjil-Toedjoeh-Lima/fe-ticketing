import Image from "next/image";
import Link from "next/link";

import { RevealWrapper } from "next-reveal";

import NavigationBar from "@/components/navbar";
import FooterBar from "@/components/footer";

export default function Home() {

  return (
    <>
      <NavigationBar />
      <div className="bg-gmco-white">
        {/* Hero Section */}
        <div className="relative h-[50vh] md:h-screen w-screen overflow-hidden">
          <video
            preload="auto"
            playsInline
            autoPlay
            muted
            loop
            className="absolute w-full h-full object-cover scale-[2.15] md:scale-125 bg-clip-content py-24 md:py-20"
          >
            <source src="/video-gmco.mp4" type="video/mp4" />
          </video>
          <RevealWrapper
            rotate={{ x: 10, y: 40, z: 0 }}
            origin="left"
            delay={100}
            duration={2000}
            distance="250px"
          >
            <div className="relative flex items-center align-center h-[50vh] md:h-screen bg-right bg-cover z-10">
              <div className="text-left w-full pl-8 md:pl-20">
                <p className="md:text-5xl text-white">
                  WHAT ARE YOU WAITING FOR?
                </p>
                <h2 className="text-2xl md:text-7xl text-white font-bold mb-6">
                  GMCO Event:
                  <br />
                  Indonesian Pop Now and Then
                </h2>
                <div className="flex w-max items-center gap-4 px-4 py-2 md:py-4 md:px-6 bg-white/50 rounded-xl">
                  <p className="md:py-2 md:px-4 text-gray-900 font-medium text-sm md:text-lg">
                    Saturday
                  </p>
                  <p className="md:py-2 md:px-4 text-gray-900 font-medium text-sm md:text-lg">
                    12/11/2022
                  </p>
                  <p className="md:py-2 md:px-4 text-gray-900 font-medium text-sm md:text-lg">
                    Auditorium MM FEB UGM
                  </p>
                  <button className="hidden md:inline md:py-2 md:px-4 font-semibold bg-gmco-blue-main rounded-xl transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 hover:bg-gmco-orange-secondarydark duration-300">
                    <Link href="/"> Buy Ticket Now! </Link>
                  </button>
                </div>
                <button className="md:hidden py-1.5 px-4 mt-2 font-semibold text-sm bg-gmco-blue-main rounded-xl transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 hover:bg-gmco-orange-secondarydark duration-300">
                  <Link href="/"> Buy Ticket Now! </Link>
                </button>
              </div>
            </div>
          </RevealWrapper>
        </div>

        {/* Home Content 1 */}
        <div
          id="about"
          className="grid grid-cols-1 md:grid-cols-2 container items-center justify-between mx-auto px-10 py-20"
        >
          {/* GMCO Image */}
          <RevealWrapper origin="left" duration={1000} distance="100px">
            <div className="w-full">
              <div className="md:w-3/4">
                <Image
                  src="/logo_gmco.webp"
                  alt="logo gmco.jpg"
                  className="w-full h-auto mx-auto"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </RevealWrapper>

          {/* Text */}
          <RevealWrapper duration={1000} distance="0">
          <div className="w-full">
            <div className="text-center md:text-left py-12">
              <div className="uppercase tracking-wide text-md md:text-xl font-bold text-red-400">
                About
              </div>
              <h1 className="text-gray-900 mt-2 mb-4 text-2xl md:text-4xl leading-tight font-semibold">
                GMCO Live from the Living Room
              </h1>
              <p className="text-gray-900 mb-4 text-md md:text-lg leading-normal">
                GMCO Live from the Living Room merupakan sebuah intimate
                orchestra concert yang dilaksanakan oleh Unit Kegiatan Mahasiswa
                Gadjah Mada Chamber Orchestra (GMCO UGM). Konser intim ini
                merupakan konser inovasi GMCO dengan nuansa santai layaknya
                suasana ruang keluarga, tetapi tetap mempertahankan esensi dan
                kualitas penampilan orkestra itu sendiri.
                <br />
                Selain penampilan dari para pemain GMCO, konser ini akan
                dimeriahkan oleh penampilan bintang tamu, penyanyi pria
                nasional, yaitu Sal Priadi. GMCO Live from the Living Room akan
                menjadi konser orkestra intim yang unik dan diminati banyak
                penikmat musik Yogyakarta.
              </p>
              <a className="text-gmco-white" href="https://gmco.ukm.ugm.ac.id/">
                <button className="py-2 px-4 md:py-3 md:px-6 bg-gmco-blue-main rounded-xl transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 hover:bg-gmco-orange-secondarydark duration-300">
                  More About GMCO
                </button>
              </a>
            </div>
          </div>
          </RevealWrapper>
        </div>

        {/* Home Content 1 */}
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
