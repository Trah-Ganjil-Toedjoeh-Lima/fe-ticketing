import Image from "next/image";
import Link from "next/link";
import { RevealWrapper } from "next-reveal";
import NavigationBar from "@/components/navbar";
import FooterBar from "@/components/footer";
import { useClearAuthTokenOnUnload } from "@/atoms/authpage";

export default function Home() {
  
  return (
    <>
      <NavigationBar />
      <div className='bg-gmco-white'>
        {/* Hero Section */}
        <div className='relative h-[50vh] w-screen overflow-hidden bg-gmco-grey md:h-screen'>
          <video
            preload='auto'
            playsInline
            autoPlay
            muted
            loop
            className='absolute h-full w-full scale-[2.15] bg-clip-content object-cover py-24 opacity-40 md:scale-125 md:py-20'
          >
            <source src='/video-gmco.mp4' type='video/mp4' />
          </video>
          <RevealWrapper
            rotate={{ x: 10, y: 40, z: 0 }}
            origin='left'
            delay={100}
            duration={2000}
            distance='250px'
          >
            <div className='relative z-10 flex h-[50vh] items-center justify-center bg-cover md:h-screen'>
              <div className='flex h-max w-max flex-wrap items-center justify-center'>
                <Image
                  src='/logo-anjangsana.webp'
                  alt='logo anjangsana'
                  className='mt-auto h-[30vw] w-auto md:-ml-8 md:h-[35vh] xl:-ml-20 xl:h-[55vh]'
                  width={1000}
                  height={1000}
                />
                <div className='w-max text-left'>
                  <h2 className='text-3xl font-bold text-white drop-shadow md:text-5xl xl:text-8xl '>
                    GRAND CONCERT
                  </h2>
                  <p className='mb-2 font-normal text-white drop-shadow md:mb-6 md:text-4xl xl:mb-16 xl:text-6xl'>
                    Vol. 10
                  </p>
                  <p className='font-normal text-white drop-shadow md:text-2xl'>
                    Sabtu, <b>27</b> Mei 2023 @ <b>18.00 WIB</b>
                    <br />
                    Auditorium Driyarkara
                  </p>
                </div>
                <div className='mt-4 flex w-full justify-center md:mt-1 lg:-mt-10'>
                  <Link
                    href='/seats'
                    className='delay-15 w-max rounded-md border-2 border-gmco-yellow-secondary px-1.5 py-2 text-lg font-bold text-gmco-yellow-secondary transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gmco-yellow-secondary hover:text-gmco-white focus:-translate-y-1 focus:scale-110 focus:bg-gmco-yellow-secondary focus:text-gmco-white md:px-6 md:py-4 md:text-2xl'
                  >
                    Buy Ticket Now!
                  </Link>
                </div>
              </div>
            </div>
          </RevealWrapper>
        </div>

        {/* Home Content 1 */}
        <div
          id='about'
          className='container mx-auto grid grid-cols-1 items-center justify-between px-10 py-20 md:grid-cols-2'
        >
          {/* GMCO Image */}
          <RevealWrapper origin='left' duration={1000} distance='100px'>
            <div className='w-full'>
              <div className='md:w-3/4'>
                <Image
                  src='/logo_gmco.webp'
                  alt='logo gmco.webp'
                  className='mx-auto h-auto w-full'
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </RevealWrapper>

          {/* Text */}
          <RevealWrapper duration={1000} distance='0'>
            <div className='w-full'>
              <div className='py-12 text-center md:text-left'>
                <div className='text-md font-bold uppercase tracking-wide text-gmco-orange-secondarylight md:text-xl'>
                  About
                </div>
                <h1 className='mb-4 mt-2 text-2xl font-semibold leading-tight text-gray-900 md:text-4xl'>
                  Grand Concert #10
                </h1>
                <p className='text-md mb-4 leading-normal text-gray-900 md:text-lg'>
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
                  className='text-gmco-white'
                  href='https://gmco.ukm.ugm.ac.id/'
                >
                  <button className='delay-15 rounded-md bg-gmco-blue-main px-4 py-2 transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gmco-orange-secondarydark md:px-6 md:py-3'>
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
