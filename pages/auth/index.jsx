import React from "react";
import { useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { notifyError } from "../../components/notify";
import { useRouter } from "next/router";
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
      console.log(JSON.stringify(loginInput));
      await axiosInstance
        .post("/api/v1/user/register_email", {
          email: loginInput.email,
        })
        .then((res) => {
          const otp = res.data.totp_token;
          setLoginInput({ ...loginInput, otp: res.data.totp_token });
          if (res.status === 200) {
            // localStorage.setItem("auth_token", res.data.access_token);
            router.push({
              pathname: "/auth/otp",
              query: {
                email: loginInput.email,
                otp: res.data.totp_token,
              },
            });
          }
        });
    } catch (err) {
      notifyError(err);
    }
  }

  if (process.browser) {
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

  return (
    <section className="block min-h-screen items-center justify-center bg-gmco-grey p-4 md:flex">
      <div className=" relative flex w-full max-w-screen-lg flex-col  overflow-hidden rounded-lg bg-[url('/GMCO.jpg')] bg-cover shadow-lg md:m-10 md:flex-row ">
        {/* leftside */}
        <div className=" place ml-3 mt-14  flex h-3/6 w-full flex-col p-4 text-white backdrop-filter md:mt-0 md:w-7/12 md:items-start md:p-10 ">
          <h1 className="mb-3 text-4xl font-bold md:text-5xl">
            {" "}
            Grand Concert{" "}
          </h1>
          <p className="font-base mb-3 text-2xl md:text-3xl">Vol.10</p>
          <p className=" font-base text-2xl md:text-2xl">
            {" "}
            Anjangsana Simfoni{" "}
          </p>
        </div>
        <img
          src="/logo_gmco.webp"
          alt=""
          className="absolute left-5 top-3 w-32 md:left-9 md:top-3/4 md:w-52"
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
              <label class=" pl-2 text-base text-gmco-white">
                Masukkan email anda
              </label>
              <div className="relative flex w-full items-stretch">
                <div className=" flex"></div>
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => HandleInput(e)}
                    value={loginInput.email}
                    class="mt-2 w-full rounded-[20px] border border-gray-300 py-2 placeholder:font-light placeholder:text-gray-500"
                    id="email"
                  />
                  <EnvelopeIcon className="absolute h-7 w-7 right-4 top-4 stroke-slate-400"> </EnvelopeIcon>

              </div>
            </div>
            <label class="text-center text-sm text-gmco-white my-2">
              Anda akan dikirimkan kode OTP melalui email.
              <br /> Pastikan email yang anda gunakan valid
            </label>

            <button
              type="submit"
              class="mb-6 w-full rounded-full border-2 border-white bg-gmco-orange-secondarylight p-2 font-semibold text-white  hover:bg-gmco-yellow-secondary hover:text-gmco-white"
            >
              LOG IN / REGISTER
            </button>
            <label class="pt-3 text-center text-xs text-gmco-white">
              Gadjah Mada Chamber Orchestra
            </label>
          </form>
        </div>
      </div>
      {/* right side */}
      {/* <div class=" md:w-1/3 lg:w-1/4">
          <img
            src="/herotemp.jpg"
            alt=""
            className="w-full h-full hidden lg:rounded-r-2xl md:block object-cover"
          />
          <div class="absolute hidden top-5 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
            <span class="text-white text-xl">Welcome to GC GMCO</span>
          </div>
        </div> */}
    </section>
  );
}
