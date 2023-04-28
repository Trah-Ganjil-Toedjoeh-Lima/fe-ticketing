import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

import { EnvelopeIcon } from "@heroicons/react/24/outline";

import { notifyError } from "@/components/notify";
import { axiosInstance } from "@/atoms/config";

export default function Auth() {
  const router = useRouter();
  const [loginInput, setLoginInput] = useState({
    email: "",
    otp: "",
  });

  function HandleInput(e) {
    e.persist();
    setLoginInput({ ...loginInput, [e.target.id]: e.target.value });
  }

  // function testSubmit(e) {
  //   e.preventDefault();
  //   router.push({
  //     pathname: "/auth/otp",
  //     query: { loginInput: loginInput.email },
  //   });
  // }

  async function LoginSubmit(e) {
    e.preventDefault();
    try {
      await axiosInstance
        .post("/api/v1/user/register_email", {
          email: loginInput.email,
        })
        .then((res) => {
          // const otp = res.data.totp_token;
          setLoginInput({ ...loginInput, otp: res.data.totp_token });
          if (res.status === 200) {
            // localStorage.setItem("auth_token", res.data.access_token);
            router.push(
              // "/auth/otp"
              {
                pathname: "/auth/otp",
                query: { email: loginInput.email },
              },
              "/auth/otp"
            );
          }
        });
    } catch (err) {
      console.log(err.toString());
      //notifyError();
    }
  }

  if (typeof window !== "undefined") {
    const btn = document.getElementById("login");
    if (btn) {
      // Not called
      btn.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          document.getElementById("login").click();
        }
      });
    }
  }

  function handleGoBack() {
    router.back();
  }

  return (
    <section className="max-w-screen block min-h-screen items-center justify-center bg-gmco-grey p-4 md:flex">
      <div className=" relative flex w-full max-w-screen-lg flex-col overflow-hidden rounded-lg bg-cover shadow-lg md:m-10 md:flex-row ">
        {/* leftside */}
        <div className="absolute h-full w-full bg-gmco-grey">
          <Image
            src="/GMCO.webp"
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
              Selamat Datang
            </h1>
          </div>
          <form
            action="#"
            className="flex flex-col items-center space-y-4"
            onSubmit={LoginSubmit}
          >
            <div className="w-full">
              <label className=" pl-2 text-base text-gmco-white">
                Masukkan email anda
              </label>
              <div className="relative flex w-full items-stretch">
                <div className=" flex"></div>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => HandleInput(e)}
                  value={loginInput.email}
                  className="mt-2 w-full rounded-[20px] border border-gray-300 py-2 placeholder:font-light placeholder:text-gray-500"
                  id="email"
                />
                <EnvelopeIcon className="absolute right-4 top-4 h-7 w-7 stroke-slate-400">
                  {" "}
                </EnvelopeIcon>
              </div>
            </div>
            <label className="my-2 text-center text-sm text-gmco-white">
              Anda akan dikirimkan kode OTP melalui email.
              <br /> Pastikan email yang anda gunakan valid
            </label>

            <button
              type="submit"
              className="mb-6 w-full rounded-full border-2 border-white bg-gmco-orange-secondarylight p-2 font-semibold text-white  hover:bg-gmco-yellow-secondary hover:text-gmco-white"
            >
              LOG IN / REGISTER
            </button>

            <button
              onClick={handleGoBack}
              className="mb-6 w-full rounded-full border-2 border-white bg-gmco-orange-secondarylight p-2 font-semibold text-white  hover:bg-gmco-yellow-secondary hover:text-gmco-white"
            >
              KEMBALI
            </button>
            
            <label className="pt-3 text-center text-xs text-gmco-white">
              Gadjah Mada Chamber Orchestra
            </label>
            
          </form>
        </div>
      </div>
      {/* right side */}
      {/* <div className=" md:w-1/3 lg:w-1/4">
          <img
            src="/herotemp.webp"
            alt=""
            className="w-full h-full hidden lg:rounded-r-2xl md:block object-cover"
          />
          <div className="absolute hidden top-5 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
            <span className="text-white text-xl">Welcome to GC GMCO</span>
          </div>
        </div> */}
    </section>
  );
}
