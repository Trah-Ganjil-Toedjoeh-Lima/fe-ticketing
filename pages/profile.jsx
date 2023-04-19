import Image from "next/image";
import { useRouter } from "next/router";
import { Inter, Rubik } from "next/font/google";
import Link from "next/link";

import { useEffect, useRef } from "react";
import { useState } from "react";

import { axiosInstance, midtransSetup } from "@/atoms/config";
import { notifyError } from "@/components/notify";
import NavigationBar from "@/components/navbar";
import FooterBar from "@/components/footer";
import { notifyErrorMessage } from "@/components/notify";

export default function Profile() {
  const tickets = [6, 7, 8, 9, 10, 11, 12];
  const router = useRouter();
  const [token, setToken] = useState("");
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

  useEffect(() => {
    (async () => {
      try {
        if (
          typeof window !== "undefined" &&
          !localStorage.getItem("auth_token")
        ) {
          router.push("/auth");
          console.log("Login dulu!!!");
        }
        const [res] = await Promise.all([
          axiosInstance.get("api/v1/user/profile"),
        ]);
        setUserData(res.data.data);
      } catch (err) {
        router.push("/auth");
        notifyError(err);
        console.log(err.toString());
      }
    })();
  }, []);

  useEffect(() => {
    setFormUserData({
      name: userData.Name,
      email: userData.Email,
      phone: userData.Phone,
    });
  }, [userData]);

  useEffect(() => {
    (async () => {
      try {
        const [res] = await Promise.all([
          axiosInstance.get("api/v1/user/tickets"),
        ]);
        setSeatsBought(res.data.data);
        console.log(seatsBought.Seat[0]);
      } catch (err) {
        notifyErrorMessage(err);
        console.log(err.toString());
      }
    })();
  }, []);

  function mapCategory(price) {
    let category;
    switch (price) {
      case 60000:
        category = "Platinum";
        break;
      case 85000:
        category = "Diamond";
        break;
      case 120000:
        category = "Ascendant";
        break;
      case 145000:
        category = "Immortal";
        break;
      default:
        category = "Radiant";
    }
    return category;
  }

  function categoryColor(category) {
    let color;
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    setFormUserData({ ...formUserData, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res_patch = await axiosInstance.patch(
        "api/v1/user/profile",
        formUserData
      );
      const [res_get] = await Promise.all([
        axiosInstance.get("api/v1/user/profile"),
      ]);
      setUserData(res_get.data.data);
    } catch (err) {
      notifyError(err);
    }
  };

  return (
    <>
      {/* HEADER */}
      <NavigationBar />
      <div className="w-screen bg-gmco-white">
        {/*This is the header */}
        <div className="relative w-screen overflow-hidden">
          <img
            className="h-64 w-full scale-105 object-cover object-top blur-[5px] brightness-75 "
            src="/GMCO_10.webp"
          ></img>
          <div className="absolute left-0 top-0 flex h-full w-full flex-col px-12 py-16 lg:flex-row">
            <div className="flex h-full w-1/5 items-center">
              <h1 className="font-rubik text-5xl font-light text-white">
                PROFIL
              </h1>
            </div>

            <div className="flex w-4/5 flex-col items-start lg:items-end">
              <h1 className="mt-8 font-rubik text-xl font-semibold text-[#F5DB91]">
                {userData.Name}
              </h1>
              <p className="font-rubik font-normal text-[#F5DB91]">
                {userData.Email}
              </p>
              <p className="font-rubik font-normal text-[#F5DB91]">
                {userData.Phone}
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex w-full flex-col lg:flex-row">
          {/* EDIT IDENTITY */}
          <form
            onSubmit={handleSubmit}
            className="grid-col w-full items-start bg-[#C0925E] px-12 py-8 lg:w-1/3"
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
              className="mt-12 w-full rounded-lg bg-[#932F2F] p-2 text-center font-inter text-lg font-semibold text-white"
            >
              PERBARUI PROFIL
            </button>
          </form>

          {/* List of Tickets */}
          <div className="grid-col grid w-full gap-4 py-8 pl-8 pr-12 lg:w-2/3">
            <p className="text-start text-2xl font-medium text-gmco-grey">
              Pembelian Saya &#40;{seatsBought.Seat.length}&#41;
            </p>
            {/* TICKET */}
            {seatsBought.Seat.map((seat, index) => (
              <div
                key={index}
                className="flex h-fit w-full flex-row rounded-lg bg-white p-4"
              >
                {/* Kursi dan Tipe */}
                <div className="flex w-1/5 flex-col justify-center text-center">
                  <h1 className="font-rubik text-lg font-bold text-gmco-grey sm:text-xl lg:text-2xl">
                    Seat {seat.name}
                  </h1>
                  {mapCategory(seat.price) === "Platinum" ? (
                    <p
                      className={
                        "w-full rounded-lg bg-gmco-blue text-center text-sm font-normal text-gmco-grey lg:text-base"
                      }
                    >
                      {mapCategory(seat.price)}
                    </p>
                  ) : mapCategory(seat.price) === "Diamond" ? (
                    <p
                      className={
                        "w-full rounded-lg bg-violet-700 text-center text-sm font-normal text-gmco-white lg:text-base"
                      }
                    >
                      {mapCategory(seat.price)}
                    </p>
                  ) : mapCategory(seat.price) === "Ascendant" ? (
                    <p
                      className={
                        "w-full rounded-lg bg-emerald-700 text-center text-sm font-normal text-gmco-white lg:text-base"
                      }
                    >
                      {mapCategory(seat.price)}
                    </p>
                  ) : mapCategory(seat.price) === "Immortal" ? (
                    <p
                      className={
                        "w-full rounded-lg bg-rose-400 text-center text-sm font-normal text-gmco-grey lg:text-base"
                      }
                    >
                      {mapCategory(seat.price)}
                    </p>
                  ) : (
                    <p
                      className={
                        "w-full rounded-lg bg-rose-800 text-center text-sm font-normal text-gmco-grey lg:text-base"
                      }
                    >
                      {mapCategory(seat.price)}
                    </p>
                  )}
                </div>

                {/* Waktu dan Tempat */}
                <div className="flex w-full items-center justify-end">
                  <div className="flex h-full flex-col justify-center gap-2 text-end text-xs sm:text-sm lg:text-base">
                    <p>Auditorium Driyarkara</p>
                    <p>Sabtu, 27 Mei 2023</p>
                    <p>Open Gate 18.00 WIB</p>
                  </div>
                  <div className="overflow-hidden">
                    <Image
                      src="/qris-reinhart.webp"
                      alt="qris pls send money"
                      width={100}
                      height={100}
                    />
                  </div>

                  {/* Nama Konser */}
                  <div className="flex w-1/2 items-center rounded-lg bg-gmco-grey py-4 pr-4">
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
