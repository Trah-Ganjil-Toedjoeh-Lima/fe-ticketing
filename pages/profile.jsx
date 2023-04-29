import Image from "next/image";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";

import FooterBar from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { axiosInstance } from "@/utils/config";
import {
  notifyError,
  notifyErrorMessage,
  notifySucces,
} from "@/components/notify";
import Swal from "sweetalert2";

export default function Profile() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    UserId: "",
    Name: "",
    Email: "",
    Phone: "",
  });
  const [formUserData, setFormUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [seatsBought, setSeatsBought] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Seat: [],
  });

  function routeToSeats() {
    router.push("/seats");
  }

  // ini gk bisa dijadiin 1 karena kalo ticket ga ada, chandra ngasihnya 404 jadi error ya harus dipisah -weka
  // erronya pake yg error biasa aja, udah kupasin sama callbacknya chandra yg notifyErrorMessage buat custom error
  // misal gini
  useEffect(() => {
    (async () => {
      if (
        typeof window !== "undefined" &&
        !localStorage.getItem("auth_token")
      ) {
        router.push("/auth");
      }
      try {
        const [userRes] = await Promise.all([
          axiosInstance.get("/api/v1/user/profile"),
        ]);
        if (!userRes.data.data.Email || !userRes.data.data.Phone) {
          Swal.fire({
            html: `Mohon Lengkapi Nama dan Nomor WhatsApp Anda Agar Dapat Membeli Tiket`,
            toast: false,
            icon: "warning",
            iconColor: "#f6f7f1",
            background: "#2d2d2f",
            color: "#f6f7f1",
            showConfirmButton: true,
            cancelButtonColor: "#c76734",
            confirmButtonText: "Ya, Saya Mengerti",
            confirmButtonColor: "#287d92",
            showClass: {
              popup: "",
            },
          });
        }
        console.log(userRes.data.data, "ini data");
        setUserData(userRes.data.data);
        setFormUserData({
          name: userRes.data.data.Name,
          email: userRes.data.data.Email,
          phone: userRes.data.data.Phone,
        });
      } catch (err) {
        console.log(err);
        notifyError(err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const [ticketRes] = await Promise.all([
          axiosInstance.get("/api/v1/user/tickets"),
        ]);
        setSeatsBought(ticketRes.data.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  // console.log(formUserData);

  function mapCategory(price) {
    const categories = {
      60000: "Platinum",
      85000: "Diamond",
      120000: "Ascendant",
      145000: "Immortal",
      default: "Radiant",
    };

    return categories[price] || categories.default;
  }

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormUserData({ ...formUserData, [name]: value });
  }

  function confirmSubmit(e) {
    e.preventDefault();
    Swal.fire({
      html: `Pastikan data yang diisikan sudah sesuai.`,
      toast: false,
      icon: "info",
      iconColor: "#f6f7f1",
      background: "#2d2d2f",
      color: "#f6f7f1",
      showConfirmButton: true,
      confirmButtonText: "Oke",
      confirmButtonColor: "#287d92",
      showClass: {
        popup: "",
      },
    }).then((result, e) => {
      if (result.isConfirmed) {
        handleSubmit(e);
      }
    });
  }
  async function handleSubmit(e) {
    // e.preventDefault();
    try {
      await axiosInstance.patch("api/v1/user/profile", formUserData);
      const [userRes] = await Promise.all([
        axiosInstance.get("/api/v1/user/profile"),
      ]);
      console.log(userRes);
      setUserData(userRes.data.data);
      notifySucces("Your profile has been successfully updated!");
    } catch (err) {
      notifyErrorMessage(err);
    }
  }

  Object.keys(userData).map((key) => {
    console.log(userData[key]);
  });

  // kubuat pake container biar sama kayak page lain, menunggu komen dafrom
  return (
    <>
      {/* HEADER */}
      <NavigationBar />
      <div className="max-w-screen h-full bg-gmco-yellow-secondary">
        {/*This is the header */}
        <div className="relative w-full overflow-hidden ">
          <div className="absolute flex h-64 w-full overflow-hidden bg-gmco-grey">
            <Image
              src='/profile/GMCO_10.webp'
              alt='background gmco'
              className='w-full scale-105 object-cover object-top opacity-50'
              width={1920}
              height={650}
            />
          </div>
          <div className='relative justify-between m-auto flex h-full flex-col pb-8 pt-24 lg:flex-row'>
            <div className='items-center md:items-start lg:items-end px-4 md:px-8 lg:ml-40'>
              <h1 className='flex w-max text-2xl border-b-2 md:text-4xl lg:text-4xl font-bold text-gmco-white'>
                Profil
              </h1>
            </div>

            <div className='mr-8 flex flex-col items-end lg:mr-48 lg:items-end'>
              {/* aku agak bingung kok gk keluar hasilnya */}
              {/* cok aku debug lama ternyata cuma salah di kurawalnya asw -weka*/}
              {/* awal => {} harusnya => () */}
              {/* kutambah kalo id gk ditampilin ya */}
              {Object.keys(userData).map((key) => (
                <p
                  key={key}
                  className={`font-sans text-gmco-yellow ${
                    key === "Name"
                      ? "text-xl lg:text-2xl font-semibold"
                      : key === "UserId"
                      ? "hidden"
                      : "font-normal"
                  }`}
                >
                  {userData[key]}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="container m-auto flex flex-col items-center lg:flex-row lg:items-start">
          {/* EDIT IDENTITY */}
          <form
            onSubmit={confirmSubmit}
            className="grid-col w-full items-start bg-gmco-yellow-secondary px-8 py-8 lg:w-1/3 lg:pr-12"
          >
            {/* Name */}
            <label htmlFor="nama" className="font-rubik text-white">
              Nama
            </label>
            <input
              className="mb-8 w-full rounded-lg border-transparent bg-white text-start text-lg focus:border-gmco-blue focus:ring-gmco-blue"
              type="text"
              pattern=".{3,}"
              placeholder="Masukkan Nama Anda"
              name="name" // update the name property
              value={formUserData.name}
              onChange={handleFormChange}
              title="Name needs to be 3 characters or more"
            />

            {/*Email*/}
            <label htmlFor="email" className="font-rubik text-white">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              className="mb-8 w-full rounded-lg border-transparent bg-white text-start text-lg focus:border-gmco-blue focus:ring-gmco-blue"
              type="text"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              placeholder="Masukkan Email Anda"
              name="email"
              value={formUserData.email}
              onChange={handleFormChange}
              title="Please enter a valid email address!"
            />

            {/* Phone Number */}
            <label type="whatsapp" className="font-rubik text-white">
              Nomor WhatsApp<span className="text-red-500">*</span>
            </label>
            <input
              className="mb-8 w-full rounded-lg border-transparent bg-white text-start text-lg focus:border-gmco-blue focus:ring-gmco-blue"
              type="text"
              pattern="(^\+62|62|08)(\d{8,12}$)"
              placeholder="Masukkan Nomor WhatsApp Anda"
              name="phone"
              value={formUserData.phone}
              onChange={handleFormChange}
              title="Please enter a valid phone number!"
            />
            {/* Submit Button */}
            <button
              type="submit"
              className="mt-12 w-full rounded-lg bg-gmco-orange-secondarydark p-2 text-center font-inter text-lg font-semibold text-white duration-300 hover:scale-110"
            >
              PERBARUI PROFIL
            </button>
          </form>

          {/* List of Tickets */}
          <div className="flex w-screen flex-col gap-4 overflow-auto bg-gmco-white px-8 py-8 lg:h-screen lg:w-full">
            <p className="text-start text-2xl font-medium text-gmco-grey">
              Pembelian Saya &#40;{seatsBought.Seat.length}&#41;
            </p>
            {/* TICKET */}
            {seatsBought.Seat.length === 0 ? (
              <div className="flex w-full flex-col items-center justify-center">
                <p className="mb-8 text-center text-2xl text-gmco-grey">
                  Anda belum membeli tiket.
                  <br />
                  Silakan menuju ke halaman seat map untuk membeli tiket.
                </p>
                <button
                  class="w-1/2 rounded border-b-8 border-blue-800 bg-blue-500 px-4 py-2 text-lg font-bold text-white hover:scale-110 hover:border-blue-900 hover:bg-blue-700 sm:w-1/4"
                  onClick={routeToSeats}
                >
                  Tuku Saiki
                </button>
              </div>
            ) : (
              <div />
            )}
            {seatsBought.Seat.map((seat, index) => (
              <div
                key={index}
                className="flex h-fit w-full flex-col rounded-lg border-4 border-gmco-yellow bg-white p-4 sm:flex-row"
              >
                {/* Kursi dan Tipe */}
                <div className="flex w-full justify-center gap-1 text-start  sm:w-1/5 sm:flex-col sm:justify-center sm:gap-0 sm:text-center">
                  <h1 className="font-rubik text-lg font-bold text-gmco-grey md:text-xl lg:text-2xl">
                    Seat {seat.name}
                  </h1>
                  <p
                    className={
                      `w-fit rounded-lg p-1 text-center text-xs font-normal text-gmco-white sm:w-full sm:px-0 sm:py-1 lg:text-base ` +
                      ({
                        Platinum: "bg-gmco-blue",
                        Diamond: "bg-violet-700",
                        Ascendant: "bg-emerald-700",
                        Immortal: "bg-rose-400",
                        Radiant: "bg-rose-800",
                      }[mapCategory(seat.price)] || "bg-rose-800")
                    }
                  >
                    {mapCategory(seat.price)}
                  </p>
                </div>

                {/* Waktu dan Tempat */}
                <div className="flex  w-full flex-row items-center justify-center p-2 md:justify-between">
                  <div className="ml-3 flex w-1/2 flex-col gap-2 text-start text-xs sm:w-fit sm:items-center sm:text-end sm:text-sm lg:text-base">
                    <p>Auditorium Driyarkara</p>
                    <p>Sabtu, 27 Mei 2023</p>
                    <p>Open Gate 18.00 WIB</p>
                  </div>
                  <a
                    href="#_"
                    className="text-md group -mt-7 sm:mt-0 relative mx-2  -center text-center h-1/2 w-1/3"
                  >
                    <span
                      className="absolute inset-0 w-full translate-x-1 translate-y-1 transform bg-black transition duration-200 ease-out group-hover:-translate-x-0 group-hover:-translate-y-0"   
                    />
                    <span
                      className="absolute inset-0 w-full border-2 border-black transition duration-200 ease-out group-hover:bg-gmco-orange-secondarydark bg-gmco-blue-main" 
                    ></span>
                    <span
                      className="relative  items-center sm:top-6 md:top-6 lg:top-8 xl:top-4  text-xs sm:text-base md:text-lg  mx-2 font-bold text-gmco-white  transition duration-200 ease-out group-hover:text-gmco-yellow " 
                      
                    >
                      Lihat E-Ticket
                    </span>
                    {/* <span class="relative z-10 block overflow-hidden rounded-lg border-2 border-gray-900 px-5 py-3 font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out group-hover:text-white">
                      <span class="absolute inset-0 h-full w-full rounded-lg bg-gmco-blue px-5 py-3"></span>
                      <span class="ease absolute left-0 -ml-2 h-48 w-48 origin-top-right -translate-x-full translate-y-12 -rotate-90 bg-gray-900 transition-all duration-300 group-hover:-rotate-180"></span>
                      <span class="relative">Lihat E-Ticket</span>
                    </span>
                    <span
                      class="absolute bottom-0 right-0 -mb-1 -mr-1 h-12 w-full rounded-lg bg-gray-900 transition-all duration-200 ease-linear group-hover:mb-0 group-hover:mr-0"
                      data-rounded="rounded-lg"
                    ></span> */}
                  </a>

                  {/* Nama Konser */}
                  <div className="hidden w-1/3 items-center rounded-lg bg-gmco-grey py-4 pr-4 sm:flex">
                    <div className="mx-2 overflow-hidden">
                      <Image
                        src="/logo-anjangsana.webp"
                        alt="Logo GC gawk"
                        width={80}
                        height={80}
                      />
                    </div>

                    <div className="flex w-full flex-col text-start sm:text-end">
                      <h1 className="font-inter text-sm font-bold text-white sm:text-lg lg:text-2xl">
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
