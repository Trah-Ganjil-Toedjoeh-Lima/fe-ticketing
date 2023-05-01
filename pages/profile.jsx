import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import FooterBar from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { axiosInstance } from "@/utils/config";
import {
  notifyError,
  notifyErrorMessage,
  notifySucces,
} from "@/components/notify";
import Swal from "sweetalert2";
import { Loading } from "@/utils/spinner";
import { FaArrowCircleRight } from "react-icons/fa";

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

  const [isLoading, setIsLoading] = useState(false);
  const [verboseMsg, setVerboseMsg] = useState("Loading...");

  function routeToSeats() {
    router.push("/seats");
  }

  useEffect(() => {
    async function checkIfTokenValid() {
      if (localStorage.getItem("auth_token")) {
        try {
          const res = await axiosInstance.get("/api/v1/user/profile"); //login-only endpoint
          if (res.status === 200) {
            console.log("All Good.");
          }
          return;
        } catch (err) {
          if (err.response.status !== 200) {
            notifyErrorMessage("Token Expired. Silahkan login kembali.");
            localStorage.removeItem("auth_token");
            router.push("/auth");
          }
        }
      }
    }
    checkIfTokenValid();
  }, []);

  useEffect(() => {
    async function checkIfTokenValid() {
      if (localStorage.getItem("auth_token")) {
        try {
          const res = await axiosInstance.get("/api/v1/user/profile"); //login-only endpoint
          if (res.status === 200) {
            console.log("All Good.");
          }
          return;
        } catch (err) {
          if (err.response.status !== 200) {
            notifyErrorMessage("Token Expired. Silahkan login kembali.");
            localStorage.removeItem("auth_token");
            router.push("/auth");
          }
        }
      }
    }
    checkIfTokenValid();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("auth_token")) {
      notifyErrorMessage("Anda belum login. Silahkan login terlebih dahulu.");
      router.push("/auth");
      return;
    }

    (async () => {
      try {
        setIsLoading(true);
        setVerboseMsg("Getting user data...");
        const [userRes] = await Promise.all([
          axiosInstance.get("/api/v1/user/profile"),
        ]);
        setIsLoading(false);
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
        // console.log(userRes.data.data, "ini data");
        setUserData(userRes.data.data);
        setFormUserData({
          name: userRes.data.data.Name,
          email: userRes.data.data.Email,
          phone: userRes.data.data.Phone,
        });
      } catch (err) {
        // console.log(err);
        if (err.response.data.error === "your credentials are invalid") {
          notifyErrorMessage("Token Expired. Silahkan login kembali.");
          router.push("/auth");
        }
      }
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const [adminRes] = await Promise.all([
  //         axiosInstance.get("/api/v1/admin/healthAdmin"),
  //       ]);
  //       // console.log(adminRes)
  //       if (adminRes.status === 200) {
  //         notifySucces("Anda telah login sebagai admin.")
  //         router.push("/admin");
  //       }
  //     } catch (err) {
  //       // console.log(err);
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setVerboseMsg("Getting ticket data ...");
        const [ticketRes] = await Promise.all([
          axiosInstance.get("/api/v1/user/tickets"),
        ]);
        setIsLoading(false);
        setSeatsBought(ticketRes.data.data);
      } catch (err) {
        // console.log(err);
        notifyErrorMessage("Gagal mengambil data tiket");
      }
    })();
  }, []);

  // console.log(formUserData);

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormUserData({ ...formUserData, [name]: value });
  }

  function confirmSubmit(e) {
    e.preventDefault();
    Swal.fire({
      html: `Apakah anda yakin data yang diisi sudah sesuai?`,
      toast: false,
      icon: "info",
      iconColor: "#f6f7f1",
      background: "#2d2d2f",
      color: "#f6f7f1",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Ya, Saya Yakin",
      cancelButtonText: "Batalkan",
      confirmButtonColor: "#287d92",
      cancelButtonColor: "#c76734",
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

  // Object.keys(userData).map((key) => {
  //   console.log(userData[key]);
  // });

  return (
    <>
      {/* HEADER */}
      <Loading isLoading={isLoading} verboseMsg={verboseMsg} />
      <NavigationBar />
      <div className='max-w-screen h-full bg-gmco-yellow-secondary'>
        {/*This is the header */}
        <div className='relative w-full overflow-hidden '>
          <div className='absolute flex h-64 w-full overflow-hidden bg-gmco-grey'>
            <Image
              src='/profile/GMCO_10.webp'
              alt='background gmco'
              className='w-full scale-105 object-cover object-top opacity-50'
              width={1920}
              height={650}
            />
          </div>
          <div className='relative m-auto flex h-full flex-col justify-between pb-8 pt-24 lg:flex-row'>
            <div className='items-center px-4 md:items-start md:px-8 lg:ml-40 lg:items-end'>
              <h1 className='flex w-max border-b-2 text-2xl font-bold text-gmco-white md:text-4xl lg:text-4xl'>
                Profil
              </h1>
            </div>

            <div className="mr-8 flex flex-col items-end lg:mr-48 lg:items-end">
              {Object.keys(userData).map((key) => (
                <p
                  key={key}
                  className={`font-sans text-gmco-yellow ${
                    key === "Name"
                      ? "text-xl font-semibold lg:text-2xl"
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
        <div className='container m-auto flex flex-col items-center lg:flex-row lg:items-start'>
          {/* EDIT IDENTITY */}
          <form
            onSubmit={confirmSubmit}
            className='grid-col w-full items-start bg-gmco-yellow-secondary px-8 py-8 lg:w-1/3 lg:pr-12'
          >
            {/* Name */}
            <label htmlFor='nama' className='font-rubik text-white'>
              Nama
            </label>
            <input
              className='text-md mb-4 mt-2 w-full rounded-[20px] border border-gray-300 py-2 placeholder:font-light placeholder:text-gray-500 focus:ring-gmco-yellow sm:mb-4 md:text-lg'
              type='text'
              pattern='.{3,}'
              placeholder='Masukkan Nama Anda'
              name='name' // update the name property
              value={formUserData.name}
              onChange={handleFormChange}
              title='Name needs to be 3 characters or more'
            />

            {/*Email*/}
            <label htmlFor='email' className='font-rubik text-white'>
              Email<span className='text-red-500'>*</span>
            </label>
            <input
              className='text-md mb-4 mt-2 w-full rounded-[20px] border border-gray-300 py-2 placeholder:font-light placeholder:text-gray-500 focus:ring-gmco-yellow sm:mb-4 md:text-lg'
              type='text'
              pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
              placeholder='Masukkan Email Anda'
              name='email'
              value={formUserData.email}
              onChange={handleFormChange}
              title='Please enter a valid email address!'
            />

            {/* Phone Number */}
            <label type='whatsapp' className='font-rubik text-white'>
              Nomor WhatsApp<span className='text-red-500'>*</span>
            </label>
            <input
              className='text-md mb-4 mt-2 w-full rounded-[20px] border border-gray-300 py-2 placeholder:font-light placeholder:text-gray-500 focus:ring-gmco-yellow sm:mb-4 md:text-lg'
              type='text'
              pattern='(^\+62|62|08)(\d{8,12}$)'
              placeholder='Masukkan Nomor WhatsApp Anda'
              name='phone'
              value={formUserData.phone}
              onChange={handleFormChange}
              title='Please enter a valid phone number!'
            />
            {/* Submit Button */}
            <button
              type='submit'
              className='hover:bg-gmco-yellow-secondarylight mt-4 w-full rounded-full border-2 border-white bg-gmco-orange-secondarydark p-2 font-semibold  text-gmco-white duration-300 hover:scale-110 hover:text-gmco-white'
            >
              PERBARUI PROFIL
            </button>
          </form>

          {/* List of Tickets */}
          <div className='flex w-screen flex-col gap-4 overflow-auto bg-gmco-white px-8 py-8 drop-shadow backdrop-blur-sm backdrop-filter lg:h-screen lg:w-full'>
            <p className='text-start text-2xl font-medium text-gmco-grey'>
              Pembelian Saya &#40;{seatsBought.Seat.length}&#41;
            </p>
            {/* TICKET */}
            {seatsBought.Seat.length === 0 ? (
              <div className='flex w-full flex-col items-center justify-center'>
                <p className='mb-8 text-center text-2xl text-gmco-grey'>
                  Anda belum membeli tiket.
                  <br />
                  Silakan menuju ke halaman seat untuk membeli tiket.
                </p>
                <button
                  class='w-1/2 rounded border-b-8 border-blue-800 bg-blue-500 px-4 py-2 text-lg font-bold text-white hover:scale-110 hover:border-blue-900 hover:bg-blue-700 sm:w-1/4'
                  onClick={routeToSeats}
                >
                  Beli Sekarang
                </button>
              </div>
            ) : (
              <div />
            )}
            {seatsBought.Seat.map((seat, index) => (
              <div
                key={index}
                className='flex h-fit w-full flex-col rounded-lg border-4 border-gmco-yellow bg-white p-4 sm:flex-row'
              >
                {/* Kursi dan Tipe */}
                <div className='my-2 flex w-full justify-center gap-1 text-start sm:w-1/5 sm:flex-col sm:justify-center sm:gap-0 sm:text-center'>
                  <h1 className='font-rubik text-lg font-bold text-gmco-grey md:text-xl lg:text-2xl'>
                    Seat {seat.name}
                  </h1>
                  <p
                    className={
                      `flex w-fit rounded-lg px-1 text-center text-xs font-normal capitalize text-gmco-white sm:w-full sm:justify-center sm:px-0 sm:py-1 sm:text-center lg:text-base ` +
                      ({
                        gita: "bg-[#A3A3A3]",
                        sekar: "bg-[#D8B830]",
                        tala: "bg-[#2196F3]",
                        irama: "bg-[#00CED1]",
                        serenada: "bg-[#FF5A5F]",
                      }[seat.category] || "bg-[#FFA500]")
                    }
                  >
                    {seat.category}
                  </p>
                </div>

                {/* Waktu dan Tempat */}
                <div className='flex  w-full flex-row items-center justify-center p-2 md:justify-between'>
                  <div className='ml-3 flex w-1/2 flex-col gap-2 text-start text-sm sm:w-fit sm:items-center sm:text-center sm:text-sm lg:text-base'>
                    <p>Auditorium Driyarkara Sanata Dharma</p>
                    <p>Sabtu, 27 Mei 2023</p>
                    <p>Open Gate 17.00 WIB</p>
                  </div>
                  <a
                    href={`/ticket/${seat.link}`}
                    className='text-md -center group relative mx-2 -mt-7  h-1/2 w-1/3 text-center sm:mt-0'
                  >
                    <span className='absolute inset-0 w-full translate-x-1 translate-y-1 transform bg-black transition duration-200 ease-out group-hover:-translate-x-0 group-hover:-translate-y-0' />
                    <div className='align-center absolute inset-0  w-full border-2 border-black bg-gmco-blue-main transition duration-200 ease-out group-hover:bg-gmco-orange-secondarydark'>
                      <span className='inline-block text-xs relative mx-2 items-center font-bold text-gmco-white  transition duration-200 ease-out group-hover:text-gmco-yellow sm:top-6 sm:text-base  md:top-6 md:text-lg lg:top-8 xl:top-4 '>
                        Lihat E-Ticket
                      </span>
                    </div>

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
                  <div className='hidden w-1/3 items-center rounded-lg bg-gmco-grey py-4 pr-4 sm:flex'>
                    <div className='mx-2 overflow-hidden'>
                      <Image
                        src='/logo-anjangsana.webp'
                        alt='Logo GC gawk'
                        width={80}
                        height={80}
                      />
                    </div>

                    <div className='flex w-full flex-col text-start sm:text-end'>
                      <h1 className='font-inter text-sm font-bold text-white sm:text-base lg:text-2xl'>
                        Grand Concert Vol.10
                      </h1>
                      <p className='font-inter text-sm font-light text-white lg:text-lg'>
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
