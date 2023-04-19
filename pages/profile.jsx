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

  useEffect(() => {
    (async () => {
      try {
        if (
          typeof window !== "undefined" &&
          !localStorage.getItem("auth_token")
        ) {
          router.push("/auth");
        }
        const [res] = await Promise.all([axiosInstance.get("v1/user/profile")]);
        setUserData(res.data.data);
      } catch (err) {
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

  function handleFormChange(event) {
    const { name, value } = event.target;
    setFormUserData({ ...formUserData, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res_patch = await axiosInstance.patch(
        "v1/user/profile",
        formUserData
      );
      const [res_get] = await Promise.all([
        axiosInstance.get("v1/user/profile"),
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
      <div className="min-h-screen w-screen bg-gmco-white">
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
        <div className="flex w-full flex-col divide-x lg:flex-row">
          {/* EDIT IDENTITY */}
          <form
            onSubmit={handleSubmit}
            className="relative flex w-full flex-col items-start bg-[#C0925E] px-12 py-8 lg:w-1/3"
          >
            {/* Name */}
            <label for="nama" className="font-rubik text-white">
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
            <label for="email" className="font-rubik text-white">
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
              type="number"
              pattern="(^\+62|62|08)(\d{8,12}$)"
              placeholder="Masukkan Nomor WhatsApp Anda"
              name="phone"
              value={formUserData.phone}
              onChange={handleFormChange}
              title="Please enter a valid phone number!"
            />

            <button
              type="submit"
              className="mt-12 w-full rounded-lg bg-[#932F2F] p-2 text-center font-inter text-lg font-semibold text-white"
            >
              PERBARUI PROFIL
            </button>
          </form>

          {/* List of Tickets */}
          <div className="flex w-full flex-col gap-4 py-8 pl-8 pr-12 lg:w-2/3">
            <p className="text-start text-2xl font-medium text-gmco-grey">
              Pembelian Saya &#40;{tickets.length}&#41;
            </p>
            {/* TICKET */}

            {tickets.map((ticket, index) => (
              <div
                key={index}
                className="flex h-full w-full flex-row rounded-lg bg-white p-4"
              >
                {/* Kursi dan Tipe */}
                <div className="flex w-1/5 flex-col justify-center text-center">
                  <h1 className="font-rubik text-lg font-bold text-gmco-grey sm:text-xl lg:text-2xl">
                    Seat A{ticket}
                  </h1>
                  <p className="w-full rounded-lg bg-[#F5DB91] text-center text-sm font-normal text-gmco-grey lg:text-base">
                    RADIANT
                  </p>
                </div>

                {/* Waktu dan Tempat */}
                <div className="flex w-full items-center justify-end">
                  <div className="flex h-full flex-col justify-center gap-2 text-end text-xs sm:text-sm lg:text-base">
                    <p>Auditorium Driyarkara</p>
                    <p>Sabtu, 27 Mei 2023</p>
                    <p>Open Gate 18.00 WIB</p>
                  </div>
                  <div className="overflow-hidden">
                    <Image src="/qris-reinhart.webp" width={100} height={100} />
                  </div>

                  {/* Nama Konser */}
                  <div className="flex w-1/2 items-center rounded-lg bg-gmco-grey py-4 pr-4">
                    <div className="mx-2 overflow-hidden">
                      <Image
                        src="/logo-anjangsana.webp"
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
