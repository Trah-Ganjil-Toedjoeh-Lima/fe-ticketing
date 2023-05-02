import Image from "next/image";
import { useRouter } from "next/router";

export default function CloseGatePage() {
  const router = useRouter();
  function handleGoHome() {
    router.push("/");
  }
  return (
    <section className="block min-h-screen items-center justify-center bg-gmco-grey p-4 md:flex">
      <div className=" relative flex w-full max-w-screen-lg flex-col overflow-hidden rounded-lg bg-cover shadow-lg md:m-10 md:flex-row ">
        {/* leftside */}
        <div className="absolute h-full w-full bg-gmco-grey">
          <Image
            src="/seatmap/GMCO.webp"
            alt="bg gmco concert"
            className="h-full w-auto object-cover opacity-50"
            width={2000}
            height={2000}
          />
        </div>
        <div className="place relative ml-3 mt-14  flex h-3/6 w-full flex-col p-4 text-white backdrop-filter md:mt-0 md:w-7/12 md:items-start md:p-10 ">
          <h1 className="mb-3 text-4xl font-bold md:text-5xl">
            Grand Concert{" "}
          </h1>
          <p className="font-base mb-3 text-2xl md:text-3xl">Vol.10</p>
          <p className=" font-base text-2xl md:text-2xl">Anjangsana Simfoni </p>
        </div>
        <Image
          src="/logo_gmco.webp"
          alt="logo"
          className="absolute left-5 top-3 w-32 md:left-9 md:top-3/4 md:w-52"
          width={1000}
          height={1000}
        />

        <div className="right-0 mt-7 flex w-full flex-col items-center space-y-8 bg-gray-400 bg-opacity-50 p-4 py-32 backdrop-blur-sm backdrop-filter md:mt-0 md:w-5/12 md:py-40 ">
          <div className="-mt-7 flex flex-col items-center">
            <h1 className="mb-3 text-4xl font-bold text-gmco-white">
              Pembelian Tiket Ditutup!
            </h1>
            <p className="pl-2 text-base text-gmco-white">
              Saat ini belum memasuki masa pembelian tiket Grand Concert Vol. 10 GMCO UGM.
              Pantau lini masa kami di media sosial untuk info lebih lengkap.
            </p>
          </div>
          <button
            onClick={handleGoHome}
            className="mb-6 w-full rounded-full border-2 border-white bg-gmco-orange-secondarylight p-2 font-semibold text-white  hover:bg-gmco-yellow-secondary hover:text-gmco-white"
          >
            KEMBALI KE HALAMAN UTAMA
          </button>
        </div>
      </div>
    </section>
  );
}