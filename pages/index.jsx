import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { RevealWrapper } from "next-reveal";
import { useEffect, useState } from "react";
import NavigationBar from "@/components/navbar";
import FooterBar from "@/components/footer";
import withAuth from "@/atoms/authpage";

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("auth_token")) {
        router.push("/auth");
      }
    }
  }, []);

  return (
    <>
      <NavigationBar />
      <div className="bg-gmco-white">
        {/* Hero Section */}
        <div className="relative h-[50vh] w-screen overflow-hidden md:h-screen">
          <video
            preload="auto"
            playsInline
            autoPlay
            muted
            loop
            className="absolute h-full w-full scale-[2.15] bg-clip-content object-cover py-24 md:scale-125 md:py-20"
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
            <div className="align-center relative z-10 flex h-[50vh] items-center bg-cover bg-right md:h-screen">
              <div className="w-full pl-8 text-left md:pl-20">
                <p className="text-white md:text-5xl">
                  WHAT ARE YOU WAITING FOR?
                </p>
                <h2 className="mb-6 text-2xl font-bold text-white md:text-7xl">
                  GMCO Event:
                  <br />
                  Indonesian Pop Now and Then
                </h2>
                <div className="flex w-max items-center gap-4 rounded-xl bg-white/50 px-4 py-2 md:px-6 md:py-4">
                  <p className="text-sm font-medium text-gray-900 md:px-4 md:py-2 md:text-lg">
                    Saturday
                  </p>
                  <p className="text-sm font-medium text-gray-900 md:px-4 md:py-2 md:text-lg">
                    12/11/2022
                  </p>
                  <p className="text-sm font-medium text-gray-900 md:px-4 md:py-2 md:text-lg">
                    Auditorium MM FEB UGM
                  </p>
                  <button className="delay-15 hidden rounded-xl bg-gmco-blue-main font-semibold transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gmco-orange-secondarydark md:inline md:px-4 md:py-2">
                    <Link href="/"> Buy Ticket Now! </Link>
                  </button>
                </div>
                <button className="delay-15 mt-2 rounded-xl bg-gmco-blue-main px-4 py-1.5 text-sm font-semibold transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gmco-orange-secondarydark md:hidden">
                  <Link href="/"> Buy Ticket Now! </Link>
                </button>
              </div>
            </div>
          </RevealWrapper>
        </div>

        {/* Home Content 1 */}
        <div
          id="about"
          className="container mx-auto grid grid-cols-1 items-center justify-between px-10 py-20 md:grid-cols-2"
        >
          {/* GMCO Image */}
          <RevealWrapper origin="left" duration={1000} distance="100px">
            <div className="w-full">
              <div className="md:w-3/4">
                <Image
                  src="/logo_gmco.webp"
                  alt="logo gmco.jpg"
                  className="mx-auto h-auto w-full"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </RevealWrapper>

          {/* Text */}
          <RevealWrapper duration={1000} distance="0">
            <div className="w-full">
              <div className="py-12 text-center md:text-left">
                <div className="text-md font-bold uppercase tracking-wide text-red-400 md:text-xl">
                  About
                </div>
                <h1 className="mb-4 mt-2 text-2xl font-semibold leading-tight text-gray-900 md:text-4xl">
                  GMCO Live from the Living Room
                </h1>
                <p className="text-md mb-4 leading-normal text-gray-900 md:text-lg">
                  GMCO Live from the Living Room merupakan sebuah intimate
                  orchestra concert yang dilaksanakan oleh Unit Kegiatan
                  Mahasiswa Gadjah Mada Chamber Orchestra (GMCO UGM). Konser
                  intim ini merupakan konser inovasi GMCO dengan nuansa santai
                  layaknya suasana ruang keluarga, tetapi tetap mempertahankan
                  esensi dan kualitas penampilan orkestra itu sendiri.
                  <br />
                  Selain penampilan dari para pemain GMCO, konser ini akan
                  dimeriahkan oleh penampilan bintang tamu, penyanyi pria
                  nasional, yaitu Sal Priadi. GMCO Live from the Living Room
                  akan menjadi konser orkestra intim yang unik dan diminati
                  banyak penikmat musik Yogyakarta.
                </p>
                <a
                  className="text-gmco-white"
                  href="https://gmco.ukm.ugm.ac.id/"
                >
                  <button className="delay-15 rounded-xl bg-gmco-blue-main px-4 py-2 transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gmco-orange-secondarydark md:px-6 md:py-3">
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
