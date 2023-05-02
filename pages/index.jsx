import Image from "next/image";
import Link from "next/link";
import { RevealWrapper } from "next-reveal";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import NavigationBar from "@/components/navbar";
import FooterBar from "@/components/footer";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
export default function Home() {
  return (
    <>
      <NavigationBar />
      <div className="max-w-screen bg-gmco-white">
        {/* Hero Section */}
        <div className="relative h-screen w-full overflow-hidden bg-gmco-grey">
          <video
            preload="auto"
            playsInline
            autoPlay
            muted
            loop
            className="absolute h-full w-full bg-clip-content object-cover opacity-40"
          >
            <source src="/homepage/video_v3.mp4" type="video/mp4" />
          </video>
          <RevealWrapper
            rotate={{ x: 10, y: 40, z: 0 }}
            origin="left"
            delay={100}
            duration={2000}
            distance="250px"
          >
            <div className="relative z-10 flex h-screen items-center justify-center bg-cover">
              <div className="flex h-max w-max flex-col flex-wrap items-center justify-center md:flex-row">
                <Image
                  src="/logo-anjangsana.webp"
                  alt="logo anjangsana"
                  className="mt-auto h-[30vw] w-auto md:-ml-8 md:h-[35vh] xl:-ml-20 xl:h-[55vh]"
                  width={1000}
                  height={1000}
                />
                <div className="w-max text-center md:text-left">
                  <h2 className="text-3xl font-bold text-white drop-shadow md:text-5xl xl:text-8xl ">
                    GRAND CONCERT
                  </h2>
                  <p className="mb-2 font-normal text-white drop-shadow md:mb-6 md:text-4xl xl:mb-16 xl:text-6xl">
                    Vol. 10
                  </p>
                  <p className="font-normal text-white drop-shadow md:text-2xl">
                    Sabtu, <b>27</b> Mei 2023 @ <b>18.00 WIB</b>
                    <br />
                    Auditorium Driyarkara
                  </p>
                </div>
                <div className="mt-4 flex w-full justify-center md:mt-1 lg:-mt-10">
                  <Link
                    href="/seats"
                    className="delay-15 w-max rounded-md border-2 border-gmco-yellow-secondary px-1.5 py-2 text-lg font-bold text-gmco-yellow-secondary transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gmco-yellow-secondary hover:text-gmco-white focus:-translate-y-1 focus:scale-110 focus:bg-gmco-yellow-secondary focus:text-gmco-white md:px-6 md:py-4 md:text-2xl"
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
          id="about"
          className="container mx-auto grid grid-cols-1 items-center justify-between px-10 py-20 lg:grid-cols-2"
        >
          {/* GMCO Image */}
          <RevealWrapper origin="left" duration={1000} distance="100px">
            <div className="w-full">
              <div className="lg:w-3/4">
                <Image
                  src="/logo_gmco.webp"
                  alt="logo gmco.webp"
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
              <div className="py-12 text-center lg:text-left">
                <div className="text-md font-bold uppercase tracking-wide text-gmco-orange-secondarylight md:text-xl">
                  About
                </div>
                <h1 className="mb-4 mt-2 text-2xl font-semibold leading-tight text-gray-900 md:text-4xl">
                  Grand Concert #10
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
                  <button className="delay-15 rounded-md bg-gmco-blue-main px-4 py-2 transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gmco-orange-secondarydark md:px-6 md:py-3">
                    More About GMCO
                  </button>
                </a>
              </div>
            </div>
          </RevealWrapper>
        </div>

        {/* Home Content2 - Addie MS */}
        <div className="bg-[#191919] py-20">
          <div
            id="about"
            className="container mx-auto grid grid-cols-1 items-center justify-between px-10 lg:grid-cols-2"
          >
            {/* Text */}
            <RevealWrapper
              duration={1000}
              distance="0"
              className="order-last flex w-full justify-end text-gmco-white lg:order-first"
            >
              <div className="py-12 text-center md:text-left lg:w-3/4">
                <div className="text-md font-bold tracking-wide md:text-2xl">
                  Featuring,
                </div>
                <h1 className="mb-4 mt-2 text-2xl font-extrabold leading-tight md:text-7xl">
                  Addie MS{" "}
                  <span className="text-gmco-orange-secondarydark">.</span>
                </h1>
                <p className="mb-4 text-justify text-base font-light leading-normal opacity-80 md:text-lg">
                  Addie MS adalah seorang musisi, konduktor, dan arranger
                  terkenal asal Indonesia. Dia dikenal sebagai pendiri dan
                  konduktor dari Orkestra Simfoni Jakarta, yang telah tampil
                  dalam berbagai pertunjukan musik di dalam dan luar negeri.
                  Selain itu, dia juga aktif dalam mendukung pendidikan musik di
                  Indonesia dan terlibat dalam berbagai kegiatan sosial dan
                  lingkungan. Dia telah menerima banyak penghargaan atas
                  kontribusinya dalam dunia musik dan kebudayaan Indonesia.
                </p>
                <a
                  className="delay-15 border-b-2 py-3 text-gmco-white transition duration-300 ease-in-out hover:border-gmco-orange-secondarylight"
                  href="https://id.wikipedia.org/wiki/Addie_MS"
                >
                  More About Addie MS
                </a>
              </div>
            </RevealWrapper>

            {/* GMCO Image */}
            <RevealWrapper
              origin="left"
              duration={2000}
              distance="100px"
              className="w-full"
            >
              <div className="flex h-[50vh] items-center md:h-[70vh] md:p-8">
                <Image
                  src="/homepage/addiems_clearnew.png"
                  alt="gambar addie ms"
                  className="mx-auto h-auto w-full object-cover"
                  width={500}
                  height={500}
                />
              </div>
            </RevealWrapper>
          </div>
        </div>

        {/* Home Content 3 */}
        <div className="bg-gmco-white py-20">
          <div
            id="about"
            className="container mx-auto grid grid-cols-1 items-center justify-between px-10 lg:grid-cols-2"
          >
            {/* GMCO Image */}
            <RevealWrapper
              origin="right"
              duration={2000}
              distance="100px"
              className="w-full"
            >
              <div className="flex h-[50vh] items-center md:h-[70vh] md:p-8">
                <Image
                  src="/homepage/brian.png"
                  alt="gambar addie ms"
                  className="mx-auto h-auto w-full object-cover"
                  width={500}
                  height={500}
                />
              </div>
            </RevealWrapper>

            {/* Text */}
            <RevealWrapper
              duration={1000}
              distance="0"
              className="flex w-full justify-start text-gmco-grey"
            >
              <div className="py-12 text-center md:text-left lg:w-3/4">
                <div className="text-md font-bold tracking-wide md:text-2xl">
                  Special,
                </div>
                <h1 className="mb-4 mt-2 text-2xl font-extrabold leading-tight md:text-7xl">
                  <span className="text-xs">Rich</span>
                  <span>Brian</span>
                  <span className="text-gmco-orange-secondarylight">.</span>
                </h1>
                <p className="mb-4 text-justify text-base font-light leading-normal opacity-90 md:text-lg">
                  Bro, lo tau ga sih Rich Brian? Dia tuh rapper asal Indo yang
                  udah terkenal banget di luar negeri, dulu dia dikenal juga
                  sebagai Rich Chigga. Lagunya "Dat $tick" sempet viral di
                  internet, trus dia juga sering manggung di festival-festival
                  musik dan konser internasional gitu. Musiknya keren banget,
                  liriknya juga unik abis. Gaya dia juga oke sih, dia suka pake
                  teknologi dan media sosial buat promosiin karyanya.
                </p>
                <a
                  className="delay-15 border-b-2 py-3 text-gmco-grey transition duration-300 ease-in-out border-gmco-orange-secondarylight hover:border-gmco-grey"
                  href="https://id.wikipedia.org/wiki/Rich_Brian"
                >
                  More About This Chigga
                </a>
              </div>
            </RevealWrapper>
          </div>
        </div>

        {/* FAQ */}
        <div
          id="FAQ"
          className=" flex flex-col bg-gmco-orange-secondarydark p-16 "
        >
          <h1 className="mx-auto mb-6 text-6xl font-bold text-gmco-white">
            FAQ
          </h1>
          <div className="container mx-auto items-center justify-center">
            <Accordion className="rounded-t-lg">
              <AccordionSummary
                expandIcon={<ChevronDownIcon className="w-5 text-gmco-grey" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <span className="font-semibold">
                  Hal apa saja yang diperlukan sebelum membeli ticket?
                </span>
              </AccordionSummary>
              <AccordionDetails className="-mt-3">
                <span>
                  a. Akun email yang aktif dan dapat diakses <br />
                  b. Akses ke aplikasi <b>*e-banking</b> atau <b>*e-wallet</b>{" "}
                  yang akan anda gunakan untuk membayar tiket <br />
                  c. (Direkomendasikan) Mengakses website ini melalui perangkat
                  kedua seperti desktop, laptop atau tablet
                </span>
              </AccordionDetails>
            </Accordion>
            <Accordion className="">
              <AccordionSummary
                expandIcon={<ChevronDownIcon className="w-5 text-gmco-grey" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <span className="font-semibold">
                  Bagaimana cara melakukan pemesanan dan pembayaran tiket?
                </span>
              </AccordionSummary>
              <AccordionDetails className="-mt-3">
                <ul>
                  <li>1. Masuk ke web GC GMCO dan klik &quot;Login&quot;</li>
                  <li>2. Masuk ke halaman Login</li>
                  <li>
                    3. Masukkan alamat email yang akan digunakan (pastikan email
                    yang digunakan masih aktif).
                  </li>
                  <li>
                    4. Pengguna akan menerima kode OTP melalui email yang telah
                    diinputkan sebelumnya. Pastikan untuk memeriksa folder spam
                    jika email OTP belum diterima. Setelah menerima kode OTP,
                    masukkan kode tersebut ke laman website.
                  </li>
                  <li>
                    5. Lengkapi data profil untuk dapat melakukan pembelian
                    tiket. Klik &quot;Perbarui Profil&quot; untuk melengkapi
                    atau mengubah data profil.
                  </li>
                  <li>
                    6. Klik menu &quot;Seat&quot; untuk memulai pembelian tiket
                  </li>
                  <li>
                    7. Pilih kursi yang diinginkan dengan menekan kotak kursi.
                    Kemudian, klik &quot;Masukkan ke Cart&quot; untuk
                    melanjutkan ke halaman keranjang.
                  </li>
                  <li>
                    8. Pastikan kursi yang dipesan sudah benar. Kemudian, klik
                    &quot;Checkout&quot; untuk melakukan pembayaran.
                  </li>
                  <li>
                    9. Popup pembayaran akan muncul dan pengguna dapat memilih
                    metode pembayaran yang tersedia.
                  </li>
                  <li>
                    10. Ikuti instruksi pembayaran yang ada. Pesan &quot;Payment
                    Successful&quot; akan muncul jika pembayaran berhasil.
                  </li>
                </ul>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ChevronDownIcon className="w-5 text-gmco-grey" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <span className="font-semibold">
                  Bagaimana cara mengecek tiket yang telah saya beli?
                </span>
              </AccordionSummary>
              <AccordionDetails className="-mt-3">
                <p>
                  a. Tiket yang sudah terbeli dapat dilihat pada :<br />
                  &emsp;1. Halaman profil pada website pembelian <br />
                  &emsp;2. Email yang dikirimkan kepada pengguna dari email
                  official <br />
                  b. Tiket selain yang diperoleh melalui kedua platform yang
                  telah disebutkan di atas dianggap tidak sah dan tidak menjadi
                  tanggung jawab dari panitia penyelenggara.
                </p>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ChevronDownIcon className="w-5 text-gmco-grey" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <span className="font-semibold">
                  Apakah saya dapat mengembalikan tiket yang telah terbeli?
                </span>
              </AccordionSummary>
              <AccordionDetails className="-mt-3">
                <span>
                  Tidak. Tiket yang sudah dibeli oleh konsumen dianggap final
                  dan tidak dapat dikembalikan.{" "}
                </span>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ChevronDownIcon className="w-5 text-gmco-grey" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <span className="font-semibold">
                  Berapa jumlah kursi maksimum yang dapat saya pesan?
                </span>
              </AccordionSummary>
              <AccordionDetails className="-mt-3">
                <span>
                  Jumlah kursi maksimum yang dapat dipesan per email adalah{" "}
                  <b> 5 (lima)</b> kursi. Untuk memesan jumlah kursi yang
                  melebihi batasan tersebut, silakan melakukan pemesanan
                  menggunakan alamat email yang berbeda.
                </span>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ChevronDownIcon className="w-5 text-gmco-grey" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <span className="font-semibold">
                  Berapa lama durasi proses transaksi?
                </span>
              </AccordionSummary>
              <AccordionDetails className="-mt-3">
                <span>
                  a. Durasi maksimum proses transaksi yang kami miliki adalah{" "}
                  <b>20 menit</b>, yang terdiri dari waktu maksimum saat memilih
                  metode pembayaran selama <b>5 menit</b> , dan waktu maksimum
                  saat melakukan pembayaran selama <b>15 menit </b> <br />
                  b. Perhitungan durasi dimulai pada saat anda mengklik “bayar”
                  di halaman checkoutt
                </span>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ChevronDownIcon className="w-5 text-gmco-grey" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <span className="font-semibold">
                  Apa yang terjadi bila saya telah memesan kursi namun gagal
                  pada saat melakukan transaksi?
                </span>
              </AccordionSummary>
              <AccordionDetails className="-mt-3">
                <span>
                  Kursi yang anda pesan akan kembali tersedia dalam kurun waktu
                  15 menit dari percobaan transaksi sebelumnya. Anda dapat
                  memesannya kembali jika belum dipesan/didahului oleh pengguna
                  lain
                </span>
              </AccordionDetails>
            </Accordion>
            <Accordion className="rounded-b-lg">
              <AccordionSummary
                expandIcon={<ChevronDownIcon className="w-5 text-gmco-grey" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <span className="font-semibold">
                  Apa saja metode pembayaran yang didukung?
                </span>
              </AccordionSummary>
              <AccordionDetails className="-mt-3">
                <span>
                  a. E-banking Mandiri, BNI, BRI, Permata <br />
                  b. E-wallet GoPay, Shopee Pay, OVO, Dana, LinkAja
                </span>
              </AccordionDetails>
            </Accordion>
          </div>
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
